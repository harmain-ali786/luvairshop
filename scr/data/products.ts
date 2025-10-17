export interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  // Men's Shoes
  { id: 1, name: "Classic Leather Oxfords", price: 18499, originalPrice: 22499, image: "/placeholder.svg", category: "men", isNew: true },
  { id: 2, name: "Running Sneakers Pro", price: 12799, image: "/placeholder.svg", category: "sports", isBestSeller: true },
  { id: 3, name: "Premium Loafers", price: 21299, originalPrice: 27999, image: "/placeholder.svg", category: "men" },
  { id: 4, name: "Canvas Casual Sneakers", price: 8499, image: "/placeholder.svg", category: "casual", isNew: true },
  { id: 5, name: "Athletic Training Shoes", price: 14199, image: "/placeholder.svg", category: "sports", isBestSeller: true },
  { id: 6, name: "Suede Derby Shoes", price: 16999, originalPrice: 20999, image: "/placeholder.svg", category: "men" },
  
  // Women's Shoes
  { id: 7, name: "Elegant High Heels", price: 15599, image: "/placeholder.svg", category: "women", isNew: true },
  { id: 8, name: "Ankle Boots", price: 19799, originalPrice: 25199, image: "/placeholder.svg", category: "women", isBestSeller: true },
  { id: 9, name: "Ballet Flats", price: 9899, image: "/placeholder.svg", category: "women" },
  { id: 10, name: "Platform Sneakers", price: 11299, image: "/placeholder.svg", category: "casual", isNew: true },
  { id: 11, name: "Knee-High Boots", price: 24099, originalPrice: 30899, image: "/placeholder.svg", category: "women", isBestSeller: true },
  { id: 12, name: "Espadrille Wedges", price: 12799, image: "/placeholder.svg", category: "women" },
  
  // Sports Shoes
  { id: 13, name: "Basketball High-Tops", price: 16999, image: "/placeholder.svg", category: "sports", isNew: true },
  { id: 14, name: "Trail Running Shoes", price: 15599, originalPrice: 19599, image: "/placeholder.svg", category: "sports", isBestSeller: true },
  { id: 15, name: "Cross Training Shoes", price: 13499, image: "/placeholder.svg", category: "sports" },
  { id: 16, name: "Soccer Cleats", price: 12099, image: "/placeholder.svg", category: "sports", isNew: true },
  { id: 17, name: "Tennis Shoes", price: 14199, image: "/placeholder.svg", category: "sports" },
  { id: 18, name: "Yoga Training Shoes", price: 10599, originalPrice: 12599, image: "/placeholder.svg", category: "sports" },
  
  // Casual Shoes
  { id: 19, name: "White Minimalist Sneakers", price: 9899, image: "/placeholder.svg", category: "casual", isNew: true },
  { id: 20, name: "Slip-On Canvas Shoes", price: 7099, image: "/placeholder.svg", category: "casual", isNew: true },
  { id: 21, name: "Retro Chunky Sneakers", price: 12799, originalPrice: 16899, image: "/placeholder.svg", category: "casual", isNew: true },
  { id: 22, name: "Leather Boat Shoes", price: 14199, image: "/placeholder.svg", category: "casual", isNew: true },
  { id: 23, name: "High-Top Canvas Sneakers", price: 9199, image: "/placeholder.svg", category: "casual", isNew: true, isBestSeller: true },
  { id: 24, name: "Skate Shoes", price: 11299, image: "/placeholder.svg", category: "casual", isNew: true },
  { id: 25, name: "Designer Slides", price: 6399, image: "/placeholder.svg", category: "casual", isNew: true },
];

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};

export const getNewArrivals = () => {
  return products.filter(p => p.isNew);
};

export const getBestSellers = () => {
  return products.filter(p => p.isBestSeller);
};
