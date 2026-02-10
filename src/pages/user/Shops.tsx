import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Search, Star, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserSidebar from "@/components/user/UserSidebar";

const featuredShops = [
  { id: 1, name: "Karachi Biryani House", cuisine: "Pakistani", rating: 4.8, image: "🍛", featured: true, distance: "0.5 km" },
  { id: 2, name: "Healthy Bites", cuisine: "Health Food", rating: 4.9, image: "🥗", featured: true, distance: "0.8 km" },
  { id: 3, name: "Green Bowl", cuisine: "Salads", rating: 4.7, image: "🥬", featured: true, distance: "1.0 km" },
];

const nearbyShops = [
  { id: 1, name: "Karachi Biryani House", cuisine: "Pakistani", rating: 4.8, image: "🍛", distance: "0.5 km" },
  { id: 4, name: "Fresh Juice Bar", cuisine: "Beverages", rating: 4.6, image: "🧃", distance: "0.3 km" },
  { id: 5, name: "Lahore Tikka Corner", cuisine: "BBQ", rating: 4.6, image: "🍖", distance: "1.2 km" },
  { id: 6, name: "Desi Dhaba", cuisine: "Pakistani", rating: 4.4, image: "🍲", distance: "1.5 km" },
  { id: 7, name: "Protein Kitchen", cuisine: "Health Food", rating: 4.8, image: "💪", distance: "2.0 km" },
];

const Shops = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filterShops = (shops: typeof nearbyShops) =>
    shops.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-xl font-bold">Shops</h1>
          <Link to="/user/profile">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shops..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Featured
            </TabsTrigger>
            <TabsTrigger value="nearby" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Nearby
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              <h3 className="font-semibold">Top Rated & Featured</h3>
            </div>
            {filterShops(featuredShops).map((shop) => (
              <Link key={shop.id} to={`/user/restaurant/${shop.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg bg-accent flex items-center justify-center text-4xl">
                        {shop.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{shop.name}</h4>
                              <Badge className="bg-primary/20 text-primary text-xs">Featured</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{shop.cuisine}</p>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{shop.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {shop.distance}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="nearby" className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <h3 className="font-semibold">Shops Near You</h3>
            </div>
            {filterShops(nearbyShops).map((shop) => (
              <Link key={shop.id} to={`/user/restaurant/${shop.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center text-3xl">
                        {shop.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{shop.name}</h4>
                            <p className="text-sm text-muted-foreground">{shop.cuisine}</p>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{shop.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {shop.distance}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Shops;
