
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      heroRef.current.style.transform = `translateY(${scrollPosition * 0.25}px)`;
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const backgroundImageUrl = "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        ref={heroRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-block mb-4 animate-fade-in">
            <span className="px-4 py-1.5 text-xs font-medium uppercase tracking-wide bg-primary/10 text-white rounded-full backdrop-blur-md">
              Premium Car Detailing
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-up text-balance">
            Exceptional Car Care for the Discerning Driver
          </h1>
          
          <p className="text-lg text-white/85 mb-8 max-w-lg animate-slide-up animation-delay-200 text-balance">
            Meticulous attention to detail. Premium products. Expert technicians. 
            Experience car care that transcends the ordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-300">
            <Button 
              size="lg" 
              onClick={() => navigate('/booking')}
              className="hover-lift group"
            >
              Book Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/services')}
              className="bg-white/10 text-white hover:bg-white/20 hover-lift"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default Hero;
