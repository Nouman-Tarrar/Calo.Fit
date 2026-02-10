import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin, Truck, ShoppingBag, Plus, Minus, Flame, Flag, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock restaurant data
const restaurantsData: { [key: string]: { name: string; cuisine: string; rating: number; reviews: number; deliveryTime: string; distance: string; image: string } } = {
  "1": { name: "Karachi Biryani House", cuisine: "Pakistani • Biryani • BBQ", rating: 4.8, reviews: 2100, deliveryTime: "30-45 min", distance: "2.5 km", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800" },
  "2": { name: "Lahori Tikka Corner", cuisine: "BBQ • Grilled • Pakistani", rating: 4.6, reviews: 1500, deliveryTime: "25-35 min", distance: "1.8 km", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800" },
  "3": { name: "Green Bowl Salads", cuisine: "Healthy • Salads • Fresh", rating: 4.9, reviews: 980, deliveryTime: "20-30 min", distance: "1.2 km", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" },
  "4": { name: "Peshawari Dhaba", cuisine: "Pakistani • Chapli Kebab", rating: 4.5, reviews: 750, deliveryTime: "35-50 min", distance: "3.5 km", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800" },
};

// Mock menu data per restaurant
const menusData: { [key: string]: { id: string; name: string; items: { id: number; name: string; description: string; price: number; calories: number; protein: number; carbs: number; fat: number; image: string; tags: string[]; allergies: string[] }[] }[] } = {
  "1": [
    {
      id: "starters",
      name: "Starters",
      items: [
        { id: 1, name: "Chicken Samosa", description: "Crispy pastry filled with spiced chicken", price: 80, calories: 180, protein: 8, carbs: 18, fat: 9, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300", tags: ["Popular"], allergies: ["Gluten"] },
        { id: 2, name: "Seekh Kebab", description: "Grilled minced meat skewers with herbs", price: 280, calories: 320, protein: 28, carbs: 8, fat: 18, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300", tags: ["High Protein"], allergies: [] },
      ],
    },
    {
      id: "main",
      name: "Main Course",
      items: [
        { id: 3, name: "Chicken Biryani", description: "Aromatic basmati rice with tender chicken and spices", price: 350, calories: 650, protein: 35, carbs: 75, fat: 22, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300", tags: ["Bestseller", "High Protein"], allergies: ["Gluten", "Dairy"] },
        { id: 4, name: "Mutton Karahi", description: "Traditional wok-cooked mutton with tomatoes", price: 850, calories: 580, protein: 42, carbs: 12, fat: 38, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300", tags: ["Premium", "High Protein"], allergies: [] },
      ],
    },
  ],
  "2": [
    {
      id: "starters",
      name: "Starters",
      items: [
        { id: 1, name: "Malai Boti", description: "Creamy marinated chicken chunks", price: 320, calories: 280, protein: 25, carbs: 6, fat: 18, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300", tags: ["High Protein"], allergies: ["Dairy"] },
      ],
    },
    {
      id: "main",
      name: "Main Course",
      items: [
        { id: 2, name: "Lahori Tikka Platter", description: "Assorted grilled tikka pieces", price: 650, calories: 520, protein: 48, carbs: 15, fat: 28, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300", tags: ["Bestseller"], allergies: [] },
      ],
    },
  ],
  "3": [
    {
      id: "salads",
      name: "Salads",
      items: [
        { id: 1, name: "Grilled Chicken Salad", description: "Fresh greens with grilled chicken breast", price: 420, calories: 280, protein: 32, carbs: 15, fat: 12, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300", tags: ["Low Carb", "High Protein"], allergies: [] },
        { id: 2, name: "Caesar Salad", description: "Classic caesar with parmesan", price: 350, calories: 320, protein: 18, carbs: 22, fat: 18, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300", tags: ["Popular"], allergies: ["Dairy", "Eggs", "Gluten"] },
      ],
    },
  ],
  "4": [
    {
      id: "main",
      name: "Main Course",
      items: [
        { id: 1, name: "Chapli Kebab", description: "Famous Peshawari flat kebabs", price: 320, calories: 380, protein: 26, carbs: 12, fat: 24, image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300", tags: ["Bestseller"], allergies: [] },
      ],
    },
  ],
};

const RestaurantMenu = () => {
  const { id } = useParams<{ id: string }>();
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [flaggingItem, setFlaggingItem] = useState<{ id: number; name: string } | null>(null);

  const restaurant = restaurantsData[id || "1"] || restaurantsData["1"];
  const menuCategories = menusData[id || "1"] || menusData["1"];

  const addToCart = (itemId: number) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    toast.success("Added to cart!");
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleSubmitReview = () => {
    if (!reviewForm.comment) {
      toast.error("Please write a review");
      return;
    }
    toast.success("Review submitted successfully!");
    setReviewDialogOpen(false);
    setReviewForm({ rating: 5, comment: "" });
  };

  const handleOpenFlagDialog = (item: { id: number; name: string }) => {
    setFlaggingItem(item);
    setFlagReason("");
    setFlagDialogOpen(true);
  };

  const handleSubmitFlag = () => {
    if (!flagReason) {
      toast.error("Please provide a reason");
      return;
    }
    toast.success(`${flaggingItem?.name} has been flagged for review`);
    setFlagDialogOpen(false);
    setFlagReason("");
    setFlaggingItem(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Restaurant Header */}
      <div className="relative h-64 bg-gradient-to-b from-foreground/60 to-foreground/90">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
        
        {/* Back Button */}
        <Link to="/user/home" className="absolute top-4 left-4">
          <Button variant="ghost" size="icon" className="bg-background/20 hover:bg-background/40 text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        {/* Restaurant Info */}
        <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
          <h1 className="text-2xl md:text-3xl font-bold font-serif">{restaurant.name}</h1>
          <p className="text-sm opacity-90 mt-1">{restaurant.cuisine}</p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
              <span className="font-medium">{restaurant.rating}</span>
              <span className="opacity-75">({restaurant.reviews.toLocaleString()} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Options & Write Review */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Button variant="secondary" size="sm" className="gap-2">
                <Truck className="h-4 w-4" />
                Delivery • Rs. 99
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                Pickup • Free
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setReviewDialogOpen(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Write a Review
            </Button>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue={menuCategories[0]?.id || "starters"}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {menuCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <h2 className="text-xl font-bold mb-4">{category.name}</h2>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-32 h-32 sm:h-auto flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold">{item.name}</h3>
                                {item.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                              
                              {/* Nutrition Info */}
                              <div className="flex items-center gap-3 mt-3 text-xs">
                                <div className="flex items-center gap-1">
                                  <Flame className="h-3 w-3 text-destructive" />
                                  <span>{item.calories} kcal</span>
                                </div>
                                <div className="text-primary font-medium">{item.protein}g P</div>
                                <div className="text-chart-2 font-medium">{item.carbs}g C</div>
                                <div className="text-chart-4 font-medium">{item.fat}g F</div>
                              </div>

                              {/* Allergy Tags */}
                              <div className="flex flex-wrap gap-1 mt-2">
                                {item.allergies.length > 0 ? (
                                  item.allergies.map((allergy) => (
                                    <Badge key={allergy} variant="outline" className="text-xs border-orange-300 text-orange-600">
                                      ⚠️ {allergy}
                                    </Badge>
                                  ))
                                ) : (
                                  <Badge variant="outline" className="text-xs text-muted-foreground">No Allergies</Badge>
                                )}
                              </div>

                              {/* Flag Button */}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="mt-2 text-muted-foreground hover:text-orange-500"
                                onClick={() => handleOpenFlagDialog({ id: item.id, name: item.name })}
                              >
                                <Flag className="h-3 w-3 mr-1" />
                                Flag Item
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-bold text-primary">Rs. {item.price}</p>
                              {cart[item.id] ? (
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="font-medium w-6 text-center">{cart[item.id]}</span>
                                  <Button
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => addToCart(item.id)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => addToCart(item.id)}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
          <Link to="/user/cart">
            <Button className="w-full h-14 text-lg shadow-xl">
              View Cart ({totalItems} items)
            </Button>
          </Link>
        </div>
      )}

      {/* Write Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review for {restaurant.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`h-8 w-8 ${star <= reviewForm.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Your Review</Label>
              <Textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                placeholder="Share your experience..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitReview}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Flag Item Dialog */}
      <Dialog open={flagDialogOpen} onOpenChange={setFlagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Flag {flaggingItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Reason for flagging</Label>
              <Textarea
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="e.g., Incorrect nutrition info, misleading description..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFlagDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitFlag} className="bg-orange-500 hover:bg-orange-600">
              <Flag className="h-4 w-4 mr-2" />
              Submit Flag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantMenu;
