import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, MapPin, Plus, Edit2, Trash2, Target, Bell, Settings, Save, X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Address {
  id: number;
  label: string;
  address: string;
  isDefault: boolean;
}

const allergyOptions = ["Gluten", "Dairy", "Nuts", "Shellfish", "Eggs", "Soy"];

const UserProfile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ahmed Khan",
    phone: "+92 300 1234567",
    email: "ahmed.khan@gmail.com",
  });
  const [editProfileData, setEditProfileData] = useState(profileData);

  const [calorieGoal, setCalorieGoal] = useState("2000");
  const [proteinGoal, setProteinGoal] = useState("150");
  const [carbsGoal, setCarbsGoal] = useState("200");
  const [fatGoal, setFatGoal] = useState("65");
  const [allergies, setAllergies] = useState<string[]>(["Nuts"]);

  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, label: "Home", address: "House #123, Street 5, DHA Phase 6, Karachi", isDefault: true },
    { id: 2, label: "Office", address: "Floor 12, Dolmen Towers, Clifton, Karachi", isDefault: false },
  ]);

  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState({ label: "", address: "" });

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const toggleAllergy = (allergy: string) => {
    setAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]
    );
  };

  const handleSaveProfile = () => {
    setProfileData(editProfileData);
    setIsEditingProfile(false);
    toast.success("Profile updated successfully!");
  };

  const handleSaveGoals = () => {
    toast.success("New Goals Saved!");
  };

  const handleOpenAddressDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({ label: address.label, address: address.address });
    } else {
      setEditingAddress(null);
      setAddressForm({ label: "", address: "" });
    }
    setAddressDialogOpen(true);
  };

  const handleSaveAddress = () => {
    if (!addressForm.label || !addressForm.address) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editingAddress) {
      setAddresses(addresses.map(a => 
        a.id === editingAddress.id 
          ? { ...a, label: addressForm.label, address: addressForm.address }
          : a
      ));
      toast.success("Address updated successfully!");
    } else {
      const newAddress: Address = {
        id: Date.now(),
        label: addressForm.label,
        address: addressForm.address,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
      toast.success("Address added successfully!");
    }
    setAddressDialogOpen(false);
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast.success("Address deleted successfully!");
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    toast.success("Password changed successfully!");
    setPasswordDialogOpen(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/user/home">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            {isEditingProfile ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">AK</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={editProfileData.name}
                        onChange={(e) => setEditProfileData({ ...editProfileData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={editProfileData.phone}
                        onChange={(e) => setEditProfileData({ ...editProfileData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={editProfileData.email}
                        onChange={(e) => setEditProfileData({ ...editProfileData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{profileData.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-sm text-muted-foreground">Member since Dec 2024</p>
                  <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  setEditProfileData(profileData);
                  setIsEditingProfile(true);
                }}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="personal">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="health">Health Goals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 mt-4">
            {/* Addresses */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Saved Addresses</CardTitle>
                  <Button size="sm" variant="outline" onClick={() => handleOpenAddressDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {addresses.map((addr) => (
                  <div key={addr.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{addr.label}</p>
                        {addr.isDefault && (
                          <Badge variant="secondary" className="text-xs">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{addr.address}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenAddressDialog(addr)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteAddress(addr.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {addresses.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No addresses saved yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-4 mt-4">
            {/* Nutrition Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Daily Nutrition Goals
                </CardTitle>
                <CardDescription>Set your daily macro targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Calories (kcal)</Label>
                    <Input
                      type="number"
                      value={calorieGoal}
                      onChange={(e) => setCalorieGoal(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Protein (g)</Label>
                    <Input
                      type="number"
                      value={proteinGoal}
                      onChange={(e) => setProteinGoal(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Carbs (g)</Label>
                    <Input
                      type="number"
                      value={carbsGoal}
                      onChange={(e) => setCarbsGoal(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fat (g)</Label>
                    <Input
                      type="number"
                      value={fatGoal}
                      onChange={(e) => setFatGoal(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="w-full" onClick={handleSaveGoals}>Save Goals</Button>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dietary Preferences & Allergies</CardTitle>
                <CardDescription>We'll highlight dishes that match your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allergyOptions.map((allergy) => (
                    <Badge
                      key={allergy}
                      variant={allergies.includes(allergy) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleAllergy(allergy)}
                    >
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about order status</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotions</p>
                    <p className="text-sm text-muted-foreground">Receive offers and discounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Nutrition Reminder</p>
                    <p className="text-sm text-muted-foreground">Get reminders to log your meals</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => setPasswordDialogOpen(true)}>
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Address Dialog */}
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Label (e.g., Home, Office)</Label>
              <Input
                value={addressForm.label}
                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                placeholder="Home"
              />
            </div>
            <div className="space-y-2">
              <Label>Full Address</Label>
              <Input
                value={addressForm.address}
                onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                placeholder="House #123, Street 5, DHA Phase 6, Karachi"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddressDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAddress}>
              {editingAddress ? "Update" : "Add"} Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleChangePassword}>Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
