import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";
import { supabase } from "@/integrations/supabase/client";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
      const { user, signOut } = useAuth();
      const location = useLocation();
      const [isAdmin, setIsAdmin] = useState(false);
      const [isOpen, setIsOpen] = useState(false);

      useEffect(() => {
            const checkAdminStatus = async () => {
                  if (user) {
                        try {
                              const { data, error } = await supabase
                                    .from("profiles")
                                    .select("is_admin")
                                    .eq("id", user.id)
                                    .single();

                              if (error) {
                                    console.error(
                                          "Error fetching admin status:",
                                          error
                                    );
                                    setIsAdmin(false);
                              } else {
                                    setIsAdmin(data?.is_admin || false);
                              }
                        } catch (error) {
                              console.error(
                                    "Error checking admin status:",
                                    error
                              );
                              setIsAdmin(false);
                        }
                  } else {
                        setIsAdmin(false);
                  }
            };

            checkAdminStatus();
      }, [user]);

      const isActive = (path: string) => {
            return location.pathname === path
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary";
      };

      return (
            <nav className="bg-background border-b sticky top-0 z-50 w-full">
                  <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                        <Link
                              to="/"
                              className="text-2xl font-bold text-primary"
                        >
                              Autox24
                        </Link>

                        <div className="md:hidden">
                              <Button
                                    variant="ghost"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="p-2"
                              >
                                    {isOpen ? (
                                          <X size={24} />
                                    ) : (
                                          <Menu size={24} />
                                    )}
                              </Button>
                        </div>

                        <ul
                              className={`absolute top-16 left-0 w-full bg-background md:static md:flex md:items-center md:space-x-6 md:w-auto md:bg-transparent transition-transform ${
                                    isOpen ? "block" : "hidden md:flex"
                              }`}
                        >
                              {["/", "/Services", "/Booking", "/Feedback"].map(
                                    (path, index) => (
                                          <li
                                                key={index}
                                                className="text-center md:text-left"
                                          >
                                                <Link
                                                      to={path}
                                                      className={`block text-sm font-medium transition-colors px-4 py-2 md:px-2 md:py-1 ${isActive(
                                                            path
                                                      )}`}
                                                >
                                                      {path === "/"
                                                            ? "Home"
                                                            : path.substring(1)}
                                                </Link>
                                          </li>
                                    )
                              )}
                              {user && isAdmin && (
                                    <li>
                                          <Link
                                                to="/admin"
                                                className={`block text-sm font-medium transition-colors px-4 py-2 md:px-2 md:py-1 ${isActive(
                                                      "/admin"
                                                )}`}
                                          >
                                                Admin
                                          </Link>
                                    </li>
                              )}

                              {user ? (
                                    <li>
                                          <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                      <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                      >
                                                            <Avatar className="h-8 w-8">
                                                                  <AvatarImage
                                                                        src={
                                                                              user
                                                                                    ?.user_metadata
                                                                                    ?.avatar_url ||
                                                                              `https://avatar.vercel.sh/${user.email}`
                                                                        }
                                                                        alt={
                                                                              user.email ||
                                                                              "User Avatar"
                                                                        }
                                                                  />
                                                                  <AvatarFallback>
                                                                        {user.email
                                                                              ?.charAt(
                                                                                    0
                                                                              )
                                                                              .toUpperCase()}
                                                                  </AvatarFallback>
                                                            </Avatar>
                                                      </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                      className="w-56"
                                                      align="end"
                                                      forceMount
                                                >
                                                      <DropdownMenuLabel>
                                                            My Account
                                                      </DropdownMenuLabel>
                                                      <DropdownMenuSeparator />
                                                      <DropdownMenuItem>
                                                            {user.email}
                                                      </DropdownMenuItem>
                                                      <DropdownMenuItem
                                                            onClick={() =>
                                                                  signOut()
                                                            }
                                                      >
                                                            Logout
                                                      </DropdownMenuItem>
                                                </DropdownMenuContent>
                                          </DropdownMenu>
                                    </li>
                              ) : (
                                    <li>
                                          <Link
                                                to="/auth"
                                                className={`block text-sm font-medium transition-colors px-4 py-2 md:px-2 md:py-1 ${isActive(
                                                      "/auth"
                                                )}`}
                                          >
                                                Login/Register
                                          </Link>
                                    </li>
                              )}
                        </ul>
                  </div>
            </nav>
      );
};

export default Navbar;
