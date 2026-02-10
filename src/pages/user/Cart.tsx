import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, MapPin, CreditCard, Banknote, Flame, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock cart data
const initialCartItems = [
  {
    id: 3,
    name: "Chicken Biryani",
    restaurant: "Karachi Biryani House",
    price: 350,
    quantity: 2,
    calories: 650,
    protein: 35,
    carbs: 75,
    fat: 22,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300",
  },
  {
    id: 2,
    name: "Seekh Kebab",
    restaurant: "Karachi Biryani House",
    price: 280,
    quantity: 1,
    calories: 320,
    protein: 28,
    carbs: 8,
    fat: 18,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300",
  },
];

const savedAddresses = [
  { id: 1, label: "Home", address: "House #123, Street 5, DHA Phase 6, Karachi" },
  { id: 2, label: "Office", address: "Floor 12, Dolmen Towers, Clifton, Karachi" },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderNote, setOrderNote] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMode === "delivery" ? 99 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const totalCalories = cartItems.reduce((sum, item) => sum + item.calories * item.quantity, 0);
  const totalProtein = cartItems.reduce((sum, item) => sum + item.protein * item.quantity, 0);
  const totalCarbs = cartItems.reduce((sum, item) => sum + item.carbs * item.quantity, 0);
  const totalFat = cartItems.reduce((sum, item) => sum + item.fat * item.quantity, 0);

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
    navigate("/user/order-confirmation");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Flame className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some delicious food to get started!</p>
          <Link to="/user/home">
            <Button>Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/user/home">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Your Cart</h1>
              <p className="text-sm text-muted-foreground">{cartItems[0]?.restaurant}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Nutrition Summary */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/30 border-none">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Order Nutrition</span>
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-destructive">{totalCalories} kcal</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary">{totalProtein}g P</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-chart-2">{totalCarbs}g C</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-chart-4">{totalFat}g F</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-muted/30">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.calories} kcal • {item.protein}g P • {item.carbs}g C • {item.fat}g F
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium w-6 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="font-bold text-primary">Rs. {item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Delivery Address
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setAddressDialogOpen(true)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Change
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="font-medium">{selectedAddress.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAddress.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Mode */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryMode} onValueChange={setDeliveryMode}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <span className="font-medium">Delivery</span>
                      <span className="text-sm text-muted-foreground ml-2">Rs. 99</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border mt-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <span className="font-medium">Pickup</span>
                      <span className="text-sm text-muted-foreground ml-2">Free</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-primary" />
                      <span className="font-medium">Cash on Delivery</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border mt-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Order Note */}
            <Card>
              <CardHeader>
                <CardTitle>Order Note (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Less oil, no onions, extra spicy..."
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "Free" : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span>Rs. {tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">Rs. {total}</span>
                </div>
                <Button className="w-full h-12 text-lg" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
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

export default Cart;
