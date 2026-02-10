import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth pages
import UserLogin from "./pages/auth/UserLogin";
import UserSignup from "./pages/auth/UserSignup";
import PartnerLogin from "./pages/auth/PartnerLogin";
import PartnerSignup from "./pages/auth/PartnerSignup";
import AdminLogin from "./pages/auth/AdminLogin";

// User pages
import UserHome from "./pages/user/UserHome";
import RestaurantMenu from "./pages/user/RestaurantMenu";
import Cart from "./pages/user/Cart";
import DietaryPlan from "./pages/user/DietaryPlan";
import Chatbot from "./pages/user/Chatbot";
import UserProfile from "./pages/user/UserProfile";
import Delivery from "./pages/user/Delivery";
import Pickup from "./pages/user/Pickup";
import Shops from "./pages/user/Shops";
import OrderConfirmation from "./pages/user/OrderConfirmation";
import HelpCenter from "./pages/user/HelpCenter";

// Partner pages
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerProfile from "./pages/partner/PartnerProfile";
import MenuManagement from "./pages/partner/MenuManagement";
import PartnerOrders from "./pages/partner/PartnerOrders";
import PartnerReviews from "./pages/partner/PartnerReviews";
import PartnerHelp from "./pages/partner/PartnerHelp";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminModeration from "./pages/admin/AdminModeration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/partner/signup" element={<PartnerSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* User Routes */}
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/restaurant/:id" element={<RestaurantMenu />} />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/user/dietary-plan" element={<DietaryPlan />} />
          <Route path="/user/chatbot" element={<Chatbot />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/delivery" element={<Delivery />} />
          <Route path="/user/pickup" element={<Pickup />} />
          <Route path="/user/restaurants" element={<Shops />} />
          <Route path="/user/order/:orderId" element={<OrderConfirmation />} />
          <Route path="/user/help" element={<HelpCenter />} />
          
          {/* Partner Routes */}
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          <Route path="/partner/profile" element={<PartnerProfile />} />
          <Route path="/partner/menu" element={<MenuManagement />} />
          <Route path="/partner/orders" element={<PartnerOrders />} />
          <Route path="/partner/reviews" element={<PartnerReviews />} />
          <Route path="/partner/help" element={<PartnerHelp />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="moderation" element={<AdminModeration />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
