
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { UserNav } from "@/components/layout/user-nav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X, Flame, Bell } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/#features" },
    { title: "Pricing", href: "/#pricing" },
    { title: "About", href: "/#about" },
    { title: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link to="/" className="flex items-center gap-2 transition-colors">
            <Logo />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <Link to={link.href}>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
                        location.pathname === link.href &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button
                size="sm"
                className="hidden md:flex bg-gradient-fire hover:bg-gradient-fire/90"
              >
                <Flame className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <div className="ml-2">
                <UserNav />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="hidden md:flex"
                onClick={() => (window.location.href = "/auth?mode=login")}
              >
                Sign In
              </Button>
              <Button
                className="hidden md:flex bg-gradient-fire hover:bg-gradient-fire/90"
                onClick={() => (window.location.href = "/auth?mode=signup")}
              >
                Get Started
              </Button>
            </div>
          )}

          <Menubar className="md:hidden">
            <MenubarMenu>
              <MenubarTrigger
                className="p-0 w-10 h-10 flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </MenubarTrigger>
              {mobileMenuOpen && (
                <MenubarContent
                  align="end"
                  className="w-screen max-w-[300px] mt-2"
                >
                  {navLinks.map((link) => (
                    <MenubarItem key={link.title} asChild>
                      <Link
                        to={link.href}
                        className="flex items-center py-2 cursor-pointer"
                      >
                        {link.title}
                      </Link>
                    </MenubarItem>
                  ))}
                  {!user ? (
                    <>
                      <MenubarItem asChild>
                        <Link
                          to="/auth?mode=login"
                          className="flex items-center py-2 cursor-pointer"
                        >
                          Sign In
                        </Link>
                      </MenubarItem>
                      <MenubarItem asChild>
                        <Link
                          to="/auth?mode=signup"
                          className="flex items-center py-2 cursor-pointer font-semibold"
                        >
                          Get Started
                        </Link>
                      </MenubarItem>
                    </>
                  ) : (
                    <MenubarItem asChild>
                      <Link
                        to="/dashboard"
                        className="flex items-center py-2 cursor-pointer"
                      >
                        Dashboard
                      </Link>
                    </MenubarItem>
                  )}
                </MenubarContent>
              )}
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  );
}
