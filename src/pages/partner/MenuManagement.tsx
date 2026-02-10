import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Plus, Search, Edit, Trash2, Flame, Dumbbell, Wheat, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import PartnerSidebar from "@/components/partner/PartnerSidebar";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  tags: string[];
  allergies: string[];
  prepTime: number;
  available: boolean;
  image: string;
}

const initialMenuItems: MenuItem[] = [
  { id: 1, name: "Chicken Biryani", description: "Aromatic basmati rice with tender chicken", price: 350, calories: 650, protein: 35, carbs: 70, fat: 20, category: "Main Course", tags: ["High Protein"], allergies: ["Gluten"], prepTime: 25, available: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300" },
  { id: 2, name: "Seekh Kebab", description: "Spiced minced meat skewers", price: 280, calories: 320, protein: 28, carbs: 8, fat: 22, category: "Starters", tags: ["High Protein", "Low Carb"], allergies: [], prepTime: 15, available: true, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300" },
  { id: 3, name: "Raita", description: "Yogurt with cucumber and spices", price: 50, calories: 80, protein: 4, carbs: 6, fat: 5, category: "Sides", tags: ["Low Fat"], allergies: ["Dairy"], prepTime: 5, available: true, image: "" },
  { id: 4, name: "Mango Lassi", description: "Sweet mango yogurt drink", price: 120, calories: 220, protein: 6, carbs: 40, fat: 4, category: "Drinks", tags: ["Balanced"], allergies: ["Dairy"], prepTime: 5, available: false, image: "" },
];

const categories = ["Starters", "Main Course", "Sides", "Drinks", "Desserts"];
const tagOptions = ["High Protein", "Low Carb", "Low Fat", "Balanced"];
const allergyOptions = ["Gluten", "Dairy", "Nuts", "Eggs", "Soy", "Shellfish", "Fish"];

const MenuManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    category: "",
    tags: [],
    allergies: [],
    prepTime: 15,
    available: true,
    image: "",
  });

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        description: "",
        price: 0,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        category: "",
        tags: [],
        allergies: [],
        prepTime: 15,
        available: true,
        image: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = () => {
    if (editingItem) {
      setMenuItems(items =>
        items.map(item => item.id === editingItem.id ? { ...item, ...formData } as MenuItem : item)
      );
      toast({ title: "Item Updated", description: `${formData.name} has been updated.` });
    } else {
      const newItem: MenuItem = {
        ...formData as MenuItem,
        id: Date.now(),
      };
      setMenuItems(items => [...items, newItem]);
      toast({ title: "Item Added", description: `${formData.name} has been added to your menu.` });
    }
    setIsDialogOpen(false);
  };

  const handleDeleteItem = (id: number) => {
    setMenuItems(items => items.filter(item => item.id !== id));
    toast({ title: "Item Deleted", description: "Menu item has been removed." });
  };

  const handleToggleAvailability = (id: number) => {
    setMenuItems(items =>
      items.map(item => item.id === id ? { ...item, available: !item.available } : item)
    );
  };

  const toggleTag = (tag: string) => {
    const currentTags = formData.tags || [];
    if (currentTags.includes(tag)) {
      setFormData({ ...formData, tags: currentTags.filter(t => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...currentTags, tag] });
    }
  };

  const toggleAllergy = (allergy: string) => {
    const currentAllergies = formData.allergies || [];
    if (currentAllergies.includes(allergy)) {
      setFormData({ ...formData, allergies: currentAllergies.filter(a => a !== allergy) });
    } else {
      setFormData({ ...formData, allergies: [...currentAllergies, allergy] });
    }
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
          <h1 className="text-xl font-bold">Menu Management</h1>
          <Link to="/partner/profile">
            <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className={!item.available ? "opacity-60" : ""}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center text-3xl overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      "🍽️"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <p className="font-semibold text-primary whitespace-nowrap">Rs. {item.price}</p>
                    </div>
                  </div>
                </div>

                {/* Macros */}
                <div className="grid grid-cols-4 gap-2 mt-4 text-center text-xs">
                  <div className="p-2 bg-accent rounded">
                    <Flame className="h-3 w-3 mx-auto mb-1 text-orange-500" />
                    <p className="font-medium">{item.calories}</p>
                    <p className="text-muted-foreground">kcal</p>
                  </div>
                  <div className="p-2 bg-accent rounded">
                    <Dumbbell className="h-3 w-3 mx-auto mb-1 text-red-500" />
                    <p className="font-medium">{item.protein}g</p>
                    <p className="text-muted-foreground">protein</p>
                  </div>
                  <div className="p-2 bg-accent rounded">
                    <Wheat className="h-3 w-3 mx-auto mb-1 text-amber-500" />
                    <p className="font-medium">{item.carbs}g</p>
                    <p className="text-muted-foreground">carbs</p>
                  </div>
                  <div className="p-2 bg-accent rounded">
                    <span className="text-xs">🫒</span>
                    <p className="font-medium">{item.fat}g</p>
                    <p className="text-muted-foreground">fat</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>

                {/* Allergies */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.allergies.length > 0 ? (
                    item.allergies.map((allergy) => (
                      <Badge key={allergy} variant="outline" className="text-xs text-orange-600 border-orange-300">
                        ⚠️ {allergy}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="text-xs text-muted-foreground">No Allergies</Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.available}
                      onCheckedChange={() => handleToggleAvailability(item.id)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Item Image</Label>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-24 h-24 rounded-lg bg-accent flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-muted-foreground/30 hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="space-y-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      {formData.image ? "Change Image" : "Upload Image"}
                    </Button>
                    {formData.image && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive"
                        onClick={() => setFormData({ ...formData, image: "" })}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (Rs.)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Prep Time (mins)</Label>
                  <Input
                    type="number"
                    value={formData.prepTime}
                    onChange={(e) => setFormData({ ...formData, prepTime: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Calories (kcal)</Label>
                  <Input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Protein (g)</Label>
                  <Input
                    type="number"
                    value={formData.protein}
                    onChange={(e) => setFormData({ ...formData, protein: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Carbs (g)</Label>
                  <Input
                    type="number"
                    value={formData.carbs}
                    onChange={(e) => setFormData({ ...formData, carbs: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fat (g)</Label>
                  <Input
                    type="number"
                    value={formData.fat}
                    onChange={(e) => setFormData({ ...formData, fat: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Health Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <Badge
                      key={tag}
                      variant={formData.tags?.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Allergy Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {allergyOptions.map((allergy) => (
                    <Badge
                      key={allergy}
                      variant={formData.allergies?.includes(allergy) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleAllergy(allergy)}
                    >
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
                <Label>Available for ordering</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveItem}>
                {editingItem ? "Save Changes" : "Add Item"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default MenuManagement;
