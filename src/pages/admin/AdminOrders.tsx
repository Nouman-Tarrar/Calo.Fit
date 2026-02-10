import { useState } from "react";
import { Search, Eye, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface Order {
  id: string;
  customerName: string;
  restaurantName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "new" | "accepted" | "preparing" | "ready" | "out_for_delivery" | "completed" | "rejected" | "cancelled";
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "refunded";
  date: string;
  time: string;
}

const mockOrders: Order[] = [
  { id: "ORD-001", customerName: "Ahmed Khan", restaurantName: "Karachi Biryani House", items: [{ name: "Chicken Biryani", quantity: 2, price: 350 }], total: 800, status: "completed", paymentMethod: "COD", paymentStatus: "paid", date: "2024-03-20", time: "12:30 PM" },
  { id: "ORD-002", customerName: "Sara Ali", restaurantName: "Healthy Bites", items: [{ name: "Grilled Salad", quantity: 1, price: 450 }], total: 500, status: "out_for_delivery", paymentMethod: "Card", paymentStatus: "paid", date: "2024-03-20", time: "1:15 PM" },
  { id: "ORD-003", customerName: "Bilal Hassan", restaurantName: "Lahore Tikka Corner", items: [{ name: "Seekh Kebab", quantity: 4, price: 280 }], total: 1180, status: "preparing", paymentMethod: "COD", paymentStatus: "pending", date: "2024-03-20", time: "2:00 PM" },
  { id: "ORD-004", customerName: "Fatima Zahra", restaurantName: "Karachi Biryani House", items: [{ name: "Mutton Biryani", quantity: 1, price: 450 }], total: 550, status: "rejected", paymentMethod: "Card", paymentStatus: "refunded", date: "2024-03-19", time: "7:30 PM" },
  { id: "ORD-005", customerName: "Hassan Raza", restaurantName: "Green Bowl", items: [{ name: "Protein Bowl", quantity: 2, price: 380 }], total: 810, status: "completed", paymentMethod: "Card", paymentStatus: "paid", date: "2024-03-19", time: "1:00 PM" },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  accepted: "bg-purple-100 text-purple-700",
  preparing: "bg-yellow-100 text-yellow-700",
  ready: "bg-cyan-100 text-cyan-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
};

const paymentStatusColors: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  refunded: "bg-blue-100 text-blue-700",
};

const AdminOrders = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  // Stats
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === "completed").length;
  const totalRevenue = orders.filter(o => o.paymentStatus === "paid").reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Badge variant="secondary">{totalOrders} total orders</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">Rs. {totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, customer, or restaurant..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="COD">Cash on Delivery</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.restaurantName}</TableCell>
                  <TableCell>Rs. {order.total}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]}>
                      {order.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{order.paymentMethod}</p>
                      <Badge variant="outline" className={paymentStatusColors[order.paymentStatus]}>
                        {order.paymentStatus}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {order.date}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Restaurant</p>
                  <p className="font-medium">{selectedOrder.restaurantName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={statusColors[selectedOrder.status]}>
                    {selectedOrder.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <div className="flex items-center gap-2">
                    <span>{selectedOrder.paymentMethod}</span>
                    <Badge variant="outline" className={paymentStatusColors[selectedOrder.paymentStatus]}>
                      {selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Items</p>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>Rs. {selectedOrder.total}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Order Date</span>
                <span>{selectedOrder.date} at {selectedOrder.time}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
