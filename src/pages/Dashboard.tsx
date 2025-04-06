
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ProgressSummary } from "@/components/training/progress-summary";
import { ModuleCard } from "@/components/training/module-card";
import { getUserTrainingModules } from "@/data/training-modules";
import { Bell, Calendar, Award, Clock, Flame } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const userModules = user ? getUserTrainingModules(user.role) : [];
  
  // Get in-progress modules
  const inProgressModules = userModules.filter(m => m.progress && m.progress > 0 && !m.completed);
  
  // Get recommended modules
  const recommendedModules = userModules
    .filter(m => !m.progress || m.progress === 0)
    .slice(0, 3);

  const upcomingDate = new Date();
  upcomingDate.setDate(upcomingDate.getDate() + 14);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {userProfile?.name || 'User'}! Here's your safety training overview.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button size="sm" className="bg-gradient-fire">
            <Flame className="mr-2 h-4 w-4" />
            Start Training
          </Button>
        </div>
      </div>
      
      <ProgressSummary modules={userModules} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Continue Learning</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/training">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inProgressModules.length > 0 ? (
                inProgressModules.slice(0, 2).map(module => (
                  <ModuleCard key={module.id} module={module} />
                ))
              ) : (
                <Card className="col-span-full">
                  <CardContent className="py-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-medium">No modules in progress</h3>
                      <p className="text-sm text-muted-foreground">Start a new module to see it here</p>
                      <Button className="mt-4" asChild>
                        <Link to="/training">Browse Modules</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommended For You</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/training">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedModules.slice(0, 2).map(module => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Your required training schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Annual Fire Safety Refresher</h3>
                      <p className="text-sm text-muted-foreground">Due by {formatDate(upcomingDate)}</p>
                    </div>
                    <div className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                      Required
                    </div>
                  </div>
                  <Progress value={0} className="h-1 mt-2" />
                  <Button size="sm" variant="ghost" className="w-full mt-2">
                    Start Now
                  </Button>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Evacuation Drill</h3>
                      <p className="text-sm text-muted-foreground">Scheduled for {formatDate(new Date(upcomingDate.getTime() + 86400000 * 7))}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      Team
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-muted-foreground" />
                Certifications
              </CardTitle>
              <CardDescription>Your current certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-l-4 border-green-500 pl-3 py-2">
                  <div>
                    <h3 className="font-medium">Basic Fire Safety</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>Expires in 8 months</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/certifications">View All Certificates</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
