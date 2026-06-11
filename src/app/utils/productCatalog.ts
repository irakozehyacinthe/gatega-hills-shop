import { Product } from '../data/mockData';

// These helpers expect the extended catalog product model.
// During transition, we defensively access optional fields.

export const getFeaturedProducts = (products: Product[]) =>
  products.filter((p) => Boolean((p as any).isFeatured));

export const getBestSellerProducts = (products: Product[]) =>
  products.filter((p) => Boolean((p as any).isBestSeller));

export const getNewArrivalProducts = (products: Product[]) =>
  products.filter((p) => Boolean((p as any).isNewArrival));

export const getDiscountedProducts = (products: Product[]) =>
  products.filter((p) => {
    const price = (p as any).price;
    const discountPrice = (p as any).discountPrice;
    return typeof discountPrice === 'number' && discountPrice < price;
  });

export const getFlashSaleProducts = (products: Product[]) =>
  getDiscountedProducts(products);



export const getPopularProducts = (products: Product[]) => {
  return [...products]
    .sort((a, b) => ((b as any).rating ?? 0) - ((a as any).rating ?? 0))
    .slice(0, 16);
};

export const getRecommendedProducts = (products: Product[]) => {
  return [...products]
    .sort((a, b) => {
      const aScore =
        ((a as any).isNewArrival ? 2 : 0) +
        ((a as any).isBestSeller ? 2 : 0) +
        ((a as any).rating ?? 0);
      const bScore =
        ((b as any).isNewArrival ? 2 : 0) +
        ((b as any).isBestSeller ? 2 : 0) +
        ((b as any).rating ?? 0);
      return bScore - aScore;
    })
    .slice(0, 16);
};


