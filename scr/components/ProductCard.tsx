import { ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg card-hover-lift bg-card rounded-xl border border-border"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden aspect-square bg-secondary product-image-zoom">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* 11.11 Deal Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-red-600 text-white px-3 py-1.5 text-xs font-bold animate-glow flex items-center gap-1 border-0">
              <Sparkles className="w-3 h-3" />
              11.11 DEAL
            </Badge>
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
            -{discount}% OFF
          </div>
        )}

        {/* New Badge */}
        {product.isNew && !discount && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
            NEW
          </div>
        )}

        {/* Best Seller Badge */}
        {product.isBestSeller && (
          <div className="absolute top-12 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
            BEST SELLER
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-bold text-base mb-1 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            {product.category}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold">
              Rs. {product.price.toLocaleString()}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>

          <Button
            size="icon"
            onClick={handleAddToCart}
            className="rounded-full h-11 w-11 bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-medium transition-all duration-300"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
