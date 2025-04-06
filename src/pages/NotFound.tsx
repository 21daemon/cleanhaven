
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16 border-b flex items-center px-6">
        <Logo />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-9xl font-bold text-fire-500">404</h1>
          <p className="text-xl font-semibold mt-4">Page Not Found</p>
          <p className="text-muted-foreground mt-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button className="mt-6 bg-gradient-fire" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
