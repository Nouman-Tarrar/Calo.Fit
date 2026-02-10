import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Edit2, Trash2, Flame, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DayPlan {
  day: string;
  meals: {
    breakfast: Meal | null;
    lunch: Meal | null;
    dinner: Meal | null;
  };
}

const initialMealPlan: DayPlan[] = [
  {
    day: "Mon",
    meals: {
      breakfast: { name: "Paratha with Eggs", calories: 450, protein: 18, carbs: 42, fat: 24 },
      lunch: { name: "Chicken Biryani", calories: 650, protein: 35, carbs: 75, fat: 22 },
      dinner: { name: "Grilled Chicken Salad", calories: 320, protein: 38, carbs: 12, fat: 14 },
    },
  },
  {
    day: "Tue",
    meals: {
      breakfast: { name: "Omelette with Toast", calories: 380, protein: 22, carbs: 28, fat: 20 },
      lunch: { name: "Seekh Kebab Platter", calories: 520, protein: 42, carbs: 18, fat: 32 },
      dinner: { name: "Daal Chawal", calories: 480, protein: 18, carbs: 72, fat: 12 },
    },
  },
  {
    day: "Wed",
    meals: {
      breakfast: { name: "Halwa Puri", calories: 620, protein: 12, carbs: 68, fat: 35 },
      lunch: null,
      dinner: { name: "Chicken Karahi", calories: 550, protein: 40, carbs: 15, fat: 38 },
    },
  },
  {
    day: "Thu",
    meals: {
      breakfast: { name: "Cereal with Milk", calories: 280, protein: 10, carbs: 48, fat: 6 },
      lunch: { name: "Vegetable Biryani", calories: 480, protein: 12, carbs: 82, fat: 14 },
      dinner: null,
    },
  },
  {
    day: "Fri",
    meals: {
      breakfast: null,
      lunch: { name: "Fish Fry with Rice", calories: 580, protein: 38, carbs: 52, fat: 24 },
      dinner: { name: "Mutton Karahi", calories: 620, protein: 45, carbs: 12, fat: 42 },
    },
  },
  {
    day: "Sat",
    meals: {
      breakfast: { name: "Nihari with Naan", calories: 720, protein: 35, carbs: 58, fat: 40 },
      lunch: { name: "Chapli Kebab", calories: 380, protein: 28, carbs: 12, fat: 24 },
      dinner: { name: "Grilled Fish", calories: 320, protein: 42, carbs: 8, fat: 14 },
    },
  },
  {
    day: "Sun",
    meals: {
      breakfast: { name: "Eggs Benedict", calories: 420, protein: 24, carbs: 32, fat: 26 },
      lunch: { name: "Chicken Handi", calories: 520, protein: 38, carbs: 18, fat: 34 },
      dinner: null,
    },
  },
];

const userGoals = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
};

const DietaryPlan = () => {
  const [mealPlan, setMealPlan] = useState<DayPlan[]>(initialMealPlan);
  const [selectedDay, setSelectedDay] = useState(0);
  const [mealDialogOpen, setMealDialogOpen] = useState(false);
  const [editingMealType, setEditingMealType] = useState<"breakfast" | "lunch" | "dinner" | null>(null);
  const [mealForm, setMealForm] = useState<Meal>({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  // Set selected day to current day on mount
  useEffect(() => {
    const today = new Date().getDay();
    // Convert Sunday (0) to index 6, Monday (1) to index 0, etc.
    const dayIndex = today === 0 ? 6 : today - 1;
    setSelectedDay(dayIndex);
  }, []);

  const currentDayPlan = mealPlan[selectedDay];
  const dayTotal = Object.values(currentDayPlan.meals).reduce(
    (acc, meal) => {
      if (meal) {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fat += meal.fat;
      }
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const weeklyData = mealPlan.map((day) => {
    const total = Object.values(day.meals).reduce(
      (acc, meal) => {
        if (meal) {
          acc.calories += meal.calories;
          acc.protein += meal.protein;
          acc.carbs += meal.carbs;
          acc.fat += meal.fat;
        }
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    return { day: day.day, ...total };
  });

  const macroData = [
    { name: "Protein", value: dayTotal.protein, color: "hsl(var(--primary))" },
    { name: "Carbs", value: dayTotal.carbs, color: "hsl(var(--chart-2))" },
    { name: "Fat", value: dayTotal.fat, color: "hsl(var(--chart-4))" },
  ];

  const handleOpenMealDialog = (mealType: "breakfast" | "lunch" | "dinner", existingMeal?: Meal | null) => {
    setEditingMealType(mealType);
    if (existingMeal) {
      setMealForm(existingMeal);
    } else {
      setMealForm({ name: "", calories: 0, protein: 0, carbs: 0, fat: 0 });
    }
    setMealDialogOpen(true);
  };

  const handleSaveMeal = () => {
    if (!mealForm.name) {
      toast.error("Please enter a meal name");
      return;
    }
    if (!editingMealType) return;

    const updatedPlan = [...mealPlan];
    updatedPlan[selectedDay] = {
      ...updatedPlan[selectedDay],
      meals: {
        ...updatedPlan[selectedDay].meals,
        [editingMealType]: mealForm,
      },
    };
    setMealPlan(updatedPlan);
    setMealDialogOpen(false);
    toast.success("Meal saved successfully!");
  };

  const handleDeleteMeal = (mealType: "breakfast" | "lunch" | "dinner") => {
    const updatedPlan = [...mealPlan];
    updatedPlan[selectedDay] = {
      ...updatedPlan[selectedDay],
      meals: {
        ...updatedPlan[selectedDay].meals,
        [mealType]: null,
      },
    };
    setMealPlan(updatedPlan);
    toast.success("Meal removed from plan");
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
            <div>
              <h1 className="text-xl font-bold">7-Day Dietary Plan</h1>
              <p className="text-sm text-muted-foreground">Track and plan your meals</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Day Selector */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedDay((prev) => (prev - 1 + 7) % 7)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                {weekDays.map((day, index) => (
                  <Button
                    key={day}
                    variant={selectedDay === index ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedDay(index)}
                    className="w-12"
                  >
                    {day}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedDay((prev) => (prev + 1) % 7)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-destructive" />
                {weekDays[selectedDay]}'s Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Calories</span>
                  <span>{dayTotal.calories} / {userGoals.calories} kcal</span>
                </div>
                <Progress value={(dayTotal.calories / userGoals.calories) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-primary">Protein</span>
                  <span>{dayTotal.protein} / {userGoals.protein}g</span>
                </div>
                <Progress value={(dayTotal.protein / userGoals.protein) * 100} className="h-2 [&>div]:bg-primary" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-chart-2">Carbs</span>
                  <span>{dayTotal.carbs} / {userGoals.carbs}g</span>
                </div>
                <Progress value={(dayTotal.carbs / userGoals.carbs) * 100} className="h-2 [&>div]:bg-chart-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-chart-4">Fat</span>
                  <span>{dayTotal.fat} / {userGoals.fat}g</span>
                </div>
                <Progress value={(dayTotal.fat / userGoals.fat) * 100} className="h-2 [&>div]:bg-chart-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Macro Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meals */}
        <div className="grid md:grid-cols-3 gap-4">
          {(["breakfast", "lunch", "dinner"] as const).map((mealType) => {
            const meal = currentDayPlan.meals[mealType];
            return (
              <Card key={mealType} className={meal ? "" : "border-dashed"}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">{mealType}</CardTitle>
                    {meal && (
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleOpenMealDialog(mealType, meal)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteMeal(mealType)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {meal ? (
                    <div className="space-y-3">
                      <p className="font-medium">{meal.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Flame className="h-4 w-4 text-destructive" />
                        <span>{meal.calories} kcal</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <Badge variant="outline" className="justify-center">
                          {meal.protein}g P
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          {meal.carbs}g C
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          {meal.fat}g F
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="ghost" 
                      className="w-full h-24 border-2 border-dashed"
                      onClick={() => handleOpenMealDialog(mealType)}
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add {mealType}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="protein" name="Protein (g)" fill="hsl(var(--primary))" stackId="a" />
                  <Bar dataKey="carbs" name="Carbs (g)" fill="hsl(var(--chart-2))" stackId="a" />
                  <Bar dataKey="fat" name="Fat (g)" fill="hsl(var(--chart-4))" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit Meal Dialog */}
      <Dialog open={mealDialogOpen} onOpenChange={setMealDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="capitalize">
              {mealForm.name ? "Edit" : "Add"} {editingMealType}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Meal Name</Label>
              <Input
                value={mealForm.name}
                onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                placeholder="e.g., Chicken Biryani"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Calories (kcal)</Label>
                <Input
                  type="number"
                  value={mealForm.calories}
                  onChange={(e) => setMealForm({ ...mealForm, calories: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Protein (g)</Label>
                <Input
                  type="number"
                  value={mealForm.protein}
                  onChange={(e) => setMealForm({ ...mealForm, protein: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Carbs (g)</Label>
                <Input
                  type="number"
                  value={mealForm.carbs}
                  onChange={(e) => setMealForm({ ...mealForm, carbs: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Fat (g)</Label>
                <Input
                  type="number"
                  value={mealForm.fat}
                  onChange={(e) => setMealForm({ ...mealForm, fat: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMealDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveMeal}>
              <Save className="h-4 w-4 mr-2" />
              Save Meal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DietaryPlan;
