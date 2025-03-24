
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/AdminPanel';
import PageTransition from '@/components/transitions/PageTransition';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Admin: React.FC = () => {
  const { isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Debug info
    console.log("Admin page - Current auth state:", { isAdmin, loading, userId: user?.id });
    
    // Mark that we've checked the auth state
    if (!loading) {
      setAuthChecked(true);
    }
    
    // Redirect non-admin users to auth page after loading is complete
    if (!loading && !isAdmin) {
      console.log("User is not admin, redirecting to auth page");
      navigate('/auth');
    }
  }, [isAdmin, loading, navigate, user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <PageTransition>
        {/* Header */}
        <section className="pt-24 pb-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide inline-block mb-4 animate-fade-in">
                Admin Panel
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
                Business Management
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up animation-delay-100">
                Access your admin tools to manage bookings, view customer feedback, and oversee business operations.
              </p>
            </div>
          </div>
        </section>
        
        {/* Admin Panel */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {loading && (
                <div className="bg-white p-8 rounded-xl border animate-blur-in">
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Verifying admin access...</p>
                  </div>
                </div>
              )}
              
              {!loading && (
                <>
                  <div className="p-1 bg-yellow-50 border border-yellow-200 rounded-lg mb-8 animate-fade-in">
                    <div className="p-4 flex items-start">
                      <ShieldAlert className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-amber-800">Admin Access Only</h3>
                        <p className="text-sm text-amber-700">
                          This area is restricted to authorized personnel only. All actions are logged for security purposes.
                        </p>
                        {user && <p className="text-xs text-amber-700 mt-1">Logged in as: {user.email}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl border animate-blur-in">
                    {isAdmin ? (
                      <AdminPanel />
                    ) : (
                      <div className="text-center py-8">
                        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-red-600 mb-3">Access Denied</h2>
                        <p className="text-muted-foreground mb-6">
                          You don't have permission to access the admin panel. 
                          {user && <span className="block mt-2">Current user: {user.email}</span>}
                        </p>
                        
                        <div className="flex flex-col space-y-4 items-center">
                          <Alert variant="destructive" className="max-w-md">
                            <AlertTitle>Admin Login Required</AlertTitle>
                            <AlertDescription>
                              Please log in with an administrator account
                            </AlertDescription>
                          </Alert>
                          
                          <Button onClick={() => navigate('/auth')}>
                            Go to Admin Login
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </PageTransition>
      
      <Footer />
    </div>
  );
};

export default Admin;
