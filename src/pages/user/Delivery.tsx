import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Search, Star, Clock, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import UserSidebar from "@/components/user/UserSidebar";

const savedAddresses = [
  { id: 1, label: "Home", address: "123 Main Street, Gulshan-e-Iqbal, Karachi" },
  { id: 2, label: "Office", address: "Floor 12, Dolmen Towers, Clifton, Karachi" },
];

const deliveryRestaurants = [
  { id: 1, name: "Karachi Biryani House", cuisine: "Pakistani", rating: 4.8, deliveryTime: "30-40 min", deliveryFee: 100, image: "🍛", tags: ["High Protein", "Balanced"] },
  { id: 2, name: "Lahore Tikka Corner", cuisine: "BBQ", rating: 4.6, deliveryTime: "25-35 min", deliveryFee: 80, image: "🍖", tags: ["High Protein"] },
  { id: 3, name: "Healthy Bites", cuisine: "Health Food", rating: 4.9, deliveryTime: "20-30 min", deliveryFee: 50, image: "🥗", tags: ["Low Carb", "Low Fat"] },
  { id: 4, name: "Chapli Kebab Express", cuisine: "Pakistani", rating: 4.5, deliveryTime: "35-45 min", deliveryFee: 120, image: "🥙", tags: ["High Protein"] },
  { id: 5, name: "Green Bowl", cuisine: "Salads", rating: 4.7, deliveryTime: "15-25 min", deliveryFee: 60, image: "🥬", tags: ["Low Carb", "Balanced"] },
];

const Delivery = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);

  const filteredRestaurants = deliveryRestaurants.filter(r =>
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
          <h1 className="text-xl font-bold">Delivery</h1>
          <Link to="/user/profile">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
          <Truck className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Fast Delivery</h2>
            <p className="text-sm text-muted-foreground">Get your favorite meals delivered to your doorstep</p>
          </div>
        </div>

        {/* Delivery Address */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Delivering to</p>
                <p className="font-medium">{selectedAddress.address}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setAddressDialogOpen(true)}>Change</Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants for delivery..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Restaurant List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Restaurants Delivering Near You</h3>
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
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {restaurant.deliveryTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          Rs. {restaurant.deliveryFee}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {restaurant.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Address Selection Dialog */}
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Delivery Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedAddress.id === addr.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => {
                  setSelectedAddress(addr);
                  setAddressDialogOpen(false);
                }}
              >
                <p className="font-medium">{addr.label}</p>
                <p className="text-sm text-muted-foreground">{addr.address}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddressDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Delivery;
