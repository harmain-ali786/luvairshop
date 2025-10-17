import { useEffect, useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/products";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Transform database products to match Product interface
        const transformedProducts: Product[] = (data || []).map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          originalPrice: p.original_price ? Number(p.original_price) : undefined,
          image: p.image,
          category: p.category,
          isNew: p.is_new,
          isBestSeller: p.is_best_seller,
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getNewArrivals = () => products.filter((p) => p.isNew);
  const getBestSellers = () => products.filter((p) => p.isBestSeller);
  const getProductsByCategory = (category: string) =>
    products.filter((p) => p.category === category);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <HeroBanner />
      
      {/* Featured Products */}
      <CategorySection 
        title="Featured Products" 
        products={products.slice(0, 10)} 
        viewAllLink="/catalog"
      />
      
      {/* New Arrivals */}
      <CategorySection 
        title="New Arrivals" 
        products={getNewArrivals()} 
        viewAllLink="/new-arrivals"
      />
      
      {/* Best Sellers */}
      <CategorySection 
        title="Best Sellers" 
        products={getBestSellers()} 
        viewAllLink="/catalog"
      />
      
      {/* Men's Shoes */}
      <CategorySection 
        title="Men's Shoes" 
        products={getProductsByCategory("men")} 
        viewAllLink="/catalog"
      />
      
      {/* Women's Shoes */}
      <CategorySection 
        title="Women's Shoes" 
        products={getProductsByCategory("women")} 
        viewAllLink="/catalog"
      />
      
      {/* Sports Shoes */}
      <CategorySection 
        title="Sports & Athletic" 
        products={getProductsByCategory("sports")} 
        viewAllLink="/catalog"
      />
    </div>
  );
};

export default Index;
