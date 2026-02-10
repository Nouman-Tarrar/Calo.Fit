import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Star, MessageSquare, Flag, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import PartnerSidebar from "@/components/partner/PartnerSidebar";

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  orderId: string;
  reply?: string;
  flagged?: boolean;
  flagReason?: string;
}

const initialReviews: Review[] = [
  { id: 1, customerName: "Ahmed Khan", rating: 5, comment: "Best biryani in Karachi! The portion size was generous and the taste was authentic. Will definitely order again.", date: "2 days ago", orderId: "ORD-001" },
  { id: 2, customerName: "Sara Ali", rating: 4, comment: "Good food, slightly late delivery but the quality made up for it. Seekh kebabs were excellent!", date: "5 days ago", orderId: "ORD-002", reply: "Thank you for your feedback! We're working on improving our delivery times." },
  { id: 3, customerName: "Bilal Hassan", rating: 3, comment: "Food was okay but could use more spices. The raita was good though.", date: "1 week ago", orderId: "ORD-003" },
  { id: 4, customerName: "Fatima Zahra", rating: 5, comment: "Absolutely loved it! The chicken was so tender and flavorful. Perfect for my fitness goals too with the macro info!", date: "1 week ago", orderId: "ORD-004" },
];

const PartnerReviews = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState("");
  const [flagReason, setFlagReason] = useState("");
  const { toast } = useToast();

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100,
  }));

  const handleReply = (review: Review) => {
    setSelectedReview(review);
    setReplyText(review.reply || "");
    setReplyDialogOpen(true);
  };

  const submitReply = () => {
    if (selectedReview) {
      setReviews(reviews.map(r =>
        r.id === selectedReview.id ? { ...r, reply: replyText } : r
      ));
      toast({ title: "Reply Sent", description: "Your reply has been posted." });
      setReplyDialogOpen(false);
    }
  };

  const handleOpenFlagDialog = (review: Review) => {
    setSelectedReview(review);
    setFlagReason("");
    setFlagDialogOpen(true);
  };

  const handleFlag = () => {
    if (!flagReason) {
      toast({ title: "Error", description: "Please provide a reason for flagging.", variant: "destructive" });
      return;
    }
    if (selectedReview) {
      setReviews(reviews.map(r =>
        r.id === selectedReview.id ? { ...r, flagged: true, flagReason } : r
      ));
      toast({ title: "Review Flagged", description: "The review has been reported to admin for moderation." });
      setFlagDialogOpen(false);
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
        />
      ))}
    </div>
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
          <h1 className="text-xl font-bold">Reviews</h1>
          <Link to="/partner/profile">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold text-primary mb-2">{averageRating}</div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(Number(averageRating)))}
              </div>
              <p className="text-muted-foreground">Based on {reviews.length} reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="w-8 text-sm">{rating} ★</span>
                  <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm text-muted-foreground">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">All Reviews</h2>
          {reviews.map((review) => (
            <Card key={review.id} className={review.flagged ? "border-orange-300" : ""}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.customerName}</span>
                      {review.flagged && (
                        <Badge variant="outline" className="text-orange-500 border-orange-500">
                          Flagged
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">• {review.date}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">{review.orderId}</Badge>
                </div>

                <p className="text-muted-foreground">{review.comment}</p>

                {review.reply && (
                  <div className="bg-accent/50 rounded-lg p-3 mt-3">
                    <p className="text-sm font-medium mb-1">Your Reply:</p>
                    <p className="text-sm text-muted-foreground">{review.reply}</p>
                  </div>
                )}

                {review.flagged && review.flagReason && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3">
                    <p className="text-sm font-medium mb-1 text-orange-700">Flag Reason:</p>
                    <p className="text-sm text-orange-600">{review.flagReason}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleReply(review)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {review.reply ? "Edit Reply" : "Reply"}
                  </Button>
                  {!review.flagged && (
                    <Button variant="ghost" size="sm" onClick={() => handleOpenFlagDialog(review)} className="text-orange-500">
                      <Flag className="h-4 w-4 mr-2" />
                      Flag
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply Dialog */}
        <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reply to Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedReview && (
                <div className="bg-accent/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{selectedReview.customerName}</span>
                    {renderStars(selectedReview.rating)}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedReview.comment}</p>
                </div>
              )}
              <Textarea
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>Cancel</Button>
              <Button onClick={submitReply}>
                <Send className="h-4 w-4 mr-2" />
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Flag Dialog */}
        <Dialog open={flagDialogOpen} onOpenChange={setFlagDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Flag Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedReview && (
                <div className="bg-accent/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{selectedReview.customerName}</span>
                    {renderStars(selectedReview.rating)}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedReview.comment}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label>Reason for flagging</Label>
                <Textarea
                  placeholder="Explain why you're flagging this review..."
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFlagDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleFlag} className="bg-orange-500 hover:bg-orange-600">
                <Flag className="h-4 w-4 mr-2" />
                Submit Flag
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default PartnerReviews;
