"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Zap, MoonIcon, SunIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5 text-muted-foreground" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="h-5 w-5 text-foreground" />
      ) : (
        <MoonIcon className="h-5 w-5 text-foreground" />
      )}
    </Button>
  );
};

const Navbar = () => {
  const router = useRouter();
  
  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border rounded-b-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl mr-2 shadow-lg transition-all hover:bg-primary/90">
            <Zap className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            <span className="text-primary">Zero</span>Effort
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="hidden sm:block text-foreground hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#playground"
            className="hidden sm:block text-foreground hover:text-primary transition-colors"
          >
            Playground
          </a>
          
          {/* <ThemeToggle /> */}

          <SignedIn>
            <Button
              variant="outline"
              className="hidden sm:flex border-border hover:border-primary hover:text-primary rounded-xl"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Button
              variant="outline"
              className="hidden sm:flex border-border hover:border-primary hover:text-primary rounded-xl"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-lg transition-all hover:translate-y-[-2px]"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;