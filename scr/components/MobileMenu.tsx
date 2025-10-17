import { X, Menu as MenuIcon, Grid } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent } from "./ui/sheet";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [activeSection, setActiveSection] = useState<"menu" | "catalog" | null>(null);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Admin Panel", href: "/admin" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b bg-muted/30">
            <h2 className="text-lg font-display font-bold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-accent">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-3 p-4 border-b bg-background">
            <Button
              variant={activeSection === "menu" ? "default" : "outline"}
              className="flex-1 font-semibold shadow-sm"
              onClick={() => setActiveSection(activeSection === "menu" ? null : "menu")}
            >
              <MenuIcon className="h-4 w-4 mr-2" />
              Menu
            </Button>
            <Button
              variant={activeSection === "catalog" ? "default" : "outline"}
              className="flex-1 font-semibold shadow-sm"
              onClick={() => setActiveSection(activeSection === "catalog" ? null : "catalog")}
            >
              <Grid className="h-4 w-4 mr-2" />
              View Catalog
            </Button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto bg-muted/10">
            {activeSection === "menu" && (
              <nav className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block px-4 py-3.5 rounded-lg hover:bg-accent transition-all duration-200 text-foreground font-medium hover:shadow-sm border border-transparent hover:border-border"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}

            {activeSection === "catalog" && (
              <div className="p-4 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground mb-3 px-4 uppercase tracking-wider">Categories</p>
                {["Men's Clothing", "Women's Clothing", "Accessories", "All Products"].map(
                  (category) => (
                    <Link
                      key={category}
                      to="/catalog"
                      className="block px-4 py-3.5 rounded-lg hover:bg-accent transition-all duration-200 font-medium hover:shadow-sm border border-transparent hover:border-border"
                      onClick={onClose}
                    >
                      {category}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
