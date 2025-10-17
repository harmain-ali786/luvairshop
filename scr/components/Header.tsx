import { Menu, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import CartSheet from "./CartSheet";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left - Hamburger Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden hover:bg-accent transition-colors"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center lg:justify-start lg:flex-initial">
              <Link to="/">
                <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">luvairshop</h1>
              </Link>
            </div>

            {/* Right - Cart */}
            <div className="flex items-center gap-2 md:gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-accent"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
};

export default Header;
