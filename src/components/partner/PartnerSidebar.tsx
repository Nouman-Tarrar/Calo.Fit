import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, ClipboardList, Star, HelpCircle, LogOut, X, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/partner/dashboard" },
  { icon: UtensilsCrossed, label: "Menu Management", path: "/partner/menu" },
  { icon: ClipboardList, label: "Orders", path: "/partner/orders" },
  { icon: Star, label: "Reviews", path: "/partner/reviews" },
  { icon: HelpCircle, label: "Help Center", path: "/partner/help" },
];

const PartnerSidebar = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Partner</span>
        </div>
      </div>

      <div className="p-4 bg-accent/30">
        <p className="font-semibold">Karachi Biryani House</p>
        <p className="text-sm text-muted-foreground">Restaurant</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={onClose}>
              <Button variant={isActive ? "secondary" : "ghost"} className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}>
                <item.icon className="h-5 w-5" />{item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <Separator />
      <div className="p-4">
        <Link to="/" onClick={onClose}>
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
            <LogOut className="h-5 w-5" />Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PartnerSidebar;
