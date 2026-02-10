import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Send, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserSidebar from "@/components/user/UserSidebar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: MealSuggestion[];
}

interface MealSuggestion {
  name: string;
  restaurant: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  price: number;
}

const Chatbot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your NutriOrder AI assistant. I can help you find meals that match your fitness goals. What are you looking for today? You can tell me about your goals like weight loss, muscle gain, or maintaining a balanced diet.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI response - in production, this would call your AI backend
  const generateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("weight loss") || lowerMessage.includes("lose weight") || lowerMessage.includes("fat loss")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Great choice! For weight loss, I recommend meals that are high in protein and fiber, with controlled calories. Here are some excellent options:",
        suggestions: [
          {
            name: "Grilled Chicken Salad",
            restaurant: "Healthy Bites",
            calories: 320,
            protein: 35,
            carbs: 15,
            fat: 12,
            tags: ["High Protein", "Low Carb"],
            price: 850,
          },
          {
            name: "Steamed Fish with Vegetables",
            restaurant: "Fresh Kitchen",
            calories: 280,
            protein: 32,
            carbs: 12,
            fat: 8,
            tags: ["Low Fat", "High Protein"],
            price: 950,
          },
          {
            name: "Quinoa Buddha Bowl",
            restaurant: "Green Leaf Café",
            calories: 380,
            protein: 18,
            carbs: 45,
            fat: 14,
            tags: ["Balanced", "Vegan"],
            price: 750,
          },
        ],
      };
    } else if (lowerMessage.includes("muscle") || lowerMessage.includes("bulk") || lowerMessage.includes("gain")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "For muscle gain, you need high-protein meals with adequate carbs for energy. Here are my top picks:",
        suggestions: [
          {
            name: "Double Chicken Breast Platter",
            restaurant: "Protein House",
            calories: 650,
            protein: 55,
            carbs: 40,
            fat: 18,
            tags: ["High Protein"],
            price: 1200,
          },
          {
            name: "Beef Steak with Rice",
            restaurant: "Grill Masters",
            calories: 720,
            protein: 48,
            carbs: 55,
            fat: 25,
            tags: ["High Protein", "Balanced"],
            price: 1450,
          },
          {
            name: "Egg White Omelette with Chicken",
            restaurant: "Healthy Bites",
            calories: 420,
            protein: 42,
            carbs: 8,
            fat: 22,
            tags: ["High Protein", "Low Carb"],
            price: 680,
          },
        ],
      };
    } else if (lowerMessage.includes("balanced") || lowerMessage.includes("maintain") || lowerMessage.includes("healthy")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "For a balanced diet, here are some well-rounded meal options:",
        suggestions: [
          {
            name: "Mediterranean Grilled Chicken",
            restaurant: "Fresh Kitchen",
            calories: 520,
            protein: 35,
            carbs: 42,
            fat: 18,
            tags: ["Balanced"],
            price: 980,
          },
          {
            name: "Salmon with Quinoa",
            restaurant: "Ocean Delights",
            calories: 580,
            protein: 38,
            carbs: 35,
            fat: 24,
            tags: ["Balanced", "High Protein"],
            price: 1350,
          },
          {
            name: "Chicken Tikka with Brown Rice",
            restaurant: "Spice Garden",
            calories: 550,
            protein: 32,
            carbs: 48,
            fat: 16,
            tags: ["Balanced"],
            price: 890,
          },
        ],
      };
    } else if (lowerMessage.includes("low carb") || lowerMessage.includes("keto")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "For a low-carb or keto diet, here are some great options:",
        suggestions: [
          {
            name: "Keto Chicken Wings",
            restaurant: "Grill Masters",
            calories: 450,
            protein: 38,
            carbs: 5,
            fat: 32,
            tags: ["Low Carb", "High Protein"],
            price: 920,
          },
          {
            name: "Cauliflower Rice Bowl",
            restaurant: "Green Leaf Café",
            calories: 320,
            protein: 25,
            carbs: 12,
            fat: 18,
            tags: ["Low Carb", "Balanced"],
            price: 780,
          },
          {
            name: "Grilled Fish with Avocado",
            restaurant: "Ocean Delights",
            calories: 380,
            protein: 35,
            carbs: 8,
            fat: 22,
            tags: ["Low Carb", "High Protein"],
            price: 1100,
          },
        ],
      };
    } else {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "I'd love to help you find the perfect meal! Could you tell me more about your fitness goals? For example:\n\n• **Weight loss** - Low calorie, high protein meals\n• **Muscle gain** - High protein, balanced carbs\n• **Balanced diet** - Well-rounded nutrition\n• **Low carb/Keto** - Minimal carbohydrates\n\nOr you can describe what you're craving and I'll find healthy options!",
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <UserSidebar onClose={() => setSidebarOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">AI Meal Advisor</h1>
            </div>
          </div>
          <Link to="/user/profile">
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="container mx-auto max-w-3xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                
                {/* Meal Suggestions */}
                {message.suggestions && (
                  <div className="mt-4 space-y-3">
                    {message.suggestions.map((meal, index) => (
                      <Card key={index} className="bg-card">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{meal.name}</h4>
                              <p className="text-sm text-muted-foreground">{meal.restaurant}</p>
                            </div>
                            <span className="font-bold text-primary">Rs. {meal.price}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {meal.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2 text-center text-sm">
                            <div className="bg-accent/50 rounded p-2">
                              <p className="font-semibold">{meal.calories}</p>
                              <p className="text-xs text-muted-foreground">kcal</p>
                            </div>
                            <div className="bg-accent/50 rounded p-2">
                              <p className="font-semibold">{meal.protein}g</p>
                              <p className="text-xs text-muted-foreground">Protein</p>
                            </div>
                            <div className="bg-accent/50 rounded p-2">
                              <p className="font-semibold">{meal.carbs}g</p>
                              <p className="text-xs text-muted-foreground">Carbs</p>
                            </div>
                            <div className="bg-accent/50 rounded p-2">
                              <p className="font-semibold">{meal.fat}g</p>
                              <p className="text-xs text-muted-foreground">Fat</p>
                            </div>
                          </div>
                          
                          <Button className="w-full mt-3" size="sm">
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-card border-t p-4">
        <div className="container mx-auto max-w-3xl flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about meals for your fitness goals..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
