import { useNavigate } from "react-router-dom";
import { Utensils } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import { toast } from "sonner";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    toast.success("Welcome back!");
    navigate("/user/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/20 flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-8">
        <Utensils className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">Calo.Fit</span>
      </div>
      
      <LoginForm portalType="user" onSubmit={handleLogin} />
    </div>
  );
};

export default UserLogin;
