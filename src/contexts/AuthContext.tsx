
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  signInAsAdmin: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();

  // Debug function to manually check admin status
  const forceCheckAdminStatus = async () => {
    if (user) {
      console.log("Force checking admin status for user:", user.id);
      const adminStatus = await checkIfAdmin(user.id);
      console.log("Admin status checked, result:", adminStatus);
      setIsAdmin(adminStatus);
    }
  };

  // Check if user is admin - FIXED
  const checkIfAdmin = async (userId: string) => {
    try {
      console.log("Checking admin status for user ID:", userId);
      
      // Query the profiles table for the is_admin field
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return false;
      }

      // Check if data exists and has is_admin property
      if (!data) {
        console.error('No profile data found for user:', userId);
        setIsAdmin(false);
        return false;
      }

      // Explicitly convert to boolean to avoid truthy/falsy issues
      const isUserAdmin = data.is_admin === true;
      
      console.log('Admin status check result for', userId, ':', isUserAdmin, 'Raw value:', data.is_admin);
      
      setIsAdmin(isUserAdmin);
      return isUserAdmin;
    } catch (error) {
      console.error('Exception checking admin status:', error);
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await checkIfAdmin(session.user.id);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkIfAdmin(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back to CleanHaven!",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInAsAdmin = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Attempting admin login for:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Admin login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      // Verify that this user is actually an admin
      console.log("Login successful, checking admin status for user:", data.user.id);
      const isUserAdmin = await checkIfAdmin(data.user.id);
      
      if (!isUserAdmin) {
        // If not admin, sign them out and show error
        console.error("User is not an admin:", data.user.id);
        await supabase.auth.signOut();
        toast({
          title: "Access denied",
          description: "This account does not have admin privileges.",
          variant: "destructive",
        });
        throw new Error("Access denied: Not an admin account");
      }
      
      console.log("Admin login successful for user:", data.user.id);
      toast({
        title: "Admin login successful",
        description: "Welcome to the admin dashboard!",
      });
    } catch (error) {
      console.error("Admin sign in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Registration successful",
        description: "Welcome to CleanHaven!",
      });
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "There was a problem signing out.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      signIn, 
      signUp, 
      signOut, 
      loading, 
      isAdmin, 
      signInAsAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
