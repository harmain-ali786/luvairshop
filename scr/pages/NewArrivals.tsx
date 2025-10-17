import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import { getNewArrivals } from "@/data/products";

const NewArrivals = () => {
  const newProducts = getNewArrivals();

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
          New Arrivals
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Check out our latest shoe collection featuring the newest trends and styles.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewArrivals;
