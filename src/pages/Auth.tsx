
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginForm, SignupForm } from "@/components/auth/auth-forms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  // Update mode if search params change
  useEffect(() => {
    const newMode = searchParams.get("mode") === "signup" ? "signup" : "login";
    setMode(newMode);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-background/95 to-background p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,69,0.1),transparent_50%)]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {mode === "login" ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "login" 
              ? "Sign in to access your fire training dashboard" 
              : "Join our platform to manage fire safety training"}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl">
          <Tabs value={mode} onValueChange={(value) => setMode(value as "login" | "signup")} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-0">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup" className="mt-0">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8 text-center text-muted-foreground">
          <p>
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button 
                  onClick={() => setMode("signup")}
                  className="text-fire-400 hover:text-fire-300 transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button 
                  onClick={() => setMode("login")}
                  className="text-fire-400 hover:text-fire-300 transition-colors"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
