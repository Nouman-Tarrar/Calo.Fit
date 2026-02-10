import { useState } from "react";
import { Search, Eye, CheckCircle, XCircle, Flag, MessageSquare, UtensilsCrossed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface FlaggedItem {
  id: string;
  type: "review" | "menu";
  restaurantName: string;
  reportedBy: string;
  reason: string;
  content: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const mockFlaggedItems: FlaggedItem[] = [
  { id: "F001", type: "review", restaurantName: "Karachi Biryani House", reportedBy: "Restaurant Owner", reason: "Fake review", content: "This is the worst food I've ever had. Total scam!", date: "2 hours ago", status: "pending" },
  { id: "F003", type: "menu", restaurantName: "Lahore Tikka Corner", reportedBy: "User", reason: "Misleading information", content: "Claims 0 calories for biryani", date: "3 days ago", status: "pending" },
  { id: "F004", type: "review", restaurantName: "Green Bowl", reportedBy: "Restaurant Owner", reason: "Harassment", content: "The owner is a terrible person...", date: "1 week ago", status: "approved" },
  { id: "F006", type: "menu", restaurantName: "Fresh Kitchen", reportedBy: "User", reason: "Incorrect allergy info", content: "Item listed as nut-free but contains peanuts", date: "2 days ago", status: "pending" },
];

const typeIcons = {
  review: MessageSquare,
  menu: UtensilsCrossed,
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const AdminModeration = () => {
  const [items, setItems] = useState<FlaggedItem[]>(mockFlaggedItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<FlaggedItem | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const { toast } = useToast();

  const filterItems = (status: string) => {
    return items.filter(item => {
      const matchesSearch = item.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = status === "all" || item.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  const handleApprove = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, status: "approved" as const } : item));
    toast({ title: "Content Approved", description: "The flagged content has been approved and the flag removed." });
    setViewDialogOpen(false);
  };

  const handleReject = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, status: "rejected" as const } : item));
    toast({ title: "Content Removed", description: "The flagged content has been removed from the platform." });
    setViewDialogOpen(false);
  };

  const handleView = (item: FlaggedItem) => {
    setSelectedItem(item);
    setViewDialogOpen(true);
  };

  const pendingCount = items.filter(i => i.status === "pending").length;

  const ItemCard = ({ item }: { item: FlaggedItem }) => {
    const TypeIcon = typeIcons[item.type];
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <TypeIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{item.restaurantName}</p>
                  <p className="text-sm text-muted-foreground">{item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {item.date}</p>
                </div>
                <Badge className={statusColors[item.status]}>
                  {item.status}
                </Badge>
              </div>
              <div className="mt-2 p-2 bg-accent/50 rounded text-sm">
                <p className="text-muted-foreground line-clamp-2">{item.content}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Flag className="h-4 w-4 text-orange-500" />
                <span className="text-muted-foreground">Reported by {item.reportedBy}: {item.reason}</span>
              </div>
              {item.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => handleView(item)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                  <Button size="sm" variant="ghost" className="text-green-600" onClick={() => handleApprove(item.id)}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleReject(item.id)}>
                    <XCircle className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content Moderation</h1>
        {pendingCount > 0 && (
          <Badge className="bg-yellow-100 text-yellow-700">{pendingCount} pending review</Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">{items.filter(i => i.type === "review").length}</p>
            <p className="text-sm text-muted-foreground">Flagged Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <UtensilsCrossed className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">{items.filter(i => i.type === "menu").length}</p>
            <p className="text-sm text-muted-foreground">Flagged Menu Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flag className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search flagged content..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Removed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        {["pending", "approved", "rejected", "all"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filterItems(tab).length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No flagged content found
              </div>
            ) : (
              filterItems(tab).map((item) => (
                <ItemCard key={item.id} item={item} />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Flagged Content</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{selectedItem.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Restaurant</p>
                  <p className="font-medium">{selectedItem.restaurantName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reported By</p>
                  <p className="font-medium">{selectedItem.reportedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reason</p>
                  <p className="font-medium">{selectedItem.reason}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Content</p>
                <div className="p-4 bg-accent rounded-lg">
                  <p>{selectedItem.content}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Cancel</Button>
            <Button variant="default" onClick={() => selectedItem && handleApprove(selectedItem.id)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve (Keep Content)
            </Button>
            <Button variant="destructive" onClick={() => selectedItem && handleReject(selectedItem.id)}>
              <XCircle className="h-4 w-4 mr-2" />
              Remove Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminModeration;
