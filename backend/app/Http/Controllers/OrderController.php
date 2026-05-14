<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Order::with(['items.product.category', 'user'])
                      ->where('user_id', $user->id)
                      ->orderBy('created_at', 'desc');

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('order_status', $request->status);
        }

        // Filter by payment status if provided
        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        $orders = $query->paginate($request->get('per_page', 10));

        return response()->json($orders);
    }

    /**
     * Store a newly created order.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'delivery_address' => 'required|string',
            'phone_number' => 'required|string|max:20',
        ]);

        return DB::transaction(function () use ($request, $validated) {
            $user = $request->user();
            $totalAmount = 0;
            $orderItems = [];

            // Validate stock and calculate total
            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);

                if (!$product || !$product->in_stock) {
                    return response()->json([
                        'message' => 'Product not available: ' . ($product->name ?? 'Unknown'),
                    ], 422);
                }

                if ($product->stock < $item['quantity']) {
                    return response()->json([
                        'message' => 'Insufficient stock for ' . $product->name,
                        'available_stock' => $product->stock,
                        'requested' => $item['quantity'],
                    ], 422);
                }

                $totalAmount += $product->price * $item['quantity'];
                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ];
            }

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'delivery_address' => $validated['delivery_address'],
                'phone_number' => $validated['phone_number'],
                'order_status' => 'pending',
                'payment_status' => 'pending',
            ]);

            // Create order items and reduce stock
            foreach ($orderItems as $item) {
                $order->items()->create($item);

                // Reduce product stock
                Product::where('id', $item['product_id'])
                       ->decrement('stock', $item['quantity']);
            }

            $order->load(['items.product', 'user']);

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order,
            ], 201);
        });
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order, Request $request)
    {
        $user = $request->user();

        // Check if order belongs to user or user is admin
        if ($order->user_id !== $user->id && !$user->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $order->load([
            'items.product.category',
            'user' => function ($query) {
                $query->select('id', 'name', 'email', 'phone');
            }
        ]);

        return response()->json(['order' => $order]);
    }

    /**
     * Update order status (for admin).
     */
    public function updateStatus(Request $request, Order $order)
    {
        $user = $request->user();

        // Only admin can update order status
        if (!$user->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validated = $request->validate([
            'order_status' => 'sometimes|in:pending,processing,shipped,delivered,cancelled',
            'payment_status' => 'sometimes|in:pending,paid,failed,refunded',
        ]);

        $order->update($validated);

        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order,
        ]);
    }
}