import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Phone, Building, CreditCard, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PartnerSignupForm = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  
  // Owner info
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [cnicNumber, setCnicNumber] = useState("");
  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  
  // Business info
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  
  // Account security
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
    const file = e.target.files?.[0];
    if (file) {
      if (side === "front") setCnicFront(file);
      else setCnicBack(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle form submission
    console.log("Partner signup submitted");
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <Card className="w-full max-w-lg shadow-xl border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-serif">Partner Registration</CardTitle>
        <CardDescription>
          Join NutriOrder as a Restaurant, Café, or Home Chef
        </CardDescription>
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
          <span>Owner Info</span>
          <span>Business Info</span>
          <span>Security</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Owner Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="ownerName"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerPhone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="ownerPhone"
                    type="tel"
                    placeholder="+92 3XX XXXXXXX"
                    className="pl-10"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cnic"
                    placeholder="XXXXX-XXXXXXX-X"
                    className="pl-10"
                    value={cnicNumber}
                    onChange={(e) => setCnicNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CNIC Front</Label>
                  <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">
                      {cnicFront ? cnicFront.name : "Upload Front"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "front")}
                    />
                  </label>
                </div>
                <div className="space-y-2">
                  <Label>CNIC Back</Label>
                  <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">
                      {cnicBack ? cnicBack.name : "Upload Back"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "back")}
                    />
                  </label>
                </div>
              </div>

              <Button type="button" onClick={nextStep} className="w-full">
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Business Information */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="businessName"
                    placeholder="Enter business name"
                    className="pl-10"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessEmail">Business Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="businessEmail"
                    type="email"
                    placeholder="business@example.com"
                    className="pl-10"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessPhone">Business Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="businessPhone"
                    type="tel"
                    placeholder="+92 XXX XXXXXXX"
                    className="pl-10"
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="cafe">Café</SelectItem>
                    <SelectItem value="home-chef">Home Chef</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  Back
                </Button>
                <Button type="button" onClick={nextStep} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Account Security */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Application
                </Button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/partner/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default PartnerSignupForm;
