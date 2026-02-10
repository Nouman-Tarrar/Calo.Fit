import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, Clock, ChefHat, Truck, MapPin, Phone, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const orderStatuses = [
  { id: 1, label: "Order Placed", icon: CheckCircle, completed: true },
  { id: 2, label: "Accepted", icon: Package, completed: true },
  { id: 3, label: "Preparing", icon: ChefHat, completed: true },
  { id: 4, label: "Out for Delivery", icon: Truck, completed: false },
  { id: 5, label: "Delivered", icon: MapPin, completed: false },
];

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [currentStep, setCurrentStep] = useState(3);
  const [eta, setEta] = useState({ min: 25, max: 35 });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate order progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
        setLastUpdated(new Date());
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const progressPercent = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
        <div className="container flex items-center h-16 px-4 gap-4">
          <Link to="/user/home">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <h1 className="text-xl font-bold">Order #{orderId || "12345"}</h1>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Order Confirmed!</h2>
          <p className="text-muted-foreground mt-2">Your order has been accepted by the restaurant</p>
        </div>

        {/* ETA Card */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Estimated Delivery Time</span>
            </div>
            <p className="text-3xl font-bold">{eta.min} - {eta.max} mins</p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        {/* Order Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={progressPercent} className="h-2" />
            
            <div className="space-y-4">
              {orderStatuses.map((status, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep - 1;
                
                return (
                  <div key={status.id} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? "bg-primary text-primary-foreground" : 
                      isCurrent ? "bg-primary/20 text-primary border-2 border-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      <status.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isCompleted || isCurrent ? "" : "text-muted-foreground"}`}>
                        {status.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-primary">In progress...</p>
                      )}
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Restaurant</p>
              <p className="font-medium">Karachi Biryani House</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Items</p>
              <ul className="mt-2 space-y-2">
                <li className="flex justify-between">
                  <span>2x Chicken Biryani</span>
                  <span>Rs. 700</span>
                </li>
                <li className="flex justify-between">
                  <span>1x Raita</span>
                  <span>Rs. 50</span>
                </li>
              </ul>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Rs. 850</span>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-sm text-muted-foreground">123 Main Street, Gulshan-e-Iqbal, Karachi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Restaurant */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Need help?</p>
                  <p className="text-sm text-muted-foreground">Contact restaurant</p>
                </div>
              </div>
              <Button variant="outline">Call</Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Link to="/user/home" className="flex-1">
            <Button variant="outline" className="w-full">Back to Home</Button>
          </Link>
          <Link to="/user/help" className="flex-1">
            <Button className="w-full">Get Help</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
