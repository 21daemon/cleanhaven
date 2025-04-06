
import React from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("flex items-center gap-2 font-bold", sizeClasses[size], className)}>
      <Flame className={cn("text-fire-500", size === "sm" ? "w-5 h-5" : size === "md" ? "w-6 h-6" : "w-8 h-8")} />
      <span className="gradient-text">FireTrainPro</span>
    </div>
  );
}
