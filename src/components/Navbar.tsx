
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'Booking', path: '/booking' },
    { title: 'Feedback', path: '/feedback' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-md',
        isScrolled 
          ? 'bg-white/80 dark:bg-black/80 shadow-md py-3' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight relative z-10 group">
          <span className="inline-block transition-transform group-hover:scale-110 duration-300">Clean</span>
          <span className="inline-block text-primary dark:text-primary-foreground transition-transform group-hover:scale-110 duration-300 delay-100">Haven</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'relative text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.path 
                  ? 'text-primary' 
                  : 'text-muted-foreground',
                'after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full'
              )}
            >
              {link.title}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="outline" size="sm" className="ml-4 hover-lift" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm" className="ml-4 hover-lift">
                <User className="h-4 w-4 mr-2" />
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
          'md:hidden fixed inset-0 bg-background/95 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 p-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-xl font-medium transition-colors hover:text-primary',
                location.pathname === link.path 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              )}
            >
              {link.title}
            </Link>
          ))}
          
          {user ? (
            <>
              <div className="text-center">
                <p className="text-muted-foreground mb-2">{user.email}</p>
                <Button variant="outline" size="lg" className="w-full" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Link to="/auth" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
