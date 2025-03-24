
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';
import AdminLogin from '@/components/AdminLogin';
import PageTransition from '@/components/transitions/PageTransition';
import { Shield, Calendar, User, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from 'react-router-dom';

const Auth: React.FC = () => {
  const location = useLocation();
  const redirectToAdmin = location.state?.redirectToAdmin;
  const [authMode, setAuthMode] = useState<"user" | "admin">(redirectToAdmin ? "admin" : "user");
  
  // Set authMode to admin if we were redirected from the admin page
  useEffect(() => {
    if (redirectToAdmin) {
      setAuthMode("admin");
    }
  }, [redirectToAdmin]);
  
  const benefits = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Easy Booking",
      description: "Save your details for faster checkout and manage your appointments."
    },
    {
      icon: <User className="h-5 w-5" />,
      title: "Personalized Experience",
      description: "Get service recommendations based on your vehicle's history."
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Exclusive Offers",
      description: "Access member-only discounts and early booking privileges."
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Service History",
      description: "Track your complete service history and maintenance records."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <PageTransition>
        {/* Header */}
        <section className="pt-24 pb-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide inline-block mb-4 animate-fade-in">
                Account
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
                {authMode === "user" ? "Join the CleanHaven Community" : "Admin Access"}
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up animation-delay-100">
                {authMode === "user" 
                  ? "Create an account or log in to access exclusive benefits, manage your bookings, and more."
                  : "Secure login for CleanHaven administrators. Access dashboard, bookings and feedback."}
              </p>
              
              <div className="mt-8">
                <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "user" | "admin")} className="inline-flex mx-auto">
                  <TabsList>
                    <TabsTrigger value="user">Customer</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        
        {/* Auth Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  {authMode === "user" ? (
                    <>
                      <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 animate-slide-up">
                          Member Benefits
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {benefits.map((benefit, index) => (
                            <div 
                              key={benefit.title}
                              className={`p-6 border rounded-xl bg-white hover-lift animate-slide-up animation-delay-${index * 100}`}
                            >
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                {benefit.icon}
                              </div>
                              <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                              <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 animate-slide-up animation-delay-500">
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-primary" />
                          Privacy Commitment
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          We value your privacy and are committed to protecting your personal information. 
                          Your data is securely stored and never shared with third parties without your consent.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
                      <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <Shield className="h-6 w-6 mr-2 text-blue-600" />
                        Admin Access
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        The admin dashboard provides access to:
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                          <span>Booking management and scheduling</span>
                        </li>
                        <li className="flex items-start">
                          <Star className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                          <span>Customer feedback and ratings</span>
                        </li>
                        <li className="flex items-start">
                          <User className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                          <span>User account management</span>
                        </li>
                      </ul>
                      <p className="text-sm text-red-600 font-medium">
                        This area is restricted to authorized personnel only.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="order-1 lg:order-2">
                  <div className="bg-white p-8 rounded-xl border animate-blur-in">
                    {authMode === "user" ? <AuthForm /> : <AdminLogin />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
      
      <Footer />
    </div>
  );
};

export default Auth;
