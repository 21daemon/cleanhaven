import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/navbar";
import {
      Shield,
      CheckCircle,
      Clock,
      Users,
      Award,
      Zap,
      Flame,
      BarChart,
      PieChart,
      Heart,
      PlayCircle,
      Phone,
      Headphones,
      ThumbsUp,
      ArrowRight,
      Monitor,
      Smartphone,
      Code,
      MessageSquare,
      ChevronRight,
      Calendar,
      PersonStanding,
      Building,
      LifeBuoy,
} from "lucide-react";

const FeatureCard = ({
      icon,
      title,
      description,
      className = "",
}: {
      icon: React.ReactNode;
      title: string;
      description: string;
      className?: string;
}) => {
      return (
            <div
                  className={`rounded-xl bg-white/5 backdrop-blur-sm p-6 border border-white/10 shadow-lg hover:shadow-fire-500/10 transition-all hover:-translate-y-1 ${className}`}
            >
                  <div className="text-fire-500 mb-4 text-2xl">{icon}</div>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
            </div>
      );
};

const TestimonialCard = ({
      quote,
      author,
      role,
      avatar,
}: {
      quote: string;
      author: string;
      role: string;
      avatar: string;
}) => {
      return (
            <div className="rounded-xl bg-white/5 backdrop-blur-sm p-6 border border-white/10 shadow-lg hover:shadow-azure-500/10 transition-all hover:-translate-y-1">
                  <div className="mb-4 text-lg italic text-muted-foreground">
                        "{quote}"
                  </div>
                  <div className="flex items-center gap-3">
                        <img
                              src={avatar}
                              alt={author}
                              className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                              <div className="font-semibold">{author}</div>
                              <div className="text-sm text-muted-foreground">
                                    {role}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInLeft = {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const scaleIn = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Landing = () => {
      const { user } = useAuth();

      const heroRef = useRef<HTMLDivElement>(null);
      const featuresRef = useRef<HTMLDivElement>(null);
      const howItWorksRef = useRef<HTMLDivElement>(null);
      const testimonialsRef = useRef<HTMLDivElement>(null);
      const modulesRef = useRef<HTMLDivElement>(null);
      const benefitsRef = useRef<HTMLDivElement>(null);
      const ctaRef = useRef<HTMLDivElement>(null);
      const statsRef = useRef<HTMLDivElement>(null);
      const partnersRef = useRef<HTMLDivElement>(null);
      const pricingRef = useRef<HTMLDivElement>(null);
      const demoRef = useRef<HTMLDivElement>(null);
      const techRef = useRef<HTMLDivElement>(null);

      const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
      const featuresInView = useInView(featuresRef, {
            once: true,
            amount: 0.3,
      });
      const howItWorksInView = useInView(howItWorksRef, {
            once: true,
            amount: 0.3,
      });
      const testimonialsInView = useInView(testimonialsRef, {
            once: true,
            amount: 0.3,
      });
      const modulesInView = useInView(modulesRef, { once: true, amount: 0.3 });
      const benefitsInView = useInView(benefitsRef, {
            once: true,
            amount: 0.3,
      });
      const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });
      const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
      const partnersInView = useInView(partnersRef, {
            once: true,
            amount: 0.3,
      });
      const pricingInView = useInView(pricingRef, { once: true, amount: 0.3 });
      const demoInView = useInView(demoRef, { once: true, amount: 0.3 });
      const techInView = useInView(techRef, { once: true, amount: 0.3 });

      const heroImages = [
            "https://images.unsplash.com/photo-1567706529458-54544bc8098e?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1578366941741-9e517759c620?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ];

      return (
            <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-dots bg-[length:20px_20px] opacity-10 pointer-events-none"></div>

                  <Navbar />

                  <section
                        ref={heroRef}
                        className="min-h-screen relative overflow-hidden py-20 flex items-center"
                  >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,69,0.15),transparent_60%)]"></div>
                        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-azure-500/10 blur-3xl animate-pulse-slow"></div>
                        <div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-fire-500/10 blur-3xl animate-pulse-slow"></div>

                        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                              <motion.div
                                    initial="hidden"
                                    animate={heroInView ? "visible" : "hidden"}
                                    variants={fadeInLeft}
                                    className="z-10"
                              >
                                    <div className="inline-block px-4 py-1 rounded-full bg-fire-500/10 text-fire-500 font-medium text-sm mb-6 animate-pulse-slow">
                                          The Next-Gen Safety Training Platform
                                    </div>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                          Modern{" "}
                                          <span className="bg-gradient-to-r from-fire-500 to-fire-600 text-transparent bg-clip-text">
                                                Fire Safety
                                          </span>{" "}
                                          Training Platform
                                    </h1>
                                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                                          Comprehensive fire safety training and
                                          certification management that keeps
                                          your team safe and your business
                                          compliant.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                          {user ? (
                                                <Button
                                                      className="bg-gradient-to-r from-fire-500 to-fire-600 hover:opacity-90 text-white shadow-lg shadow-fire-500/20"
                                                      size="lg"
                                                      onClick={() =>
                                                            (window.location.href =
                                                                  "/dashboard")
                                                      }
                                                >
                                                      Go to Dashboard{" "}
                                                      <ArrowRight className="ml-2 w-4 h-4" />
                                                </Button>
                                          ) : (
                                                <>
                                                      <Button
                                                            className="bg-gradient-to-r from-fire-500 to-fire-600 hover:opacity-90 text-white shadow-lg shadow-fire-500/20"
                                                            size="lg"
                                                            onClick={() =>
                                                                  (window.location.href =
                                                                        "/auth?mode=login")
                                                            }
                                                      >
                                                            Get Started{" "}
                                                            <ArrowRight className="ml-2 w-4 h-4" />
                                                      </Button>
                                                      <Button
                                                            size="lg"
                                                            variant="outline"
                                                            className="border-fire-500 text-fire-500 hover:bg-fire-500/10"
                                                            onClick={() =>
                                                                  (window.location.href =
                                                                        "/auth?mode=signup")
                                                            }
                                                      >
                                                            Watch Demo{" "}
                                                            <PlayCircle className="ml-2 w-4 h-4" />
                                                      </Button>
                                                </>
                                          )}
                                    </div>

                                    <div className="mt-12">
                                          <p className="text-sm text-muted-foreground mb-4">
                                                TRUSTED BY COMPANIES WORLDWIDE
                                          </p>
                                          <div className="flex flex-wrap gap-6 items-center">
                                                {[1, 2, 3, 4].map((i) => (
                                                      <div
                                                            key={i}
                                                            className="flex items-center justify-center h-8 opacity-70 hover:opacity-100 transition-opacity"
                                                      >
                                                            <div className="text-muted-foreground font-semibold">
                                                                  Company {i}
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </motion.div>

                              <motion.div
                                    initial="hidden"
                                    animate={heroInView ? "visible" : "hidden"}
                                    variants={fadeInRight}
                                    className="relative z-10 hidden md:block"
                              >
                                    <div className="relative">
                                          <div className="absolute -inset-0.5 bg-gradient-to-r from-fire-500 to-azure-500 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
                                          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 bg-black/40 backdrop-blur-sm rounded-2xl">
                                                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] col-span-2">
                                                            <img
                                                                  src={
                                                                        heroImages[0]
                                                                  }
                                                                  alt="Fire safety training"
                                                                  className="w-full h-full object-cover rounded-xl"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                                            <div className="absolute bottom-0 left-0 p-4">
                                                                  <div className="text-xl font-bold text-white mb-1">
                                                                        Interactive
                                                                        Training
                                                                  </div>
                                                                  <p className="text-sm text-white/80">
                                                                        Engage
                                                                        your
                                                                        team
                                                                        with our
                                                                        courses
                                                                  </p>
                                                            </div>
                                                      </div>

                                                      <div className="relative rounded-xl overflow-hidden aspect-video">
                                                            <img
                                                                  src={
                                                                        heroImages[1]
                                                                  }
                                                                  alt="Analytics dashboard"
                                                                  className="w-full h-full object-cover rounded-xl"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                                            <div className="absolute bottom-0 left-0 p-3">
                                                                  <div className="text-sm font-bold text-white">
                                                                        Analytics
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      <div className="relative rounded-xl overflow-hidden aspect-video">
                                                            <img
                                                                  src={
                                                                        heroImages[2]
                                                                  }
                                                                  alt="Mobile accessibility"
                                                                  className="w-full h-full object-cover rounded-xl"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                                            <div className="absolute bottom-0 left-0 p-3">
                                                                  <div className="text-sm font-bold text-white">
                                                                        Mobile
                                                                        Access
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="absolute -top-4 -right-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg animate-float">
                                                <div className="flex items-center gap-2">
                                                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                      <span className="text-sm font-medium">
                                                            98% Compliance Rate
                                                      </span>
                                                </div>
                                          </div>

                                          <div
                                                className="absolute -bottom-4 -left-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg animate-float"
                                                style={{ animationDelay: "1s" }}
                                          >
                                                <div className="flex items-center gap-2">
                                                      <BarChart className="w-4 h-4 text-azure-500" />
                                                      <span className="text-sm font-medium">
                                                            Real-time Analytics
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              </motion.div>
                        </div>

                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
                              <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
                                    <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse-slow"></div>
                              </div>
                        </div>
                  </section>

                  <section
                        ref={featuresRef}
                        id="features"
                        className="py-20 px-4 relative"
                  >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fire-500/5 to-transparent pointer-events-none"></div>

                        <motion.div
                              initial="hidden"
                              animate={featuresInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="text-center mb-16">
                                    <div className="inline-block px-4 py-1 rounded-full bg-fire-500/10 text-fire-500 font-medium text-sm mb-4">
                                          POWERFUL FEATURES
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                          Everything You Need for
                                          <br />
                                          Complete Safety Management
                                    </h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                          Our platform offers everything you
                                          need to manage fire safety training
                                          effectively
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <FeatureCard
                                          icon={<Shield />}
                                          title="Compliance Tracking"
                                          description="Automatically track compliance status for all employees"
                                    />
                                    <FeatureCard
                                          icon={<BarChart />}
                                          title="Analytics Dashboard"
                                          description="Get real-time insights into training progress and completion rates"
                                          className="lg:translate-y-8"
                                    />
                                    <FeatureCard
                                          icon={<Award />}
                                          title="Interactive Learning"
                                          description="Engage users with interactive training modules and quizzes"
                                    />
                                    <FeatureCard
                                          icon={<Zap />}
                                          title="Mobile Access"
                                          description="Access training materials from any device, anywhere"
                                    />
                                    <FeatureCard
                                          icon={<Clock />}
                                          title="Automated Reminders"
                                          description="Send automatic notifications for certification renewals"
                                          className="lg:translate-y-8"
                                    />
                                    <FeatureCard
                                          icon={<PieChart />}
                                          title="Custom Reports"
                                          description="Generate custom reports for audits and management reviews"
                                    />
                              </div>
                        </motion.div>
                  </section>

                  <section
                        ref={statsRef}
                        className="py-20 px-4 bg-gradient-to-r from-fire-900/20 to-azure-900/20 relative overflow-hidden"
                  >
                        <div className="absolute inset-0 bg-gradient-dots bg-[length:20px_20px] opacity-5 pointer-events-none"></div>

                        <motion.div
                              initial="hidden"
                              animate={statsInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="text-center mb-16">
                                    <div className="inline-block px-4 py-1 rounded-full bg-azure-500/10 text-azure-500 font-medium text-sm mb-4">
                                          REAL RESULTS
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                          Making Fire Safety Measurable
                                    </h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                          See how our platform is transforming
                                          safety training with real results
                                    </p>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                    <div className="p-6 rounded-lg glass-card bg-white/5 backdrop-blur-sm border border-white/10 hover:border-fire-500/30 transition-all hover:-translate-y-1">
                                          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fire-400 to-fire-600 bg-clip-text text-transparent mb-2">
                                                98%
                                          </div>
                                          <p className="text-sm md:text-base text-muted-foreground">
                                                Compliance Rate
                                          </p>
                                    </div>
                                    <div className="p-6 rounded-lg glass-card bg-white/5 backdrop-blur-sm border border-white/10 hover:border-azure-500/30 transition-all hover:-translate-y-1">
                                          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-azure-400 to-azure-600 bg-clip-text text-transparent mb-2">
                                                75%
                                          </div>
                                          <p className="text-sm md:text-base text-muted-foreground">
                                                Reduction in Admin Time
                                          </p>
                                    </div>
                                    <div className="p-6 rounded-lg glass-card bg-white/5 backdrop-blur-sm border border-white/10 hover:border-fire-500/30 transition-all hover:-translate-y-1">
                                          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fire-400 to-fire-600 bg-clip-text text-transparent mb-2">
                                                65%
                                          </div>
                                          <p className="text-sm md:text-base text-muted-foreground">
                                                Fewer Incidents
                                          </p>
                                    </div>
                                    <div className="p-6 rounded-lg glass-card bg-white/5 backdrop-blur-sm border border-white/10 hover:border-azure-500/30 transition-all hover:-translate-y-1">
                                          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-azure-400 to-azure-600 bg-clip-text text-transparent mb-2">
                                                24/7
                                          </div>
                                          <p className="text-sm md:text-base text-muted-foreground">
                                                Platform Availability
                                          </p>
                                    </div>
                              </div>
                        </motion.div>
                  </section>

                  <section
                        ref={howItWorksRef}
                        className="py-20 px-4 bg-gradient-to-b from-background to-muted/30 relative"
                  >
                        <motion.div
                              initial="hidden"
                              animate={howItWorksInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="text-center mb-16">
                                    <div className="inline-block px-4 py-1 rounded-full bg-fire-500/10 text-fire-500 font-medium text-sm mb-4">
                                          SIMPLE PROCESS
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                          How It Works
                                    </h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                          Our streamlined process makes fire
                                          safety training management simple and
                                          effective
                                    </p>
                              </div>

                              <div className="relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-fire-500 to-azure-500 transform -translate-y-1/2 hidden md:block"></div>

                                    <div className="grid md:grid-cols-3 gap-8 relative">
                                          <div className="text-center relative">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-fire-500 to-fire-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 relative z-10 shadow-lg shadow-fire-500/20">
                                                      1
                                                </div>
                                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full">
                                                      <h3 className="text-xl font-bold mb-2">
                                                            Assign Training
                                                      </h3>
                                                      <p className="text-muted-foreground">
                                                            Assign relevant fire
                                                            safety training
                                                            modules to employees
                                                            based on their roles
                                                      </p>
                                                </div>
                                          </div>
                                          <div className="text-center relative">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-azure-500 to-azure-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 relative z-10 shadow-lg shadow-azure-500/20">
                                                      2
                                                </div>
                                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full">
                                                      <h3 className="text-xl font-bold mb-2">
                                                            Complete Courses
                                                      </h3>
                                                      <p className="text-muted-foreground">
                                                            Employees complete
                                                            interactive training
                                                            courses and
                                                            assessments at their
                                                            own pace
                                                      </p>
                                                </div>
                                          </div>
                                          <div className="text-center relative">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 relative z-10 shadow-lg shadow-purple-500/20">
                                                      3
                                                </div>
                                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full">
                                                      <h3 className="text-xl font-bold mb-2">
                                                            Track Progress
                                                      </h3>
                                                      <p className="text-muted-foreground">
                                                            Monitor completion
                                                            rates, certification
                                                            status, and
                                                            compliance in
                                                            real-time
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </motion.div>
                  </section>

                  <section
                        ref={demoRef}
                        className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
                  >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-fire-500/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-azure-500/10 rounded-full blur-3xl -z-10"></div>

                        <motion.div
                              initial="hidden"
                              animate={demoInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                          <div className="inline-block px-4 py-1 rounded-full bg-fire-500/10 text-fire-500 font-medium text-sm mb-4">
                                                SEE IT IN ACTION
                                          </div>
                                          <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                                Watch How Our Platform Works
                                          </h2>
                                          <p className="text-muted-foreground mb-8">
                                                Watch our demo video to see how
                                                our fire safety training
                                                platform works in real-time.
                                                Discover the intuitive interface
                                                that makes managing compliance a
                                                breeze.
                                          </p>
                                          <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                      <div className="rounded-full bg-fire-500/10 p-1 mt-1">
                                                            <CheckCircle className="w-4 h-4 text-fire-500" />
                                                      </div>
                                                      <p className="text-muted-foreground">
                                                            Intuitive user
                                                            interface with
                                                            real-time dashboards
                                                      </p>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                      <div className="rounded-full bg-fire-500/10 p-1 mt-1">
                                                            <CheckCircle className="w-4 h-4 text-fire-500" />
                                                      </div>
                                                      <p className="text-muted-foreground">
                                                            Interactive training
                                                            modules with
                                                            assessment tools
                                                      </p>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                      <div className="rounded-full bg-fire-500/10 p-1 mt-1">
                                                            <CheckCircle className="w-4 h-4 text-fire-500" />
                                                      </div>
                                                      <p className="text-muted-foreground">
                                                            Automated
                                                            certification
                                                            tracking and renewal
                                                            reminders
                                                      </p>
                                                </div>
                                          </div>
                                          <Button
                                                className="mt-8 bg-gradient-to-r from-fire-500 to-fire-600 hover:opacity-90 shadow-lg shadow-fire-500/20"
                                                onClick={() =>
                                                      (window.location.href =
                                                            "/demo")
                                                }
                                          >
                                                <PlayCircle className="mr-2 h-4 w-4" />{" "}
                                                Watch Full Demo
                                          </Button>
                                    </div>
                                    <div className="relative">
                                          <div className="absolute -inset-1 bg-gradient-to-r from-fire-500 to-azure-500 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
                                          <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 aspect-video">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20 transition-all transform hover:scale-105">
                                                            <PlayCircle className="w-10 h-10 text-white" />
                                                      </div>
                                                </div>
                                                <img
                                                      src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
                                                      alt="Platform demo"
                                                      className="w-full h-full object-cover opacity-70"
                                                />
                                          </div>
                                    </div>
                              </div>
                        </motion.div>
                  </section>

                  <section
                        ref={techRef}
                        className="py-20 px-4 bg-gradient-to-r from-fire-900/10 to-azure-900/10 relative overflow-hidden"
                  >
                        <div className="absolute inset-0 bg-gradient-dots bg-[length:20px_20px] opacity-5 pointer-events-none"></div>

                        <motion.div
                              initial="hidden"
                              animate={techInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="text-center mb-16">
                                    <div className="inline-block px-4 py-1 rounded-full bg-azure-500/10 text-azure-500 font-medium text-sm mb-4">
                                          MODERN TECHNOLOGY
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                          Built with Cutting-Edge Technology
                                    </h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                          Our platform leverages cutting-edge
                                          technology to provide a seamless
                                          experience
                                    </p>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div className="p-6 rounded-lg glass-card bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:border-fire-500/30 transition-all hover:-translate-y-1">
                                          <Monitor className="w-12 h-12 mx-auto mb-4 text-fire-500" />
                                          <h3 className="font-bold mb-2">
                                                Web Platform
                                          </h3>
                                          <p className="text-sm text-muted-foreground">
                                                Access from any modern browser
                                          </p>
                                    </div>
                                    <div className="p-6 rounded-lg glass-card bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:border-azure-500/30 transition-all hover:-translate-y-1">
                                          <Smartphone className="w-12 h-12 mx-auto mb-4 text-azure-500" />
                                          <h3 className="font-bold mb-2">
                                                Mobile Responsive
                                          </h3>
                                          <p className="text-sm text-muted-foreground">
                                                Train on any device, anywhere
                                          </p>
                                    </div>
                                    <div className="p-6 rounded-lg glass-card bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:border-purple-500/30 transition-all hover:-translate-y-1">
                                          <Zap className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                                          <h3 className="font-bold mb-2">
                                                Real-time Data
                                          </h3>
                                          <p className="text-sm text-muted-foreground">
                                                Instant updates and analytics
                                          </p>
                                    </div>
                                    <div className="p-6 rounded-lg glass-card bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:border-green-500/30 transition-all hover:-translate-y-1">
                                          <Shield className="w-12 h-12 mx-auto mb-4 text-green-500" />
                                          <h3 className="font-bold mb-2">
                                                Secure Platform
                                          </h3>
                                          <p className="text-sm text-muted-foreground">
                                                Enterprise-grade security
                                          </p>
                                    </div>
                              </div>
                        </motion.div>
                  </section>

                  <section
                        ref={partnersRef}
                        className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background"
                  >
                        <motion.div
                              initial="hidden"
                              animate={partnersInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="text-center mb-16">
                                    <div className="inline-block px-4 py-1 rounded-full bg-fire-500/10 text-fire-500 font-medium text-sm mb-4">
                                          TRUSTED PARTNERS
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                          Trusted By Industry Leaders
                                    </h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                          Join hundreds of organizations that
                                          rely on our platform for safety
                                          training
                                    </p>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                          <div
                                                key={i}
                                                className="flex justify-center"
                                          >
                                                <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-lg font-bold text-muted-foreground hover:border-white/30 transition-all hover:-translate-y-1 cursor-pointer">
                                                      Logo {i}
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </motion.div>
                  </section>

                  <section
                        ref={testimonialsRef}
                        className="py-20 px-4 relative overflow-hidden"
                  >
                        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-radial from-fire-500/5 to-transparent opacity-50 -z-10"></div>

                        <motion.div
                              initial="hidden"
                              animate={
                                    testimonialsInView ? "visible" : "hidden"
                              }
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="text-center mb-16">
                                    <div className="inline-block px-4 py-1 rounded-full bg-azure-500/10 text-azure-500 font-medium text-sm mb-4">
                                          CUSTOMER STORIES
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                          What Our Users Say
                                    </h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                          Don't just take our word for it - hear
                                          from our satisfied customers
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <TestimonialCard
                                          quote="This platform has transformed how we manage fire safety training across our organization. The compliance tracking alone has saved us countless hours of administrative work."
                                          author="Sarah Johnson"
                                          role="Safety Manager, ABC Industries"
                                          avatar="https://ui-avatars.com/api/?name=Sarah+Johnson&background=FF6B45&color=fff"
                                    />
                                    <TestimonialCard
                                          quote="As a training coordinator, I love how easy it is to assign courses and track completion. The automated reminder system ensures nothing falls through the cracks."
                                          author="Michael Chen"
                                          role="Training Coordinator, XYZ Corp"
                                          avatar="https://ui-avatars.com/api/?name=Michael+Chen&background=1CA0E8&color=fff"
                                    />
                                    <TestimonialCard
                                          quote="The interactive training modules have significantly improved engagement with our safety program. Our compliance rates are at an all-time high."
                                          author="Jessica Martinez"
                                          role="HR Director, 123 Company"
                                          avatar="https://ui-avatars.com/api/?name=Jessica+Martinez&background=7A5AF8&color=fff"
                                    />
                              </div>
                        </motion.div>
                  </section>

                  <section
                        ref={modulesRef}
                        className="py-20 px-4 bg-gradient-to-b from-background to-muted/30"
                  >
                        <motion.div
                              initial="hidden"
                              animate={modulesInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="text-center mb-16">
                                    <div className="inline-block px-4 py-1 rounded-full bg-fire-500/10 text-fire-500 font-medium text-sm mb-4">
                                          COMPREHENSIVE TRAINING
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                          Training Modules
                                    </h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                          Our comprehensive catalog of fire
                                          safety training modules covers all
                                          aspects of fire prevention and
                                          response
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 gap-8">
                                    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:shadow-fire-500/10 transition-all hover:-translate-y-1">
                                          <div className="h-40 bg-gradient-to-r from-fire-500 to-fire-600 flex items-center justify-center">
                                                <span className="text-5xl">
                                                      🧯
                                                </span>
                                          </div>
                                          <div className="p-6">
                                                <h3 className="text-xl font-bold mb-2">
                                                      Fire Extinguisher Use
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                      Learn the proper
                                                      techniques for using
                                                      different types of fire
                                                      extinguishers in various
                                                      emergency scenarios.
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                      <Clock className="w-4 h-4" />
                                                      <span>45 minutes</span>
                                                      <span>•</span>
                                                      <Zap className="w-4 h-4" />
                                                      <span>Interactive</span>
                                                      <span>•</span>
                                                      <Award className="w-4 h-4" />
                                                      <span>Certificate</span>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:shadow-azure-500/10 transition-all hover:-translate-y-1">
                                          <div className="h-40 bg-gradient-to-r from-azure-500 to-azure-600 flex items-center justify-center">
                                                <span className="text-5xl">
                                                      🚨
                                                </span>
                                          </div>
                                          <div className="p-6">
                                                <h3 className="text-xl font-bold mb-2">
                                                      Emergency Evacuation
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                      Master the protocols for
                                                      safe and efficient
                                                      evacuation during fire
                                                      emergencies and other
                                                      critical situations.
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                      <Clock className="w-4 h-4" />
                                                      <span>60 minutes</span>
                                                      <span>•</span>
                                                      <PersonStanding className="w-4 h-4" />
                                                      <span>Simulation</span>
                                                      <span>•</span>
                                                      <Award className="w-4 h-4" />
                                                      <span>Certificate</span>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all hover:-translate-y-1">
                                          <div className="h-40 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                                                <span className="text-5xl">
                                                      🔥
                                                </span>
                                          </div>
                                          <div className="p-6">
                                                <h3 className="text-xl font-bold mb-2">
                                                      Fire Prevention
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                      Identify and mitigate fire
                                                      hazards in different
                                                      environments before they
                                                      become dangerous
                                                      situations.
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                      <Clock className="w-4 h-4" />
                                                      <span>30 minutes</span>
                                                      <span>•</span>
                                                      <MessageSquare className="w-4 h-4" />
                                                      <span>Video + Quiz</span>
                                                      <span>•</span>
                                                      <Award className="w-4 h-4" />
                                                      <span>Certificate</span>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all hover:-translate-y-1">
                                          <div className="h-40 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                                                <span className="text-5xl">
                                                      🚑
                                                </span>
                                          </div>
                                          <div className="p-6">
                                                <h3 className="text-xl font-bold mb-2">
                                                      First Aid for Burns
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                      Learn essential first aid
                                                      techniques for treating
                                                      various degrees of burns
                                                      and related injuries.
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                      <Clock className="w-4 h-4" />
                                                      <span>40 minutes</span>
                                                      <span>•</span>
                                                      <Heart className="w-4 h-4" />
                                                      <span>Practical</span>
                                                      <span>•</span>
                                                      <Award className="w-4 h-4" />
                                                      <span>Certificate</span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </motion.div>
                  </section>

                  <section
                        ref={pricingRef}
                        id="pricing"
                        className="py-20 px-4 bg-gradient-to-r from-fire-900/10 to-azure-900/10 relative overflow-hidden"
                  >
                        <div className="absolute inset-0 bg-gradient-dots bg-[length:20px_20px] opacity-5 pointer-events-none"></div>

                        <motion.div
                              initial="hidden"
                              animate={pricingInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="text-center mb-16">
                                    <div className="inline-block px-4 py-1 rounded-full bg-fire-500/10 text-fire-500 font-medium text-sm mb-4">
                                          PRICING PLANS
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                          Simple, Transparent Pricing
                                    </h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                          Choose the plan that works best for
                                          your organization's size and needs
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-3 gap-8">
                                    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:scale-105 hover:shadow-lg hover:shadow-fire-500/10">
                                          <div className="p-6 border-b border-white/10">
                                                <h3 className="text-xl font-bold mb-2">
                                                      Starter
                                                </h3>
                                                <div className="flex items-baseline">
                                                      <span className="text-4xl font-bold">
                                                            $99
                                                      </span>
                                                      <span className="text-muted-foreground ml-1">
                                                            /month
                                                      </span>
                                                </div>
                                                <p className="text-muted-foreground mt-2">
                                                      Perfect for small teams up
                                                      to 25 users
                                                </p>
                                          </div>
                                          <div className="p-6">
                                                <ul className="space-y-3">
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Essential
                                                                  training
                                                                  modules
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Basic
                                                                  compliance
                                                                  tracking
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Email
                                                                  notifications
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Standard
                                                                  reports
                                                            </span>
                                                      </li>
                                                </ul>
                                                <Button
                                                      className="w-full mt-6 bg-gradient-to-r from-fire-500 to-fire-600 hover:opacity-90 shadow-md shadow-fire-500/10"
                                                      onClick={() =>
                                                            (window.location.href =
                                                                  "/auth?mode=signup&plan=starter")
                                                      }
                                                >
                                                      Get Started
                                                </Button>
                                          </div>
                                    </div>

                                    <div className="rounded-xl overflow-hidden border-2 border-fire-500 bg-white/5 backdrop-blur-sm transform scale-105 shadow-lg shadow-fire-500/20">
                                          <div className="p-6 border-b border-white/10 relative">
                                                <div className="absolute top-0 right-0 bg-fire-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                                                      POPULAR
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">
                                                      Business
                                                </h3>
                                                <div className="flex items-baseline">
                                                      <span className="text-4xl font-bold">
                                                            $249
                                                      </span>
                                                      <span className="text-muted-foreground ml-1">
                                                            /month
                                                      </span>
                                                </div>
                                                <p className="text-muted-foreground mt-2">
                                                      For growing organizations
                                                      up to 100 users
                                                </p>
                                          </div>
                                          <div className="p-6">
                                                <ul className="space-y-3">
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  All Starter
                                                                  features
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Advanced
                                                                  training
                                                                  modules
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Custom
                                                                  certification
                                                                  paths
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Advanced
                                                                  analytics
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Priority
                                                                  support
                                                            </span>
                                                      </li>
                                                </ul>
                                                <Button
                                                      className="w-full mt-6 bg-gradient-to-r from-fire-500 to-fire-600 hover:opacity-90 shadow-md shadow-fire-500/10"
                                                      onClick={() =>
                                                            (window.location.href =
                                                                  "/auth?mode=signup&plan=business")
                                                      }
                                                >
                                                      Get Started
                                                </Button>
                                          </div>
                                    </div>

                                    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:scale-105 hover:shadow-lg hover:shadow-azure-500/10">
                                          <div className="p-6 border-b border-white/10">
                                                <h3 className="text-xl font-bold mb-2">
                                                      Enterprise
                                                </h3>
                                                <div className="flex items-baseline">
                                                      <span className="text-4xl font-bold">
                                                            Custom
                                                      </span>
                                                </div>
                                                <p className="text-muted-foreground mt-2">
                                                      For large organizations
                                                      with custom needs
                                                </p>
                                          </div>
                                          <div className="p-6">
                                                <ul className="space-y-3">
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  All Business
                                                                  features
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Unlimited
                                                                  users
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Custom
                                                                  integrations
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  White labeling
                                                            </span>
                                                      </li>
                                                      <li className="flex items-center">
                                                            <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                                            <span>
                                                                  Dedicated
                                                                  account
                                                                  manager
                                                            </span>
                                                      </li>
                                                </ul>
                                                <Button
                                                      className="w-full mt-6 border-azure-500 text-azure-500 hover:bg-azure-500/10"
                                                      variant="outline"
                                                      onClick={() =>
                                                            (window.location.href =
                                                                  "/contact")
                                                      }
                                                >
                                                      Contact Sales
                                                </Button>
                                          </div>
                                    </div>
                              </div>
                        </motion.div>
                  </section>

                  <section ref={benefitsRef} className="py-20 px-4">
                        <motion.div
                              initial="hidden"
                              animate={benefitsInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto"
                        >
                              <div className="text-center mb-16">
                                    <div className="inline-block px-4 py-1 rounded-full bg-azure-500/10 text-azure-500 font-medium text-sm mb-4">
                                          WHY CHOOSE US
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                          Why Choose Our Platform
                                    </h2>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                          Our platform offers numerous
                                          advantages over traditional fire
                                          safety training approaches
                                    </p>
                              </div>

                              <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                          <ul className="space-y-6">
                                                <li className="flex gap-4">
                                                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-fire-500/20 flex items-center justify-center text-fire-500">
                                                            <Building className="w-6 h-6" />
                                                      </div>
                                                      <div>
                                                            <h3 className="text-xl font-bold mb-1">
                                                                  Reduce
                                                                  Administrative
                                                                  Burden
                                                            </h3>
                                                            <p className="text-muted-foreground">
                                                                  Automated
                                                                  tracking and
                                                                  reporting
                                                                  eliminates
                                                                  manual
                                                                  record-keeping
                                                                  and follow-ups
                                                            </p>
                                                      </div>
                                                </li>
                                                <li className="flex gap-4">
                                                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-azure-500/20 flex items-center justify-center text-azure-500">
                                                            <Shield className="w-6 h-6" />
                                                      </div>
                                                      <div>
                                                            <h3 className="text-xl font-bold mb-1">
                                                                  Ensure
                                                                  Compliance
                                                            </h3>
                                                            <p className="text-muted-foreground">
                                                                  Stay compliant
                                                                  with
                                                                  regulatory
                                                                  requirements
                                                                  and industry
                                                                  standards
                                                            </p>
                                                      </div>
                                                </li>
                                                <li className="flex gap-4">
                                                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                                                            <Users className="w-6 h-6" />
                                                      </div>
                                                      <div>
                                                            <h3 className="text-xl font-bold mb-1">
                                                                  Improve Safety
                                                                  Culture
                                                            </h3>
                                                            <p className="text-muted-foreground">
                                                                  Foster a
                                                                  strong safety
                                                                  culture
                                                                  through
                                                                  consistent,
                                                                  high-quality
                                                                  training
                                                            </p>
                                                      </div>
                                                </li>
                                                <li className="flex gap-4">
                                                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                                            <LifeBuoy className="w-6 h-6" />
                                                      </div>
                                                      <div>
                                                            <h3 className="text-xl font-bold mb-1">
                                                                  Reduce
                                                                  Incidents
                                                            </h3>
                                                            <p className="text-muted-foreground">
                                                                  Properly
                                                                  trained
                                                                  employees
                                                                  respond better
                                                                  in
                                                                  emergencies,
                                                                  reducing
                                                                  injuries and
                                                                  damage
                                                            </p>
                                                      </div>
                                                </li>
                                          </ul>
                                    </div>
                                    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:shadow-lg hover:shadow-fire-500/10 transition-all">
                                          <div className="space-y-6">
                                                <div className="text-center">
                                                      <div className="text-5xl font-bold bg-gradient-to-r from-fire-400 to-fire-600 bg-clip-text text-transparent mb-2">
                                                            98%
                                                      </div>
                                                      <p className="text-muted-foreground">
                                                            Compliance Rate
                                                      </p>
                                                </div>
                                                <div className="h-px bg-white/10" />
                                                <div className="text-center">
                                                      <div className="text-5xl font-bold bg-gradient-to-r from-azure-400 to-azure-600 bg-clip-text text-transparent mb-2">
                                                            75%
                                                      </div>
                                                      <p className="text-muted-foreground">
                                                            Reduction in
                                                            Administrative Time
                                                      </p>
                                                </div>
                                                <div className="h-px bg-white/10" />
                                                <div className="text-center">
                                                      <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
                                                            65%
                                                      </div>
                                                      <p className="text-muted-foreground">
                                                            Fewer Fire-Related
                                                            Incidents
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </motion.div>
                  </section>

                  <section
                        ref={ctaRef}
                        className="py-20 px-4 bg-gradient-to-r from-fire-900/30 to-azure-900/30 relative overflow-hidden"
                  >
                        <div className="absolute inset-0 bg-gradient-dots bg-[length:20px_20px] opacity-5 pointer-events-none"></div>
                        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-fire-500/20 blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-azure-500/20 blur-3xl"></div>

                        <motion.div
                              initial="hidden"
                              animate={ctaInView ? "visible" : "hidden"}
                              variants={fadeIn}
                              className="max-w-7xl mx-auto text-center relative z-10"
                        >
                              <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-medium text-sm mb-6 backdrop-blur-sm">
                                    GET STARTED TODAY
                              </div>
                              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                                    Ready to Transform Your Fire Safety
                                    Training?
                              </h2>
                              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                                    Join thousands of organizations that trust
                                    our platform to keep their teams safe and
                                    compliant
                              </p>
                              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                          className="bg-gradient-to-r from-fire-500 to-fire-600 hover:opacity-90 shadow-lg shadow-fire-500/20"
                                          size="lg"
                                          onClick={() =>
                                                (window.location.href =
                                                      "/auth?mode=signup")
                                          }
                                    >
                                          Get Started For Free
                                    </Button>
                                    <Button
                                          variant="outline"
                                          size="lg"
                                          className="border-white/20 text-white hover:bg-white/10"
                                          onClick={() =>
                                                (window.location.href = "/demo")
                                          }
                                    >
                                          Request Demo{" "}
                                          <Calendar className="ml-2 w-4 h-4" />
                                    </Button>
                              </div>
                        </motion.div>
                  </section>

                  <footer className="py-12 px-4 border-t border-white/10 bg-gradient-to-b from-background to-background/95">
                        <div className="max-w-7xl mx-auto">
                              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                                    <div className="col-span-2">
                                          <div className="mb-4">
                                                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-fire-500 to-azure-500 bg-clip-text text-transparent">
                                                      FireTrainPro
                                                </h2>
                                                <p className="text-muted-foreground">
                                                      Comprehensive fire safety
                                                      training management for
                                                      modern organizations
                                                </p>
                                          </div>
                                          <div className="flex space-x-4">
                                                <a
                                                      href="#"
                                                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
                                                >
                                                      <span className="sr-only">
                                                            Twitter
                                                      </span>
                                                      <div className="w-5 h-5">
                                                            T
                                                      </div>
                                                </a>
                                                <a
                                                      href="#"
                                                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
                                                >
                                                      <span className="sr-only">
                                                            LinkedIn
                                                      </span>
                                                      <div className="w-5 h-5">
                                                            L
                                                      </div>
                                                </a>
                                                <a
                                                      href="#"
                                                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
                                                >
                                                      <span className="sr-only">
                                                            Facebook
                                                      </span>
                                                      <div className="w-5 h-5">
                                                            F
                                                      </div>
                                                </a>
                                          </div>
                                    </div>

                                    <div>
                                          <h3 className="font-semibold mb-4 text-lg">
                                                Product
                                          </h3>
                                          <ul className="space-y-2">
                                                <li>
                                                      <a
                                                            href="#features"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Features
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="#pricing"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Pricing
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="/demo"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Demo
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="/docs"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Documentation
                                                      </a>
                                                </li>
                                          </ul>
                                    </div>

                                    <div>
                                          <h3 className="font-semibold mb-4 text-lg">
                                                Company
                                          </h3>
                                          <ul className="space-y-2">
                                                <li>
                                                      <a
                                                            href="/about"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            About Us
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="/careers"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Careers
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="/blog"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Blog
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="/contact"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Contact
                                                      </a>
                                                </li>
                                          </ul>
                                    </div>

                                    <div>
                                          <h3 className="font-semibold mb-4 text-lg">
                                                Legal
                                          </h3>
                                          <ul className="space-y-2">
                                                <li>
                                                      <a
                                                            href="/privacy"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Privacy Policy
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="/terms"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Terms of Service
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="/security"
                                                            className="text-muted-foreground hover:text-fire-500 transition-colors flex items-center gap-1"
                                                      >
                                                            <ChevronRight className="w-3 h-3" />{" "}
                                                            Security
                                                      </a>
                                                </li>
                                          </ul>
                                    </div>
                              </div>

                              <div className="mt-12 pt-8 border-t border-white/10 text-center text-muted-foreground">
                                    <p>
                                          © 2023 FireTrainPro. All rights
                                          reserved.
                                    </p>
                              </div>
                        </div>
                  </footer>
            </div>
      );
};

export default Landing;
