import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Clock, MapPin, Phone, ChevronDown, Check, X, Package, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import PartnerSidebar from "@/components/partner/PartnerSidebar";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "new" | "accepted" | "preparing" | "ready" | "out_for_delivery" | "completed" | "rejected";
  paymentMethod: string;
  notes: string;
  createdAt: string;
  etaMin?: number;
  etaMax?: number;
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Ahmed Khan",
    customerPhone: "+92 300 1234567",
    address: "123 Main Street, Gulshan-e-Iqbal, Karachi",
    items: [
      { name: "Chicken Biryani", quantity: 2, price: 350 },
      { name: "Raita", quantity: 1, price: 50 },
    ],
    total: 750,
    status: "new",
    paymentMethod: "Cash on Delivery",
    notes: "Less spicy please",
    createdAt: "2 mins ago",
  },
  {
    id: "ORD-002",
    customerName: "Sara Ali",
    customerPhone: "+92 321 9876543",
    address: "Block 5, PECHS, Karachi",
    items: [
      { name: "Seekh Kebab", quantity: 4, price: 280 },
      { name: "Naan", quantity: 2, price: 30 },
    ],
    total: 1180,
    status: "preparing",
    paymentMethod: "Card",
    notes: "",
    createdAt: "15 mins ago",
    etaMin: 20,
    etaMax: 30,
  },
  {
    id: "ORD-003",
    customerName: "Bilal Hassan",
    customerPhone: "+92 333 5555555",
    address: "Clifton Block 4, Karachi",
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 350 },
    ],
    total: 350,
    status: "ready",
    paymentMethod: "Cash on Delivery",
    notes: "Ring the bell twice",
    createdAt: "25 mins ago",
    etaMin: 10,
    etaMax: 15,
  },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  accepted: "bg-purple-100 text-purple-700",
  preparing: "bg-yellow-100 text-yellow-700",
  ready: "bg-green-100 text-green-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  completed: "bg-gray-100 text-gray-700",
  rejected: "bg-red-100 text-red-700",
};

const PartnerOrders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [etaDialogOpen, setEtaDialogOpen] = useState(false);
  const [etaMin, setEtaMin] = useState(20);
  const [etaMax, setEtaMax] = useState(30);
  const { toast } = useToast();

  const handleAcceptOrder = (order: Order) => {
    setSelectedOrder(order);
    setEtaDialogOpen(true);
  };

  const confirmAcceptOrder = () => {
    if (selectedOrder) {
      setOrders(orders.map(o =>
        o.id === selectedOrder.id
          ? { ...o, status: "accepted" as const, etaMin, etaMax }
          : o
      ));
      toast({ title: "Order Accepted", description: `Order ${selectedOrder.id} has been accepted with ETA ${etaMin}-${etaMax} mins.` });
      setEtaDialogOpen(false);
    }
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: "rejected" as const } : o
    ));
    toast({ title: "Order Rejected", description: `Order ${orderId} has been rejected.` });
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    toast({ title: "Status Updated", description: `Order ${orderId} is now ${newStatus.replace("_", " ")}.` });
  };

  const filterOrders = (status: string) => {
    if (status === "all") return orders;
    if (status === "active") return orders.filter(o => !["completed", "rejected"].includes(o.status));
    return orders.filter(o => o.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground">{order.createdAt}</p>
          </div>
          <Badge className={statusColors[order.status]}>
            {order.status.replace("_", " ").toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{order.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{order.customerPhone}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <span>{order.address}</span>
          </div>
        </div>

        {/* Items */}
        <div className="bg-accent/50 rounded-lg p-3">
          <p className="font-medium mb-2">Order Items</p>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
            <span>Total</span>
            <span>Rs. {order.total}</span>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="text-sm">
            <span className="font-medium">Notes: </span>
            <span className="text-muted-foreground">{order.notes}</span>
          </div>
        )}

        {/* Payment */}
        <div className="text-sm">
          <span className="font-medium">Payment: </span>
          <span className="text-muted-foreground">{order.paymentMethod}</span>
        </div>

        {/* ETA */}
        {order.etaMin && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <Clock className="h-4 w-4" />
            <span>ETA: {order.etaMin}-{order.etaMax} mins</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {order.status === "new" && (
            <>
              <Button className="flex-1" onClick={() => handleAcceptOrder(order)}>
                <Check className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleRejectOrder(order.id)}>
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          {order.status === "accepted" && (
            <Button className="w-full" onClick={() => handleUpdateStatus(order.id, "preparing")}>
              <Package className="h-4 w-4 mr-2" />
              Start Preparing
            </Button>
          )}
          {order.status === "preparing" && (
            <Button className="w-full" onClick={() => handleUpdateStatus(order.id, "ready")}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Ready
            </Button>
          )}
          {order.status === "ready" && (
            <Button className="w-full" onClick={() => handleUpdateStatus(order.id, "out_for_delivery")}>
              <Truck className="h-4 w-4 mr-2" />
              Out for Delivery
            </Button>
          )}
          {order.status === "out_for_delivery" && (
            <Button className="w-full" onClick={() => handleUpdateStatus(order.id, "completed")}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
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
              <PartnerSidebar onClose={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold">Orders</h1>
          <Link to="/partner/profile">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="new">New ({filterOrders("new").length})</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          {["new", "active", "completed", "all"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {filterOrders(tab).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No orders found
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filterOrders(tab).map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* ETA Dialog */}
        <Dialog open={etaDialogOpen} onOpenChange={setEtaDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Estimated Delivery Time</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Minimum (mins)</Label>
                <Input
                  type="number"
                  value={etaMin}
                  onChange={(e) => setEtaMin(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum (mins)</Label>
                <Input
                  type="number"
                  value={etaMax}
                  onChange={(e) => setEtaMax(Number(e.target.value))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEtaDialogOpen(false)}>Cancel</Button>
              <Button onClick={confirmAcceptOrder}>Accept Order</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default PartnerOrders;
