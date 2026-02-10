import { useNavigate } from "react-router-dom";
import { Utensils } from "lucide-react";
import UserSignupForm from "@/components/auth/UserSignupForm";
import { toast } from "sonner";

const UserSignup = () => {
  const navigate = useNavigate();

  const handleSignup = (data: { email: string; password: string; username: string; phone: string }) => {
    toast.success("Account created successfully!");
    navigate("/user/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/20 flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-8">
        <Utensils className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">Calo.Fit</span>
      </div>
      
      <UserSignupForm onSubmit={handleSignup} />
    </div>
  );
};

export default UserSignup;
