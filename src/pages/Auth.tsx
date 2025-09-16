import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, Scale, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: auth, 2: profile setup, 3: doctor check
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auth form state
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phone: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    lifestyle: ""
  });

  const [isDoctor, setIsDoctor] = useState<boolean | null>(null);
  const [signupUser, setSignupUser] = useState<any>(null);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authForm.email,
          password: authForm.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Successfully logged in to AyuFit.",
        });

        navigate("/");
      } else {
        if (authForm.password !== authForm.confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match. Please try again.",
            variant: "destructive",
          });
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: authForm.email,
          password: authForm.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        // Store user data for profile creation
        setSignupUser(data.user);

        toast({
          title: "Account Created!",
          description: "Let's complete your profile to get started.",
        });

        // Move to profile setup
        setStep(2);
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use the signup user data or get current user
      let user = signupUser;
      if (!user) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        user = currentUser;
      }
      
      if (!user) throw new Error("No user found");
      console.log(user);
       // 2️⃣ insert into your custom `users` table if not exists
    const { error: insertUserError } = await supabase
      .from("users")
      .insert([{
        user_id: user.id,       // same UUID as auth.users
        email: user.email // carry over email
        
      }])
      .select()
      .single();

    if (insertUserError && insertUserError.code !== "23505") { 
      // 23505 = unique violation (user already exists in table)
      throw insertUserError;
    }

      

    if (insertUserError && insertUserError.code !== "23505") { 
      // 23505 = unique violation (user already exists in table)
      throw insertUserError;
    }

      const { error } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          full_name: profileForm.fullName,
          age: parseInt(profileForm.age),
          gender: profileForm.gender,
          height_cm: parseFloat(profileForm.height),
          weight_kg: parseFloat(profileForm.weight),
          lifestyle: profileForm.lifestyle
        });

      if (error) throw error;

      toast({
        title: "Profile Created!",
        description: "Your profile has been set up successfully.",
      });

      setStep(3);
    } catch (error: any) {
      toast({
        title: "Profile Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };



  const handleDoctorSelection = async (doctorStatus: boolean) => {
    setIsDoctor(doctorStatus);
    setLoading(true);

    try {
      // Use the signup user data or get current user
      let user = signupUser;
      if (!user) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        user = currentUser;
      }
      
      if (!user) throw new Error("No user found");

      if (doctorStatus) {
        // Create doctor record
        const { error } = await supabase
          .from('doctors')
          .insert({
            user_id: user.id,
            specialization: 'Ayurvedic Nutrition',
            contact_number: profileForm.phone || null,
            clinic_address: null
          });

        if (error) throw error;

        toast({
          title: "Doctor Profile Created!",
          description: "You now have access to patient management features.",
        });
      }

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Setup Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Branding */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-ayurveda rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">A</span>
              </div>
              <h1 className="text-3xl font-bold text-gradient">AyuFit</h1>
            </div>
            <p className="text-muted-foreground">Your Personal Ayurvedic Diet & Health Companion</p>
          </div>

          <Card className="shadow-ayurvedic">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin 
                  ? "Sign in to your AyuFit account" 
                  : "Join AyuFit to start your wellness journey"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={authForm.password}
                      onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={authForm.confirmPassword}
                        onChange={(e) => setAuthForm({...authForm, confirmPassword: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-ayurveda hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
                </Button>

                {isLogin && (
                  <div className="text-center">
                    <Button variant="link" className="text-sm text-muted-foreground">
                      Forgot your password?
                    </Button>
                  </div>
                )}

                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm p-0 h-auto font-medium"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="shadow-ayurvedic">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
              <CardDescription className="text-center">
                Help us personalize your AyuFit experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="fullName"
                        placeholder="Your full name"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="phone"
                        placeholder="+91 XXXXXXXXXX"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={profileForm.age}
                        onChange={(e) => setProfileForm({...profileForm, age: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={profileForm.gender} onValueChange={(value) => setProfileForm({...profileForm, gender: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="height"
                        type="number"
                        placeholder="170"
                        value={profileForm.height}
                        onChange={(e) => setProfileForm({...profileForm, height: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="weight"
                        type="number"
                        placeholder="65"
                        value={profileForm.weight}
                        onChange={(e) => setProfileForm({...profileForm, weight: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifestyle">Lifestyle & Health Notes</Label>
                  <Textarea
                    id="lifestyle"
                    placeholder="Tell us about your lifestyle, dietary preferences, health goals, or any health conditions..."
                    value={profileForm.lifestyle}
                    onChange={(e) => setProfileForm({...profileForm, lifestyle: e.target.value})}
                    className="resize-none"
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-ayurveda hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? "Creating Profile..." : "Complete Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-ayurvedic">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">One Last Question</CardTitle>
              <CardDescription className="text-center">
                Are you an Ayurvedic Nutrition Doctor or Healthcare Practitioner?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  This will determine your access to patient management features
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => handleDoctorSelection(true)}
                    className="w-full bg-gradient-ayurveda hover:opacity-90"
                    disabled={loading}
                  >
                    Yes, I'm a Healthcare Practitioner
                  </Button>

                  <Button
                    onClick={() => handleDoctorSelection(false)}
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                  >
                    No, I'm a Patient/Individual User
                  </Button>
                </div>

                {loading && (
                  <p className="text-sm text-muted-foreground">Setting up your account...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default Auth;