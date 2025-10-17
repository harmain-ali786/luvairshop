import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-hero">
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Main Banner */}
          <div className="relative h-72 md:h-[350px] bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl overflow-hidden shadow-elegant border group hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-12">
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">Spring Collection</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 leading-tight">
                Step Into<br/>Spring
              </h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8 text-muted-foreground font-medium">Up to 40% Off</p>
              <Link to="/catalog">
                <button className="bg-primary text-primary-foreground px-8 md:px-10 py-3 md:py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 font-semibold text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105 transform">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          {/* Side Banners */}
          <div className="grid grid-rows-2 gap-4 md:gap-6">
            <div className="relative h-40 md:h-[167px] bg-gradient-to-br from-secondary/30 to-muted rounded-2xl overflow-hidden shadow-elegant border group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2">New Arrivals</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4 font-medium">Latest Trends</p>
                <Link to="/new-arrivals">
                  <button className="bg-secondary text-secondary-foreground px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-secondary/80 transition-all duration-300 text-sm md:text-base font-semibold shadow-md hover:shadow-lg hover:scale-105 transform">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative h-40 md:h-[167px] bg-gradient-to-br from-accent/30 to-muted rounded-2xl overflow-hidden shadow-elegant border group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2">Best Sellers</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4 font-medium">Most Popular</p>
                <Link to="/catalog">
                  <button className="bg-accent text-accent-foreground px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-accent/80 transition-all duration-300 text-sm md:text-base font-semibold shadow-md hover:shadow-lg hover:scale-105 transform">
                    View All
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
