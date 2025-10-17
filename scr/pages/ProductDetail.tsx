import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string;
  category: string;
  description: string | null;
  is_new: boolean;
  is_best_seller: boolean;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("products")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          toast({
            title: "Product not found",
            description: "The product you're looking for doesn't exist.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, toast]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      originalPrice: product.original_price ? Number(product.original_price) : undefined,
      image: product.image,
      category: product.category,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    navigate("/checkout", { 
      state: { 
        product: {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
        }
      } 
    });
  };

  const discount = product?.original_price
    ? Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.is_new && (
                <Badge className="bg-primary text-primary-foreground">NEW</Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive">-{discount}%</Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                Rs. {Number(product.price).toLocaleString()}
              </span>
              {product.original_price && (
                <span className="text-xl text-muted-foreground line-through">
                  Rs. {Number(product.original_price).toLocaleString()}
                </span>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Category</p>
              <Badge variant="outline" className="capitalize">{product.category}</Badge>
            </div>

            {product.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1"
                size="lg"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
