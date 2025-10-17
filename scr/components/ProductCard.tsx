import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group relative bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge className="bg-primary text-primary-foreground">NEW</Badge>
        )}
        {discount > 0 && (
          <Badge variant="destructive">-{discount}%</Badge>
        )}
      </div>

      {/* Wishlist Icon */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background">
        <Heart className="w-4 h-4 text-foreground" />
      </button>

      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-foreground">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
