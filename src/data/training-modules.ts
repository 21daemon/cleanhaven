
import { TrainingModule, Quiz } from "@/types/training";

export const trainingModules: TrainingModule[] = [
  {
    id: "1",
    title: "Fire Safety Basics",
    description: "Learn the fundamentals of fire safety in a hotel environment, including fire types, prevention, and basic response protocols.",
    duration: 45,
    imageUrl: "https://images.unsplash.com/photo-1598620617450-28316d5bb8ab?q=80&w=2560&auto=format&fit=crop",
    level: "beginner",
    category: "fire_safety",
    roles: ["admin", "manager", "receptionist", "housekeeping", "security", "maintenance", "food_service"],
    progress: 0,
    completed: false
  },
  {
    id: "2",
    title: "Fire Extinguisher Operation",
    description: "Master the proper techniques for operating different types of fire extinguishers in various emergency scenarios.",
    duration: 60,
    imageUrl: "https://images.unsplash.com/photo-1621110482131-3076ba1b9d4d?q=80&w=2487&auto=format&fit=crop",
    level: "beginner",
    category: "equipment",
    roles: ["admin", "manager", "security", "maintenance"],
    progress: 0,
    completed: false
  },
  {
    id: "3",
    title: "Guest Evacuation Procedures",
    description: "Learn how to safely and efficiently evacuate guests during fire emergencies, including considerations for guests with disabilities.",
    duration: 75,
    imageUrl: "https://images.unsplash.com/photo-1542513217-0b0eedf7005d?q=80&w=2564&auto=format&fit=crop",
    level: "intermediate",
    category: "evacuation",
    roles: ["admin", "manager", "receptionist", "housekeeping", "security"],
    progress: 0,
    completed: false
  },
  {
    id: "4",
    title: "Kitchen Fire Prevention",
    description: "Specific training for food service staff on preventing and handling kitchen fires, including grease fires and equipment hazards.",
    duration: 60,
    imageUrl: "https://images.unsplash.com/photo-1612199621372-80b9c7d51ee3?q=80&w=2532&auto=format&fit=crop",
    level: "intermediate",
    category: "fire_safety",
    roles: ["admin", "manager", "food_service"],
    progress: 0,
    completed: false
  },
  {
    id: "5",
    title: "Emergency Response Leadership",
    description: "Advanced training for managers and security personnel on leading emergency response efforts during fire incidents.",
    duration: 90,
    imageUrl: "https://images.unsplash.com/photo-1617973114119-cc8b75ba04e5?q=80&w=2534&auto=format&fit=crop",
    level: "advanced",
    category: "emergency_response",
    roles: ["admin", "manager", "security"],
    progress: 0,
    completed: false
  },
  {
    id: "6",
    title: "Fire Alarm Systems",
    description: "Learn about hotel fire alarm systems, including how they work, monitoring, and response protocols when alarms are triggered.",
    duration: 45,
    imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2560&auto=format&fit=crop",
    level: "intermediate",
    category: "equipment",
    roles: ["admin", "manager", "security", "maintenance"],
    progress: 0,
    completed: false
  },
  {
    id: "7",
    title: "First Aid for Fire-Related Injuries",
    description: "Essential first aid techniques for burns, smoke inhalation, and other common fire-related injuries.",
    duration: 75,
    imageUrl: "https://images.unsplash.com/photo-1616091238212-ebb1a1f6dbb7?q=80&w=2574&auto=format&fit=crop",
    level: "intermediate",
    category: "first_aid",
    roles: ["admin", "manager", "receptionist", "housekeeping", "security", "maintenance", "food_service"],
    progress: 0,
    completed: false
  },
  {
    id: "8",
    title: "Hotel-Specific Fire Hazards",
    description: "Identify and mitigate common fire hazards specific to hotel environments, including electrical issues, smoking areas, and more.",
    duration: 60,
    imageUrl: "https://images.unsplash.com/photo-1551634979-2b11f8c218da?q=80&w=2534&auto=format&fit=crop",
    level: "beginner",
    category: "fire_safety",
    roles: ["admin", "manager", "receptionist", "housekeeping", "security", "maintenance", "food_service"],
    progress: 0,
    completed: false
  }
];

export const quizzes: Quiz[] = [
  {
    id: "q1",
    moduleId: "1",
    title: "Fire Safety Basics Quiz",
    questions: [
      {
        id: "q1-1",
        text: "What are the three elements of the fire triangle?",
        options: [
          { id: "q1-1-a", text: "Fuel, Heat, Oxygen", isCorrect: true },
          { id: "q1-1-b", text: "Water, Gas, Electricity", isCorrect: false },
          { id: "q1-1-c", text: "Smoke, Flame, Ash", isCorrect: false },
          { id: "q1-1-d", text: "Carbon, Hydrogen, Oxygen", isCorrect: false }
        ]
      },
      {
        id: "q1-2",
        text: "Which fire extinguisher class is appropriate for electrical fires?",
        options: [
          { id: "q1-2-a", text: "Class A", isCorrect: false },
          { id: "q1-2-b", text: "Class B", isCorrect: false },
          { id: "q1-2-c", text: "Class C", isCorrect: true },
          { id: "q1-2-d", text: "Class D", isCorrect: false }
        ]
      },
      {
        id: "q1-3",
        text: "What is the recommended action if your clothes catch fire?",
        options: [
          { id: "q1-3-a", text: "Run to find water", isCorrect: false },
          { id: "q1-3-b", text: "Stop, Drop, and Roll", isCorrect: true },
          { id: "q1-3-c", text: "Remove the clothing immediately", isCorrect: false },
          { id: "q1-3-d", text: "Fan the flames to extinguish them", isCorrect: false }
        ]
      },
      {
        id: "q1-4",
        text: "What should you do first when discovering a fire in the hotel?",
        options: [
          { id: "q1-4-a", text: "Try to extinguish it yourself", isCorrect: false },
          { id: "q1-4-b", text: "Call the fire department directly", isCorrect: false },
          { id: "q1-4-c", text: "Activate the fire alarm", isCorrect: true },
          { id: "q1-4-d", text: "Evacuate the building quietly", isCorrect: false }
        ]
      },
      {
        id: "q1-5",
        text: "Which of the following is NOT a common cause of hotel fires?",
        options: [
          { id: "q1-5-a", text: "Cooking equipment", isCorrect: false },
          { id: "q1-5-b", text: "Electrical faults", isCorrect: false },
          { id: "q1-5-c", text: "Smoking", isCorrect: false },
          { id: "q1-5-d", text: "Properly maintained sprinkler systems", isCorrect: true }
        ]
      }
    ]
  }
];

export const getUserTrainingModules = (userRole: string) => {
  return trainingModules
    .filter(module => module.roles.includes(userRole as any))
    .map(module => ({
      ...module,
      progress: Math.floor(Math.random() * 100),
      completed: Math.random() > 0.7
    }));
};
