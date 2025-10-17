import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import ProductCarousel from "./ProductCarousel";

interface CategorySectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const CategorySection = ({ title, products, viewAllLink = "/catalog" }: CategorySectionProps) => {
  if (products.length === 0) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground">
            {title}
          </h2>
          <Link
            to={viewAllLink}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Carousel */}
        <ProductCarousel products={products} />
      </div>
    </section>
  );
};

export default CategorySection;
