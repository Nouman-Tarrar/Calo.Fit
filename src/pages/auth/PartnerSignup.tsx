import { ChefHat } from "lucide-react";
import PartnerSignupForm from "@/components/auth/PartnerSignupForm";

const PartnerSignup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/20 flex flex-col items-center justify-center p-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <ChefHat className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">Calo.Fit Partner</span>
      </div>
      
      <PartnerSignupForm />
    </div>
  );
};

export default PartnerSignup;
