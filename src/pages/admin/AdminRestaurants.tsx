import { useState } from "react";
import { Search, MoreVertical, CheckCircle, XCircle, Eye, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Restaurant {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  type: string;
  status: "pending" | "approved" | "rejected" | "disabled";
  rating: number;
  ordersCount: number;
  revenue: number;
  joinedDate: string;
  cnicFront: string;
  cnicBack: string;
}

const mockRestaurants: Restaurant[] = [
  { id: "R001", name: "Karachi Biryani House", ownerName: "Muhammad Ali", email: "ali@kbh.pk", type: "Restaurant", status: "approved", rating: 4.8, ordersCount: 1250, revenue: 875000, joinedDate: "Jan 10, 2024", cnicFront: "https://via.placeholder.com/300x200?text=CNIC+Front", cnicBack: "https://via.placeholder.com/300x200?text=CNIC+Back" },
  { id: "R002", name: "Healthy Bites", ownerName: "Ayesha Khan", email: "ayesha@healthybites.pk", type: "Café", status: "approved", rating: 4.9, ordersCount: 890, revenue: 534000, joinedDate: "Feb 15, 2024", cnicFront: "https://via.placeholder.com/300x200?text=CNIC+Front", cnicBack: "https://via.placeholder.com/300x200?text=CNIC+Back" },
  { id: "R003", name: "Home Kitchen Express", ownerName: "Fatima Noor", email: "fatima@hke.pk", type: "Home Chef", status: "pending", rating: 0, ordersCount: 0, revenue: 0, joinedDate: "Mar 20, 2024", cnicFront: "https://via.placeholder.com/300x200?text=CNIC+Front", cnicBack: "https://via.placeholder.com/300x200?text=CNIC+Back" },
  { id: "R004", name: "Lahore Tikka Corner", ownerName: "Usman Shah", email: "usman@ltc.pk", type: "Restaurant", status: "approved", rating: 4.6, ordersCount: 567, revenue: 340200, joinedDate: "Mar 01, 2024", cnicFront: "https://via.placeholder.com/300x200?text=CNIC+Front", cnicBack: "https://via.placeholder.com/300x200?text=CNIC+Back" },
  { id: "R005", name: "Fresh Delights", ownerName: "Zainab Malik", email: "zainab@fd.pk", type: "Café", status: "rejected", rating: 0, ordersCount: 0, revenue: 0, joinedDate: "Mar 25, 2024", cnicFront: "https://via.placeholder.com/300x200?text=CNIC+Front", cnicBack: "https://via.placeholder.com/300x200?text=CNIC+Back" },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  disabled: "bg-gray-100 text-gray-700",
};

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const { toast } = useToast();

  const filterRestaurants = (status?: string) => {
    return restaurants.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || r.type === typeFilter;
      const matchesStatus = !status || status === "all" || r.status === status;
      return matchesSearch && matchesType && matchesStatus;
    });
  };

  const handleApprove = (id: string) => {
    setRestaurants(restaurants.map(r => r.id === id ? { ...r, status: "approved" as const } : r));
    toast({ title: "Restaurant Approved", description: "The restaurant has been approved and is now live." });
  };

  const handleReject = (id: string) => {
    setRestaurants(restaurants.map(r => r.id === id ? { ...r, status: "rejected" as const } : r));
    toast({ title: "Restaurant Rejected", description: "The application has been rejected." });
  };

  const handleDisable = (id: string) => {
    setRestaurants(restaurants.filter(r => r.id !== id));
    toast({ title: "Restaurant Deleted", description: "The restaurant account has been deleted." });
  };

  const handleViewRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setViewDialogOpen(true);
  };

  const pendingCount = restaurants.filter(r => r.status === "pending").length;

  const RestaurantTable = ({ data }: { data: Restaurant[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Restaurant</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((restaurant) => (
          <TableRow key={restaurant.id}>
            <TableCell>
              <div>
                <p className="font-medium">{restaurant.name}</p>
                <p className="text-sm text-muted-foreground">{restaurant.ownerName}</p>
              </div>
            </TableCell>
            <TableCell>{restaurant.type}</TableCell>
            <TableCell>
              <Badge className={statusColors[restaurant.status]}>
                {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              {restaurant.rating > 0 ? (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {restaurant.rating}
                </div>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>
            <TableCell>{restaurant.ordersCount}</TableCell>
            <TableCell>Rs. {restaurant.revenue.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleViewRestaurant(restaurant)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  {restaurant.status === "pending" && (
                    <>
                      <DropdownMenuItem onClick={() => handleApprove(restaurant.id)} className="text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleReject(restaurant.id)} className="text-destructive">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </DropdownMenuItem>
                    </>
                  )}
                  {restaurant.status === "approved" && (
                    <DropdownMenuItem onClick={() => handleDisable(restaurant.id)} className="text-destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Disable
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Restaurants</h1>
        {pendingCount > 0 && (
          <Badge className="bg-yellow-100 text-yellow-700">{pendingCount} pending approval</Badge>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search restaurants..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Restaurant">Restaurant</SelectItem>
                <SelectItem value="Café">Café</SelectItem>
                <SelectItem value="Home Chef">Home Chef</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {["all", "pending", "approved", "rejected"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-0">
                <RestaurantTable data={filterRestaurants(tab)} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Restaurant Details</DialogTitle>
          </DialogHeader>
          {selectedRestaurant && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Restaurant Name</p>
                  <p className="font-medium">{selectedRestaurant.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={statusColors[selectedRestaurant.status]}>
                    {selectedRestaurant.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Owner Name</p>
                  <p className="font-medium">{selectedRestaurant.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedRestaurant.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedRestaurant.type}</p>
                </div>
              </div>

              {/* CNIC Images */}
              <div className="space-y-4">
                <h4 className="font-semibold">Owner CNIC Documents</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">CNIC Front</p>
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={selectedRestaurant.cnicFront} 
                        alt="CNIC Front" 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">CNIC Back</p>
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={selectedRestaurant.cnicBack} 
                        alt="CNIC Back" 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRestaurants;
