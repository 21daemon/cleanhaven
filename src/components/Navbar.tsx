
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

const navItems = [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "Book Now", href: "/booking" },
      { name: "Feedback", href: "/feedback" },
];

const Navbar = () => {
      const { pathname } = useLocation();
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const { user, isAdmin } = useAuth();
      const { toast } = useToast();
      const isMobile = useMobile();

      const handleSignOut = async () => {
            try {
                  await supabase.auth.signOut();
                  toast({
                        title: "Signed out successfully",
                  });
            } catch (error) {
                  console.error("Error signing out:", error);
                  toast({
                        title: "Failed to sign out",
                        variant: "destructive",
                  });
            }
      };

      const userNavItems = [
            { name: "My Bookings", href: "/my-bookings" },
      ];

      if (isAdmin) {
            userNavItems.push({ name: "Admin", href: "/admin" });
      }

      return (
            <div
                  className={cn(
                        "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                        pathname === "/" ? "border-b border-transparent" : "border-b"
                  )}
            >
                  <nav className="flex items-center justify-between mx-auto p-4 max-w-screen-xl">
                        <div className="flex items-center">
                              <Link
                                    to="/"
                                    className="flex-shrink-0 flex items-center mr-8"
                              >
                                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                          CarDetailing
                                    </span>
                              </Link>

                              {/* Desktop menu */}
                              <div className="hidden md:flex space-x-8">
                                    {navItems.map((item) => (
                                          <Link
                                                key={item.name}
                                                to={item.href}
                                                className={cn(
                                                      "text-sm font-medium hover:text-primary transition-colors",
                                                      pathname === item.href
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                )}
                                          >
                                                {item.name}
                                          </Link>
                                    ))}
                              </div>
                        </div>

                        <div className="flex items-center space-x-4">
                              <ModeToggle />

                              {user ? (
                                    <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                                <Button
                                                      variant="ghost"
                                                      className="relative h-8 w-8 rounded-full"
                                                >
                                                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <User className="h-4 w-4 text-primary" />
                                                      </div>
                                                </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent
                                                align="end"
                                                className="w-56"
                                          >
                                                <DropdownMenuLabel>
                                                      My Account
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                
                                                {userNavItems.map((item) => (
                                                      <DropdownMenuItem
                                                            key={item.name}
                                                            asChild
                                                      >
                                                            <Link
                                                                  to={item.href}
                                                            >
                                                                  {item.name === "Admin" ? (
                                                                        <Settings className="mr-2 h-4 w-4" />
                                                                  ) : (
                                                                        <User className="mr-2 h-4 w-4" />
                                                                  )}
                                                                  <span>{item.name}</span>
                                                            </Link>
                                                      </DropdownMenuItem>
                                                ))}
                                                
                                                <DropdownMenuItem
                                                      onClick={handleSignOut}
                                                >
                                                      <LogOut className="mr-2 h-4 w-4" />
                                                      <span>Log out</span>
                                                </DropdownMenuItem>
                                          </DropdownMenuContent>
                                    </DropdownMenu>
                              ) : (
                                    <Button asChild size="sm">
                                          <Link to="/auth">Sign In</Link>
                                    </Button>
                              )}

                              <button
                                    type="button"
                                    className="md:hidden inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                              >
                                    <span className="sr-only">
                                          Open main menu
                                    </span>
                                    {mobileMenuOpen ? (
                                          <X className="h-6 w-6" />
                                    ) : (
                                          <Menu className="h-6 w-6" />
                                    )}
                              </button>
                        </div>
                  </nav>

                  {/* Mobile menu */}
                  {mobileMenuOpen && (
                        <div className="md:hidden px-4 pb-4 pt-2 border-t">
                              <div className="flex flex-col space-y-3">
                                    {navItems.map((item) => (
                                          <Link
                                                key={item.name}
                                                to={item.href}
                                                className={cn(
                                                      "px-3 py-2 text-base font-medium rounded-md",
                                                      pathname === item.href
                                                            ? "bg-primary/10 text-primary"
                                                            : "hover:bg-muted"
                                                )}
                                                onClick={() =>
                                                      setMobileMenuOpen(false)
                                                }
                                          >
                                                {item.name}
                                          </Link>
                                    ))}
                                    
                                    {user && (
                                          <>
                                                {userNavItems.map((item) => (
                                                      <Link
                                                            key={item.name}
                                                            to={item.href}
                                                            className="px-3 py-2 text-base font-medium rounded-md hover:bg-muted"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                      >
                                                            {item.name}
                                                      </Link>
                                                ))}
                                                
                                                <button
                                                      onClick={() => {
                                                            handleSignOut();
                                                            setMobileMenuOpen(false);
                                                      }}
                                                      className="px-3 py-2 text-base font-medium rounded-md text-left hover:bg-muted"
                                                >
                                                      Log out
                                                </button>
                                          </>
                                    )}
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default Navbar;
