
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, BookOpen } from "lucide-react";
import { TrainingModule } from "@/types/training";

interface ProgressSummaryProps {
  modules: TrainingModule[];
}

export function ProgressSummary({ modules }: ProgressSummaryProps) {
  // Calculate overall progress
  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.completed).length;
  const inProgressModules = modules.filter(m => m.progress && m.progress > 0 && !m.completed).length;
  const overallProgressPercent = totalModules 
    ? Math.round((completedModules / totalModules) * 100) 
    : 0;
  
  // Calculate total learning time
  const totalMinutes = modules.reduce((acc, module) => acc + module.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          <Trophy className="h-4 w-4 text-fire-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overallProgressPercent}%</div>
          <Progress value={overallProgressPercent} className="h-2 mt-1" />
          <p className="text-xs text-muted-foreground mt-2">
            {completedModules} of {totalModules} modules completed
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Course Status</CardTitle>
          <Target className="h-4 w-4 text-azure-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">{completedModules}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{inProgressModules}</div>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{totalModules - completedModules - inProgressModules}</div>
              <p className="text-xs text-muted-foreground">Not Started</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Learning Time</CardTitle>
          <BookOpen className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hours}h {minutes}m</div>
          <p className="text-xs text-muted-foreground mt-2">
            Total training duration
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
