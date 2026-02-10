import { useNavigate } from "react-router-dom";
import { ChefHat } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import { toast } from "sonner";

const PartnerLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    toast.success("Welcome back, Partner!");
    navigate("/partner/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/20 flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-8">
        <ChefHat className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">Calo.Fit Partner</span>
      </div>
      
      <LoginForm portalType="partner" onSubmit={handleLogin} />
    </div>
  );
};

export default PartnerLogin;
