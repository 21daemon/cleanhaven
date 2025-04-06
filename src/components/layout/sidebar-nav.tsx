
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Flame, 
  Home, 
  GraduationCap, 
  Calendar, 
  Award, 
  BarChart3, 
  User, 
  Users, 
  Settings
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const { user } = useAuth();
  const location = useLocation();
  
  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager" || isAdmin;

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/training", label: "My Training", icon: GraduationCap },
    { href: "/schedule", label: "Schedule", icon: Calendar },
    { href: "/certifications", label: "Certifications", icon: Award },
    ...(isManager ? [{ href: "/reports", label: "Reports", icon: BarChart3 }] : []),
    ...(isAdmin ? [{ href: "/users", label: "Users", icon: Users }] : []),
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {links.map((link) => {
        const isActive = location.pathname === link.href;
        return (
          <Button
            key={link.href}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "justify-start",
              isActive && "bg-fire-100 text-fire-700 hover:bg-fire-200 hover:text-fire-700"
            )}
            asChild
          >
            <Link to={link.href}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
