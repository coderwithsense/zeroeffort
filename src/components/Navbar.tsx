
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // const navigate = useNavigate();
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  return (
    <nav className="fixed w-full top-0 z-50 glassmorphism border-b border-white/20 rounded-b-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <div className="gradient-button p-2 rounded-xl mr-2 shadow-lg">
            <Zap className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold hero-gradient-text">ZeroEffort</div>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="hidden sm:block hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#playground"
            className="hidden sm:block hover:text-primary transition-colors"
          >
            Playground
          </a>

          <SignedIn>
            <Button
              variant="outline"
              className="hidden sm:flex hover:border-primary hover:text-primary rounded-xl"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Button
              variant="outline"
              className="hidden sm:flex hover:border-primary hover:text-primary rounded-xl"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              className="gradient-button rounded-xl shadow-lg"
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