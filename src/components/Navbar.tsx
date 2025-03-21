import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);
      const location = useLocation();
      const { user, signOut } = useAuth();
      const navigate = useNavigate();

      useEffect(() => {
            const handleScroll = () => setIsScrolled(window.scrollY > 10);
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
      }, []);

      useEffect(() => setIsMenuOpen(false), [location.pathname]);

      const handleSignOut = async () => {
            await signOut();
            navigate("/");
      };

      const navLinks = [
            { title: "Home", path: "/" },
            { title: "Services", path: "/services" },
            { title: "Booking", path: "/booking" },
            { title: "Feedback", path: "/feedback" },
      ];

      return (
            <nav
                  className={cn(
                        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-md",
                        isScrolled
                              ? "bg-white/80 dark:bg-black/80 shadow-md py-3"
                              : "bg-transparent py-6"
                  )}
            >
                  <div className="container mx-auto flex items-center justify-between px-4">
                        <Link
                              to="/"
                              className="text-2xl font-bold tracking-tight"
                        >
                              <span className="transition-transform group-hover:scale-110">
                                    Clean
                              </span>
                              <span className="text-primary dark:text-primary-foreground transition-transform group-hover:scale-110 delay-100">
                                    Haven
                              </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                              {navLinks.map(({ title, path }) => (
                                    <Link key={path} to={path}>
                                          <Button
                                                variant={
                                                      location.pathname === path
                                                            ? "default"
                                                            : "outline"
                                                }
                                          >
                                                {title}
                                          </Button>
                                    </Link>
                              ))}
                              {user ? (
                                    <div className="flex items-center space-x-4">
                                          <Button
                                                variant="outline"
                                                className="text-sm text-muted-foreground"
                                          >
                                                {user.email}
                                          </Button>
                                          <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleSignOut}
                                          >
                                                <LogOut className="h-4 w-4 mr-2" />{" "}
                                                Logout
                                          </Button>
                                    </div>
                              ) : (
                                    <Link to="/auth">
                                          <Button variant="outline" size="sm">
                                                <User className="h-4 w-4 mr-2" />{" "}
                                                Login
                                          </Button>
                                    </Link>
                              )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                              className="md:hidden text-foreground p-2"
                              onClick={() => setIsMenuOpen(!isMenuOpen)}
                              aria-label="Toggle menu"
                        >
                              {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                              ) : (
                                    <Menu className="h-6 w-6" />
                              )}
                        </button>
                  </div>

                  {/* Mobile Navigation */}
                  <div
                        className={cn(
                              "fixed inset-0 z-40 flex flex-col items-center justify-center space-y-4 bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden",
                              isMenuOpen ? "translate-x-0" : "translate-x-full"
                        )}
                  >
                        {navLinks.map(({ title, path }) => (
                              <Link key={path} to={path}>
                                    <Button
                                          variant={
                                                location.pathname === path
                                                      ? "default"
                                                      : "outline"
                                          }
                                          size="lg"
                                    >
                                          {title}
                                    </Button>
                              </Link>
                        ))}
                        {user ? (
                              <div className="text-center flex flex-col items-center space-y-2">
                                    <p className="text-muted-foreground">
                                          {user.email}
                                    </p>
                                    <Button
                                          variant="outline"
                                          size="lg"
                                          onClick={handleSignOut}
                                    >
                                          <LogOut className="h-4 w-4 mr-2" />{" "}
                                          Logout
                                    </Button>
                              </div>
                        ) : (
                              <Link to="/auth">
                                    <Button variant="outline" size="lg">
                                          <User className="h-4 w-4 mr-2" />{" "}
                                          Login
                                    </Button>
                              </Link>
                        )}
                  </div>
            </nav>
      );
};

export default Navbar;
