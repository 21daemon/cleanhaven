
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { InputWithIcon } from '@/components/ui/input-with-icon';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signInAsAdmin, isAdmin, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    console.log("AdminLogin - Current auth state:", { isAdmin, userId: user?.id });
    if (isAdmin) {
      console.log("User is admin, redirecting to admin page");
      navigate("/admin");
    }
  }, [isAdmin, navigate, user]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Attempting admin login for:", email);
      await signInAsAdmin(email, password);
      console.log("Admin login successful, redirecting to admin page");
      navigate("/admin");
      
      // Reset form
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Admin login error:", error);
      // Error is already handled in signInAsAdmin function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Admin Access</h2>
        <p className="text-muted-foreground mt-2">
          Sign in with the administrator account
        </p>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
          <p>This panel is restricted to a single administrator account only.</p>
        </div>
      </div>
      
      <form onSubmit={handleAdminLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-admin">Email</Label>
            <InputWithIcon
              id="email-admin"
              type="email"
              icon={<Mail className="h-4 w-4" />}
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password-admin">Password</Label>
            <div className="relative">
              <InputWithIcon
                id="password-admin"
                type={showPassword ? "text" : "password"}
                icon={<Lock className="h-4 w-4" />}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full hover-lift"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login as Admin"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
