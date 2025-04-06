import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
      const navigate = useNavigate();
      const heroRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
            const handleParallax = () => {
                  if (heroRef.current) {
                        heroRef.current.style.transform = `translateY(${
                              window.scrollY * 0.25
                        }px)`;
                  }
            };

            window.addEventListener("scroll", handleParallax);
            return () => window.removeEventListener("scroll", handleParallax);
      }, []);

      return (
            <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
                  {/* Background Image */}
                  <div
                        ref={heroRef}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform"
                        style={{
                              backgroundImage:
                                    "url(https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                        }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                  {/* Content */}
                  <div className="relative z-10 text-center px-6 max-w-2xl">
                        <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-wide bg-primary/10 text-white rounded-full backdrop-blur-md mb-4 animate-fade-in">
                              Premium Car Detailing
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-up">
                              Exceptional Car Care for the Discerning Driver
                        </h1>

                        <p className="text-lg text-white/85 mb-8 animate-slide-up animation-delay-200">
                              Meticulous attention to detail. Premium products.
                              Expert technicians. Experience car care that
                              transcends the ordinary.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-300">
                              <Button
                                    size="lg"
                                    onClick={() => navigate("/booking")}
                                    className="hover-lift group"
                              >
                                    Book Now
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                              <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => navigate("/services")}
                                    className="bg-white/10 text-white hover:bg-white/20 hover-lift"
                              >
                                    Our Services
                              </Button>
                        </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
            </section>
      );
};

export default Hero;
