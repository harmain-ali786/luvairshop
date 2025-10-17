import { useState } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

const Catalog = () => {
  const [filter, setFilter] = useState<string>("all");

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-8 text-foreground">
          All Shoes
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Shoes
          </Button>
          <Button
            variant={filter === "men" ? "default" : "outline"}
            onClick={() => setFilter("men")}
          >
            Men's
          </Button>
          <Button
            variant={filter === "women" ? "default" : "outline"}
            onClick={() => setFilter("women")}
          >
            Women's
          </Button>
          <Button
            variant={filter === "sports" ? "default" : "outline"}
            onClick={() => setFilter("sports")}
          >
            Sports
          </Button>
          <Button
            variant={filter === "casual" ? "default" : "outline"}
            onClick={() => setFilter("casual")}
          >
            Casual
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalog;
