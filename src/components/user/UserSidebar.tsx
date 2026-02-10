import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Truck, 
  MapPin, 
  Store, 
  ShoppingCart, 
  Calendar, 
  Bot,
  HelpCircle, 
  LogOut,
  X,
  Utensils 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface UserSidebarProps {
  onClose?: () => void;
}

const menuItems = [
  { icon: Home, label: "Home", path: "/user/home" },
  { icon: Truck, label: "Delivery", path: "/user/delivery" },
  { icon: MapPin, label: "Pickup", path: "/user/pickup" },
  { icon: Store, label: "Shops", path: "/user/restaurants" },
  { icon: ShoppingCart, label: "Cart", path: "/user/cart" },
  { icon: Calendar, label: "Dietary Plan", path: "/user/dietary-plan" },
  { icon: Bot, label: "Chatbot", path: "/user/chatbot" },
  { icon: HelpCircle, label: "Help Center", path: "/user/help" },
];

const UserSidebar = ({ onClose }: UserSidebarProps) => {
  const location = useLocation();

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Calo.Fit</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 bg-accent/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">AK</span>
          </div>
          <div>
            <p className="font-semibold">Ahmed Khan</p>
            <p className="text-sm text-muted-foreground">+92 300 1234567</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={onClose}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : ""}`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Logout */}
      <div className="p-4">
        <Link to="/" onClick={onClose}>
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserSidebar;
