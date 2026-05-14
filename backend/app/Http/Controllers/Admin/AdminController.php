<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * Get dashboard statistics.
     */
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_products' => \App\Models\Product::count(),
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('order_status', 'pending')->count(),
            'completed_orders' => Order::where('order_status', 'delivered')->count(),
            'total_revenue' => Order::where('payment_status', 'paid')
                                   ->sum('total_amount'),
        ];

        // Recent orders
        $recentOrders = Order::with(['user', 'items'])
                             ->orderBy('created_at', 'desc')
                             ->limit(5)
                             ->get();

        // Top products
        $topProducts = \App\Models\Product::withCount(['orderItems as total_sold' => function ($query) {
                                        $query->select(DB::raw('SUM(quantity)'));
                                    }])
                                    ->orderBy('total_sold', 'desc')
                                    ->limit(5)
                                    ->get();

        return response()->json([
            'stats' => $stats,
            'recent_orders' => $recentOrders,
            'top_products' => $topProducts,
        ]);
    }

    /**
     * Display all users (admin only).
     */
    public function users(Request $request)
    {
        $query = User::query();

        // Only show regular users, not admins
        $query->where('role', 'user');

        // Filter by role
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        // Search by name or email
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        $users = $query->orderBy('created_at', 'desc')
                       ->paginate($request->get('per_page', 15));

        return response()->json($users);
    }

    /**
     * Update user role (admin only).
     */
    public function updateUser(Request $request, User $user)
    {
        // Cannot modify super admin
        if ($user->isSuperAdmin()) {
            return response()->json([
                'message' => 'Cannot modify super admin',
            ], 403);
        }

        $validated = $request->validate([
            'role' => 'required|in:user,admin',
        ]);

        $user->update(['role' => $validated['role']]);

        return response()->json([
            'message' => 'User role updated successfully',
            'user' => $user,
        ]);
    }

    /**
     * Delete user (admin only).
     */
    public function deleteUser(User $user)
    {
        // Cannot delete super admin
        if ($user->isSuperAdmin()) {
            return response()->json([
                'message' => 'Cannot delete super admin',
            ], 403);
        }

        // Delete user's orders first
        $user->orders()->delete();

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }

    /**
     * Get all orders (admin only).
     */
    public function orders(Request $request)
    {
        $query = Order::with(['user', 'items.product.category']);

        // Filter by status
        if ($request->has('order_status')) {
            $query->where('order_status', $request->order_status);
        }

        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        // Search by user email or order ID
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', '%' . $search . '%')
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('email', 'like', '%' . $search . '%')
                         ->orWhere('name', 'like', '%' . $search . '%');
                  });
            });
        }

        $orders = $query->orderBy('created_at', 'desc')
                        ->paginate($request->get('per_page', 15));

        return response()->json($orders);
    }

    /**
     * Get order statistics.
     */
    public function orderStats()
    {
        $stats = [
            'orders_by_status' => Order::selectRaw('order_status, COUNT(*) as count')
                                       ->groupBy('order_status')
                                       ->pluck('count', 'order_status'),

            'orders_by_payment' => Order::selectRaw('payment_status, COUNT(*) as count')
                                         ->groupBy('payment_status')
                                         ->pluck('count', 'payment_status'),

            'monthly_revenue' => Order::where('payment_status', 'paid')
                                      ->whereYear('created_at', now()->year)
                                      ->selectRaw('MONTH(created_at) as month, SUM(total_amount) as total')
                                      ->groupBy('month')
                                      ->orderBy('month')
                                      ->get()
                                      ->pluck('total', 'month'),

            'top_categories' => \App\Models\Category::withCount(['orderItems as total_sold' => function ($query) {
                                    $query->select(DB::raw('SUM(quantity)'));
                                }])
                                ->orderBy('total_sold', 'desc')
                                ->limit(5)
                                ->get(),
        ];

        return response()->json(['stats' => $stats]);
    }
}