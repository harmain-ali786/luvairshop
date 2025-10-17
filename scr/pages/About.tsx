import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-8 text-foreground">
          About Us
        </h1>
        
        <div className="max-w-3xl space-y-6 text-muted-foreground">
          <p className="text-lg">
            Welcome to ShoeHaven, where comfort meets style. We're passionate about bringing you the finest footwear collection at unbeatable prices.
          </p>
          
          <p>
            Founded with a vision to make premium shoes accessible to everyone, we carefully curate our collections to ensure every pair meets our high standards of quality, comfort, and style.
          </p>
          
          <p>
            Our team works tirelessly to source the best footwear from around the world, ensuring you get premium quality shoes at competitive prices.
          </p>

          <div className="pt-8">
            <h2 className="text-2xl font-display font-bold mb-4 text-foreground">Our Mission</h2>
            <p>
              To provide our customers with exceptional footwear choices that empower them to walk with confidence and style every day.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
