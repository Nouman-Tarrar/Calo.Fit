import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Save, Camera, MapPin, Phone, Mail, Clock, Truck, Store, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import PartnerSidebar from "@/components/partner/PartnerSidebar";

const PartnerProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: "Karachi Biryani House",
    description: "Authentic Pakistani cuisine with a focus on healthy, protein-rich meals. Our biryanis are famous for their unique blend of spices and quality ingredients.",
    address: "Block 5, Gulshan-e-Iqbal, Karachi",
    phone: "+92 21 1234567",
    email: "info@karachibiryani.pk",
    deliveryTime: "30-45",
    deliveryEnabled: true,
    pickupEnabled: true,
    image: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result as string });
        toast({
          title: "Image Uploaded",
          description: "Restaurant image has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your restaurant profile has been saved successfully.",
    });
  };

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
          <h1 className="text-xl font-bold">Profile & Settings</h1>
          <Link to="/partner/dashboard">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6 max-w-3xl mx-auto">
        {/* Restaurant Logo/Image */}
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Image</CardTitle>
            <CardDescription>This image will be displayed on your restaurant listing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div 
                className="w-32 h-32 rounded-xl bg-accent flex items-center justify-center text-6xl relative group cursor-pointer overflow-hidden border-2 border-dashed border-muted-foreground/30 hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {profile.image ? (
                  <img src={profile.image} alt="Restaurant" className="w-full h-full object-cover" />
                ) : (
                  "🍛"
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="space-y-2">
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <ImagePlus className="h-4 w-4 mr-2" />
                  {profile.image ? "Change Image" : "Upload New Image"}
                </Button>
                {profile.image && (
                  <Button 
                    variant="ghost" 
                    className="text-destructive"
                    onClick={() => setProfile({ ...profile, image: "" })}
                  >
                    Remove Image
                  </Button>
                )}
                <p className="text-sm text-muted-foreground">Recommended: 500x500px, max 2MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Service Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="deliveryTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Average Delivery Time (minutes)
              </Label>
              <Input
                id="deliveryTime"
                value={profile.deliveryTime}
                onChange={(e) => setProfile({ ...profile, deliveryTime: e.target.value })}
                placeholder="e.g., 30-45"
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Service Modes</h4>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-muted-foreground">Allow customers to order for delivery</p>
                  </div>
                </div>
                <Switch
                  checked={profile.deliveryEnabled}
                  onCheckedChange={(checked) => setProfile({ ...profile, deliveryEnabled: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Pickup</p>
                    <p className="text-sm text-muted-foreground">Allow customers to order for pickup</p>
                  </div>
                </div>
                <Switch
                  checked={profile.pickupEnabled}
                  onCheckedChange={(checked) => setProfile({ ...profile, pickupEnabled: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} size="lg" className="w-full">
          <Save className="h-5 w-5 mr-2" />
          Save Changes
        </Button>
      </main>
    </div>
  );
};

export default PartnerProfile;
