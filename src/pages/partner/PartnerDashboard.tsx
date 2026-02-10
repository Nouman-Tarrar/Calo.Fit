import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Package, Clock, CheckCircle, DollarSign, Star, TrendingUp, ChefHat, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PartnerSidebar from "@/components/partner/PartnerSidebar";

const stats = [
  { label: "New Orders", value: "5", icon: Package, color: "text-primary" },
  { label: "Preparing", value: "3", icon: Clock, color: "text-chart-4" },
  { label: "Completed Today", value: "12", icon: CheckCircle, color: "text-chart-2" },
  { label: "Today's Earnings", value: "Rs. 8,450", icon: DollarSign, color: "text-primary" },
];

const recentOrders = [
  { 
    id: "ORD-001", 
    customer: "Ahmed K.", 
    phone: "+92 300 1234567",
    address: "House #123, DHA Phase 6, Karachi",
    items: [
      { name: "Chicken Biryani", qty: 2, price: 350 },
      { name: "Seekh Kebab", qty: 1, price: 280 },
    ],
    total: 980, 
    status: "new", 
    time: "2 min ago",
    paymentMethod: "Cash on Delivery",
    note: "Less spicy please",
  },
  { 
    id: "ORD-002", 
    customer: "Sara M.", 
    phone: "+92 321 9876543",
    address: "Floor 5, Dolmen Towers, Clifton",
    items: [
      { name: "Chicken Karahi", qty: 1, price: 650 },
      { name: "Naan", qty: 2, price: 30 },
    ],
    total: 920, 
    status: "preparing", 
    time: "15 min ago",
    paymentMethod: "Card",
    note: "",
  },
  { 
    id: "ORD-003", 
    customer: "Usman R.", 
    phone: "+92 333 5555555",
    address: "Block 2, Gulshan-e-Iqbal",
    items: [
      { name: "Seekh Kebab", qty: 3, price: 280 },
    ],
    total: 840, 
    status: "ready", 
    time: "25 min ago",
    paymentMethod: "Cash on Delivery",
    note: "Extra chutney",
  },
];

interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: string;
  time: string;
  paymentMethod: string;
  note: string;
}

const PartnerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewOrderDialogOpen, setViewOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewOrderDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <PartnerSidebar onClose={() => setSidebarOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Partner Dashboard</span>
            </div>
          </div>
          <Link to="/partner/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{order.id}</p>
                      <Badge variant={order.status === "new" ? "default" : order.status === "preparing" ? "secondary" : "outline"}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer} • {order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">Rs. {order.total}</p>
                    <Button size="sm" className="mt-2" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* View Order Dialog */}
      <Dialog open={viewOrderDialogOpen} onOpenChange={setViewOrderDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <Badge variant={selectedOrder.status === "new" ? "default" : selectedOrder.status === "preparing" ? "secondary" : "outline"}>
                  {selectedOrder.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{selectedOrder.time}</span>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Customer</h4>
                <p className="text-sm">{selectedOrder.customer}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.phone}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.address}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Items</h4>
                <div className="space-y-1">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.qty}x {item.name}</span>
                      <span>Rs. {item.qty * item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span className="text-primary">Rs. {selectedOrder.total}</span>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Payment Method</h4>
                <p className="text-sm">{selectedOrder.paymentMethod}</p>
              </div>

              {selectedOrder.note && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Order Note</h4>
                  <p className="text-sm text-muted-foreground">{selectedOrder.note}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnerDashboard;
