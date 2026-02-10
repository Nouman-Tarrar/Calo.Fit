import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, HelpCircle, BookOpen, MessageCircle, Phone, Mail, ChevronRight, PlayCircle, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PartnerSidebar from "@/components/partner/PartnerSidebar";

const tutorials = [
  { title: "Getting Started with Your Dashboard", duration: "5 min", icon: PlayCircle },
  { title: "How to Add Menu Items", duration: "3 min", icon: PlayCircle },
  { title: "Managing Orders Effectively", duration: "4 min", icon: PlayCircle },
  { title: "Setting Up Delivery Options", duration: "3 min", icon: PlayCircle },
  { title: "Responding to Customer Reviews", duration: "2 min", icon: PlayCircle },
];

const faqs = [
  {
    category: "Menu Management",
    questions: [
      { q: "How do I add a new menu item?", a: "Go to Menu Management, click 'Add Item', fill in the details including name, price, and nutritional information, then save." },
      { q: "How do I mark an item as unavailable?", a: "In Menu Management, find the item and toggle the availability switch to turn it off. Customers won't be able to order it." },
      { q: "Can I edit macro information later?", a: "Yes, you can edit any menu item at any time. Click the edit icon on the item card to update nutritional values." },
    ]
  },
  {
    category: "Orders",
    questions: [
      { q: "How do I accept an order?", a: "When a new order comes in, review the details and click 'Accept'. You'll need to set an estimated delivery time (ETA)." },
      { q: "Can I change the ETA after accepting?", a: "Currently, ETA is set when accepting the order. Contact the customer directly if there are delays." },
      { q: "What happens if I reject an order?", a: "The customer will be notified and can order from another restaurant. Only reject if you cannot fulfill the order." },
    ]
  },
  {
    category: "Payments & Earnings",
    questions: [
      { q: "When do I receive my earnings?", a: "Earnings are processed weekly. You'll receive payments every Monday for the previous week's completed orders." },
      { q: "How is the commission calculated?", a: "A small platform fee is deducted from each order. The remaining amount is your earning." },
    ]
  },
  {
    category: "Reviews & Ratings",
    questions: [
      { q: "How do I respond to reviews?", a: "Go to the Reviews section, find the review you want to respond to, and click 'Reply' to post your response." },
      { q: "Can I remove a negative review?", a: "You cannot remove reviews, but you can flag inappropriate ones for admin review." },
    ]
  },
];

const PartnerHelp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <h1 className="text-xl font-bold">Help Center</h1>
          <Link to="/partner/profile">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Partner Help Center</h2>
          <p className="text-muted-foreground mt-2">Tutorials, guides, and support for restaurant partners</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Guides</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <PlayCircle className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Tutorials</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Policies</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <Settings className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Settings</p>
            </CardContent>
          </Card>
        </div>

        {/* Video Tutorials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5" />
              Video Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tutorials.map((tutorial, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <tutorial.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{tutorial.title}</p>
                    <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {faqs.map((category) => (
              <div key={category.category} className="mb-6 last:mb-0">
                <h3 className="font-semibold text-primary mb-3">{category.category}</h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${category.category}-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Partner Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Our dedicated partner support team is here to help</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                <span>Live Chat</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Phone className="h-6 w-6 text-primary" />
                <span>+92 21 111 321 23</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Mail className="h-6 w-6 text-primary" />
                <span>partner@calofit.pk</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PartnerHelp;
