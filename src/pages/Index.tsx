import { Link } from "react-router-dom";
import {
  Users,
  ChefHat,
  Shield,
  ArrowRight,
  Utensils,
  Activity,
  TrendingUp,
} from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";
import userPortalImage from "@/assets/user-portal.jpg";
import restaurantPortalImage from "@/assets/restaurant-portal.jpg";
import adminPortalImage from "@/assets/admin-portal.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Mock auth state - replace with real auth check when backend is connected
  const isLoggedIn = false;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Utensils className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-primary-foreground">
              Calo.Fit
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 font-serif">
            Smart Food Ordering with{" "}
            <span className="text-primary">Calorie Tracking</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Order your favorite Pakistani cuisine while tracking calories and
            macros. Plan your 7-day meals, achieve your fitness goals, and enjoy
            delicious food.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={isLoggedIn ? "/user/home" : "/user/login"}>
              <Button size="lg" className="gap-2">
                Start Ordering <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/partner/login">
              <Button
                variant="outline"
                size="lg"
                className="bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
              >
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-serif">
            Why Choose <span className="text-primary">Calo.Fit</span>?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We're revolutionizing how Pakistan orders food—combining authentic
            flavors with smart nutrition tracking.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Authentic Pakistani Cuisine</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  From Karachi's biryani to Lahore's nihari, order from the best
                  local restaurants and home chefs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Macro & Calorie Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every dish shows estimated calories, protein, carbs, and fats.
                  Stay on track with your fitness goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>7-Day Meal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Plan your breakfast, lunch, and dinner for the week. See your
                  macro breakdown and weekly totals.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portal Selection Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-serif">
            Choose Your Portal
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Whether you're ordering food, running a restaurant, or managing the
            platform—we've got you covered.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* User Portal Card */}
            <Card className="group overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col h-full">
              <div className="h-48 overflow-hidden flex-shrink-0">
                <img
                  src={userPortalImage}
                  alt="User ordering food on mobile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="flex-shrink-0 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Customer Portal</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow pt-0">
                <CardDescription className="text-base flex-grow">
                  Browse restaurants, order your favorite meals, track calories,
                  and plan your weekly diet.
                </CardDescription>
                <div className="mt-6">
                  <Link to="/user/login" className="block">
                    <Button className="w-full gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Restaurant Portal Card */}
            <Card className="group overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col h-full">
              <div className="h-48 overflow-hidden flex-shrink-0">
                <img
                  src={restaurantPortalImage}
                  alt="Chef preparing food in kitchen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="flex-shrink-0 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ChefHat className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Partner Portal</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow pt-0">
                <CardDescription className="text-base flex-grow">
                  Manage your restaurant, update menus with nutrition info,
                  handle orders, and grow your business.
                </CardDescription>
                <div className="mt-6">
                  <Link to="/partner/login" className="block">
                    <Button className="w-full gap-2">
                      Partner With Us <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Admin Portal Card */}
            <Card className="group overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col h-full">
              <div className="h-48 overflow-hidden flex-shrink-0">
                <img
                  src={adminPortalImage}
                  alt="Admin dashboard on screen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="flex-shrink-0 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Admin Portal</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow pt-0">
                <CardDescription className="text-base flex-grow">
                  Oversee platform operations, manage users and restaurants,
                  moderate content, and view analytics.
                </CardDescription>
                <div className="mt-6">
                  <Link to="/admin/login" className="block">
                    <Button className="w-full gap-2">
                      Admin Login <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Utensils className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Calo.Fit</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Calo.Fit Pakistan. Eat Smart, Live Healthy.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/help" className="hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
