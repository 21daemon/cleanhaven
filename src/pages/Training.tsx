
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { ModuleCard } from "@/components/training/module-card";
import { ProgressSummary } from "@/components/training/progress-summary";
import { getUserTrainingModules } from "@/data/training-modules";
import { Search } from "lucide-react";

export default function Training() {
  const { user } = useAuth();
  const userModules = user ? getUserTrainingModules(user.role) : [];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Filter modules based on search and filters
  const filteredModules = userModules.filter(module => {
    // Search filter
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          module.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || module.category === categoryFilter;
    
    // Level filter
    const matchesLevel = levelFilter === "all" || module.level === levelFilter;
    
    // Status filter
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "completed" && module.completed) ||
                          (statusFilter === "in_progress" && module.progress && module.progress > 0 && !module.completed) ||
                          (statusFilter === "not_started" && (!module.progress || module.progress === 0));
    
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Training</h1>
        <p className="text-muted-foreground">
          Browse and complete your fire safety training modules
        </p>
      </div>
      
      <ProgressSummary modules={userModules} />
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search training modules..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fire_safety">Fire Safety</SelectItem>
            <SelectItem value="emergency_response">Emergency Response</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="evacuation">Evacuation</SelectItem>
            <SelectItem value="first_aid">First Aid</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="not_started">Not Started</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No matching modules found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
              setLevelFilter("all");
              setStatusFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
