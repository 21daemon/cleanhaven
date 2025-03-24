
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Mail, User, Key } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminAccountCreation: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in as admin
  React.useEffect(() => {
    if (!isAdmin) {
      console.log("User is not admin, redirecting to admin login");
      navigate("/auth", { state: { redirectToAdmin: true } });
    }
  }, [isAdmin, navigate]);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password || !name) {
      setError("Please fill in all required fields.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 1. Sign up the user with Supabase auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      
      if (signUpError) throw signUpError;
      
      if (!authData.user) {
        throw new Error("Failed to create user account");
      }
      
      // 2. Set user as admin in the profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('id', authData.user.id);
      
      if (updateError) throw updateError;
      
      // Success!
      toast({
        title: "Admin account created",
        description: `New admin account for ${name} (${email}) has been created successfully.`,
      });
      
      // Reset form
      setEmail('');
      setName('');
      setPassword('');
      
    } catch (error: any) {
      console.error("Admin creation error:", error);
      setError(error.message || "Failed to create admin account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Create Admin Account</h2>
        <p className="text-muted-foreground mt-2">
          Add a new administrator to the system
        </p>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
          <p>New admin users will have full access to the admin dashboard and functionality.</p>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleCreateAdmin} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-name">Full Name</Label>
            <InputWithIcon
              id="admin-name"
              icon={<User className="h-4 w-4" />}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <InputWithIcon
              id="admin-email"
              type="email"
              icon={<Mail className="h-4 w-4" />}
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <InputWithIcon
              id="admin-password"
              type="password"
              icon={<Key className="h-4 w-4" />}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 6 characters long.
            </p>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full hover-lift"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Admin Account"}
        </Button>
      </form>
    </div>
  );
};

export default AdminAccountCreation;
