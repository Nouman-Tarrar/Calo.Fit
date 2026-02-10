import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Search, Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserSidebar from "@/components/user/UserSidebar";

const pickupRestaurants = [
  { id: 1, name: "Karachi Biryani House", cuisine: "Pakistani", rating: 4.8, prepTime: "15-20 min", distance: "0.5 km", image: "🍛", address: "Block 5, Gulshan-e-Iqbal" },
  { id: 2, name: "Lahore Tikka Corner", cuisine: "BBQ", rating: 4.6, prepTime: "20-25 min", distance: "1.2 km", image: "🍖", address: "PECHS Block 2" },
  { id: 3, name: "Healthy Bites", cuisine: "Health Food", rating: 4.9, prepTime: "10-15 min", distance: "0.8 km", image: "🥗", address: "Clifton Block 4" },
  { id: 4, name: "Chapli Kebab Express", cuisine: "Pakistani", rating: 4.5, prepTime: "25-30 min", distance: "2.0 km", image: "🥙", address: "Saddar" },
  { id: 5, name: "Fresh Juice Bar", cuisine: "Beverages", rating: 4.7, prepTime: "5-10 min", distance: "0.3 km", image: "🧃", address: "Bahadurabad" },
];

const Pickup = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = pickupRestaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
        <div className="container flex items-center justify-between h-16 px-4">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <UserSidebar onClose={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold">Pickup</h1>
          <Link to="/user/profile">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
          <MapPin className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Quick Pickup</h2>
            <p className="text-sm text-muted-foreground">Order ahead and pick up when ready - skip the wait!</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants for pickup..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Restaurant List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Nearby Pickup Locations</h3>
          {filteredRestaurants.map((restaurant) => (
            <Link key={restaurant.id} to={`/user/restaurant/${restaurant.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg bg-accent flex items-center justify-center text-4xl">
                      {restaurant.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{restaurant.name}</h4>
                          <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{restaurant.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{restaurant.address}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {restaurant.prepTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {restaurant.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pickup;
