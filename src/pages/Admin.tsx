
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/AdminPanel';
import AdminAccountCreation from '@/components/AdminAccountCreation';
import PageTransition from '@/components/transitions/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, UsersRound } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait for auth state to be determined
    if (!loading && !isAdmin) {
      console.log("User is not admin, redirecting to auth page");
      navigate("/auth", { state: { redirectToAdmin: true } });
    }
  }, [isAdmin, loading, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Verifying admin access...</p>
      </div>
    );
  }
  
  // Don't render the admin content if not admin
  if (!isAdmin) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <PageTransition>
        {/* Admin Header */}
        <section className="pt-24 pb-12 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide inline-block mb-4 animate-fade-in">
                Admin Dashboard
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
                CleanHaven Management
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up animation-delay-100">
                Manage services, bookings, and customer feedback.
              </p>
            </div>
          </div>
        </section>
        
        {/* Admin Tabs */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full max-w-3xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dashboard" className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="admin-accounts" className="flex items-center justify-center gap-2">
                  <UsersRound className="h-4 w-4" />
                  Admin Accounts
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>
        
        {/* Admin Content */}
        <section className="py-12 flex-grow">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="dashboard" className="mt-0">
                <AdminPanel />
              </TabsContent>
              <TabsContent value="admin-accounts" className="mt-0">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border">
                  <AdminAccountCreation />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </PageTransition>
      
      <Footer />
    </div>
  );
};

export default Admin;
