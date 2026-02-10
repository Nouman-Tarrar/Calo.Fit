import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    toast.success("Welcome, Admin!");
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-muted/20 flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">Calo.Fit Admin</span>
      </div>
      
      <LoginForm portalType="admin" onSubmit={handleLogin} />
    </div>
  );
};

export default AdminLogin;
