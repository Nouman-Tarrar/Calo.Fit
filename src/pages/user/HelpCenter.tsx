import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Search, ChevronDown, MessageCircle, Phone, Mail, FileText, ShoppingBag, CreditCard, MapPin, Clock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserSidebar from "@/components/user/UserSidebar";

const categories = [
  { icon: ShoppingBag, label: "Orders", count: 8 },
  { icon: CreditCard, label: "Payments", count: 5 },
  { icon: MapPin, label: "Delivery", count: 6 },
  { icon: Clock, label: "Tracking", count: 4 },
];

const faqs = [
  {
    category: "Orders",
    questions: [
      { q: "How do I place an order?", a: "Browse restaurants, select items, add to cart, and proceed to checkout. Choose your delivery address and payment method to complete." },
      { q: "Can I order from multiple restaurants?", a: "No, each order can only contain items from one restaurant. Complete your current order before ordering from another restaurant." },
      { q: "How do I cancel my order?", a: "You can cancel within 5 minutes of placing the order. Go to your order details and tap 'Cancel Order'." },
      { q: "What if an item is unavailable?", a: "The restaurant will contact you to offer a substitute or refund for unavailable items." },
    ]
  },
  {
    category: "Payments",
    questions: [
      { q: "What payment methods are accepted?", a: "We accept Cash on Delivery (COD) and major credit/debit cards." },
      { q: "Is my payment information secure?", a: "Yes, all card payments are processed through secure, encrypted channels." },
      { q: "How do refunds work?", a: "Refunds are processed within 5-7 business days to your original payment method." },
    ]
  },
  {
    category: "Delivery",
    questions: [
      { q: "What are the delivery hours?", a: "Delivery hours vary by restaurant. Most restaurants deliver from 10 AM to 11 PM." },
      { q: "How is delivery fee calculated?", a: "Delivery fee depends on distance and restaurant. The fee is shown before checkout." },
      { q: "Can I schedule a delivery?", a: "Currently, we only support immediate delivery. Scheduled delivery is coming soon!" },
    ]
  },
  {
    category: "Account & Profile",
    questions: [
      { q: "How do I update my profile?", a: "Go to Profile from the menu or navbar to update your personal information." },
      { q: "How do I set my dietary goals?", a: "In your Profile, scroll to Health Settings to set your calorie and macro targets." },
      { q: "Can I save multiple addresses?", a: "Yes, you can save multiple delivery addresses in your profile." },
    ]
  },
];

const HelpCenter = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <UserSidebar onClose={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold">Help Center</h1>
          <Link to="/user/profile">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">How can we help you?</h2>
          <p className="text-muted-foreground mt-2">Find answers to common questions or contact support</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Card key={cat.label} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <cat.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="font-medium">{cat.label}</p>
                <p className="text-sm text-muted-foreground">{cat.count} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFaqs.map((category) => (
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
            <CardTitle>Still need help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Our support team is here to assist you</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                <span>Live Chat</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Phone className="h-6 w-6 text-primary" />
                <span>Call Support</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Mail className="h-6 w-6 text-primary" />
                <span>Email Us</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HelpCenter;
