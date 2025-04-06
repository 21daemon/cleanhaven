
import { TrainingModule } from "@/types/training";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ModuleCardProps {
  module: TrainingModule;
  className?: string;
}

export function ModuleCard({ module, className }: ModuleCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    advanced: "bg-purple-100 text-purple-800"
  };

  const categoryLabels = {
    fire_safety: "Fire Safety",
    emergency_response: "Emergency Response",
    equipment: "Equipment",
    evacuation: "Evacuation",
    first_aid: "First Aid"
  };

  return (
    <Card className={cn("hover-scale overflow-hidden", className)}>
      {!imageError ? (
        <div 
          className="h-40 bg-cover bg-center relative" 
          style={{ 
            backgroundImage: `url(${module.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center' 
          }}
        >
          <img 
            src={module.imageUrl} 
            alt={module.title}
            className="hidden"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="h-40 bg-muted flex items-center justify-center">
          <ImageIcon size={48} className="text-muted-foreground opacity-50" />
        </div>
      )}
      
      <CardHeader className="relative p-4">
        <div className="flex justify-between">
          <Badge className={levelColors[module.level]} variant="outline">
            {module.level.charAt(0).toUpperCase() + module.level.slice(1)}
          </Badge>
          <Badge variant="outline">
            {categoryLabels[module.category as keyof typeof categoryLabels]}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mt-2">{module.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span>{module.duration} mins</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {module.description}
        </p>
        
        <div className="mt-4">
          {module.completed ? (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="mr-1 h-4 w-4" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{module.progress || 0}%</span>
              </div>
              <Progress value={module.progress || 0} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant={module.completed ? "outline" : "default"} asChild>
          <Link to={`/training/${module.id}`}>
            {module.completed ? "Review Module" : module.progress ? "Continue" : "Start Learning"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
