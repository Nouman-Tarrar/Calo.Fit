import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  MapPin,
  Clock,
  Star,
  Flame,
  TrendingUp,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import UserSidebar from "@/components/user/UserSidebar";

// Mock data for restaurants
const featuredRestaurants = [
  {
    id: 1,
    name: "Karachi Biryani House",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    cuisine: "Pakistani",
    rating: 4.8,
    deliveryTime: "30-45 min",
    deliveryFee: "Rs. 99",
    tags: ["High Protein", "Spicy"],
    featured: true,
    priceRange: 2,
  },
  {
    id: 2,
    name: "Lahori Tikka Corner",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    cuisine: "BBQ",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: "Rs. 79",
    tags: ["High Protein", "Grilled"],
    featured: true,
    priceRange: 2,
  },
  {
    id: 3,
    name: "Green Bowl Salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    cuisine: "Healthy",
    rating: 4.9,
    deliveryTime: "20-30 min",
    deliveryFee: "Rs. 49",
    tags: ["Low Carb", "Fresh"],
    featured: true,
    priceRange: 3,
  },
];

const popularDishes = [
  {
    id: 1,
    name: "Chicken Biryani",
    restaurant: "Karachi Biryani House",
    restaurantId: 1,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    price: 350,
    calories: 650,
    protein: 35,
    carbs: 75,
    fat: 22,
  },
  {
    id: 2,
    name: "Seekh Kebab",
    restaurant: "Lahori Tikka Corner",
    restaurantId: 2,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    price: 280,
    calories: 320,
    protein: 28,
    carbs: 8,
    fat: 18,
  },
  {
    id: 3,
    name: "Grilled Chicken Salad",
    restaurant: "Green Bowl Salads",
    restaurantId: 3,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    price: 420,
    calories: 280,
    protein: 32,
    carbs: 15,
    fat: 12,
  },
  {
    id: 4,
    name: "Chapli Kebab",
    restaurant: "Peshawari Dhaba",
    restaurantId: 4,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400",
    price: 320,
    calories: 380,
    protein: 26,
    carbs: 12,
    fat: 24,
  },
];

const cuisineOptions = ["Pakistani", "BBQ", "Healthy", "Chinese", "Fast Food"];
const healthTagOptions = [
  "High Protein",
  "Low Carb",
  "Low Fat",
  "Balanced",
  "Fresh",
  "Grilled",
  "Spicy",
];

const UserHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState([1, 3]);

  const handleAddToCart = (dishName: string) => {
    toast.success(`${dishName} added to cart!`);
  };

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine],
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filteredRestaurants = featuredRestaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine =
      selectedCuisines.length === 0 ||
      selectedCuisines.includes(restaurant.cuisine);
    const matchesRating = restaurant.rating >= minRating;
    const matchesPrice =
      restaurant.priceRange >= priceRange[0] &&
      restaurant.priceRange <= priceRange[1];
    const matchesTags =
      selectedTags.length === 0 ||
      restaurant.tags.some((tag) => selectedTags.includes(tag));
    return (
      matchesSearch &&
      matchesCuisine &&
      matchesRating &&
      matchesPrice &&
      matchesTags
    );
  });

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedTags([]);
    setMinRating(0);
    setPriceRange([1, 3]);
  };

  const activeFilterCount =
    selectedCuisines.length + selectedTags.length + (minRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Menu & Logo */}
            <div className="flex items-center gap-3">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                  <UserSidebar onClose={() => setSidebarOpen(false)} />
                </SheetContent>
              </Sheet>
              <Link to="/" className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold hidden sm:inline">
                  Calo.Fit
                </span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search restaurants, dishes..."
                    className="pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Filter Button - Now separate from search input */}
                <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Filter className="h-4 w-4" />
                      {activeFilterCount > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {activeFilterCount}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Filters</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                        >
                          Clear all
                        </Button>
                      </div>

                      {/* Cuisine Filter */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Cuisine</Label>
                        <div className="flex flex-wrap gap-2">
                          {cuisineOptions.map((cuisine) => (
                            <Badge
                              key={cuisine}
                              variant={
                                selectedCuisines.includes(cuisine)
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer"
                              onClick={() => toggleCuisine(cuisine)}
                            >
                              {cuisine}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Rating Filter */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Minimum Rating:{" "}
                          {minRating > 0 ? minRating.toFixed(1) : "Any"}
                        </Label>
                        <Slider
                          value={[minRating]}
                          onValueChange={(value) => setMinRating(value[0])}
                          max={5}
                          step={0.5}
                          className="w-full"
                        />
                      </div>

                      {/* Price Range Filter */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Price Range
                        </Label>
                        <div className="flex gap-2">
                          {[1, 2, 3].map((price) => (
                            <Badge
                              key={price}
                              variant={
                                priceRange[0] <= price && priceRange[1] >= price
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer"
                              onClick={() => {
                                if (
                                  priceRange[0] === price &&
                                  priceRange[1] === price
                                ) {
                                  setPriceRange([1, 3]);
                                } else {
                                  setPriceRange([price, price]);
                                }
                              }}
                            >
                              {"Rs.".repeat(price)}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Health Tags Filter */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Health Tags
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {healthTagOptions.map((tag) => (
                            <Badge
                              key={tag}
                              variant={
                                selectedTags.includes(tag)
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer text-xs"
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => setFilterOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link to="/user/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>
              <Link to="/user/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Location Bar */}
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Delivering to:</span>
            <button className="font-medium text-foreground hover:text-primary transition-colors">
              DHA Phase 6, Karachi
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Daily Goals Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/30 border-none">
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">Today's Nutrition</h3>
                <p className="text-sm text-muted-foreground">
                  1,250 / 2,000 kcal consumed
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-primary">85g</div>
                  <div className="text-muted-foreground">Protein</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-chart-2">120g</div>
                  <div className="text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-chart-4">45g</div>
                  <div className="text-muted-foreground">Fat</div>
                </div>
              </div>
              <Link to="/user/dietary-plan">
                <Button variant="outline" size="sm">
                  View Plan
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Featured Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-serif">
              Featured Restaurants
            </h2>
            <Link to="/user/restaurants">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/user/restaurant/${restaurant.id}`}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {restaurant.featured && (
                      <Badge className="absolute top-2 left-2 bg-primary">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{restaurant.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {restaurant.cuisine}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                        <span className="font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <span>{restaurant.deliveryFee}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {restaurant.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Dishes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-serif flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Popular Dishes
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularDishes.map((dish) => (
              <Card
                key={dish.id}
                className="group overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link to={`/user/restaurant/${dish.restaurantId}`}>
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm">{dish.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {dish.restaurant}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">
                      Rs. {dish.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {dish.calories} kcal
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-2 text-xs text-center">
                    <div className="bg-primary/10 rounded px-1 py-0.5">
                      <span className="font-medium text-primary">
                        {dish.protein}g
                      </span>
                      <span className="text-muted-foreground block">
                        Protein
                      </span>
                    </div>
                    <div className="bg-chart-2/10 rounded px-1 py-0.5">
                      <span className="font-medium text-chart-2">
                        {dish.carbs}g
                      </span>
                      <span className="text-muted-foreground block">Carbs</span>
                    </div>
                    <div className="bg-chart-4/10 rounded px-1 py-0.5">
                      <span className="font-medium text-chart-4">
                        {dish.fat}g
                      </span>
                      <span className="text-muted-foreground block">Fat</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => handleAddToCart(dish.name)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserHome;
