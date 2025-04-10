
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { CustomButton } from "@/components/CustomButton";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  // const navigate = useNavigate();
  const router = useRouter();

  
  const handleGetStarted = () => {
    router.push("/sign-up");
  };


  return (
    <>
    <nav className="w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 flex justify-between items-center px-[31px] py-[21px] rounded-b-xl max-md:px-5">
  <div className="flex items-center gap-2.5">
    <Link href="/" className="text-2xl font-bold font-['Lexend']">
      ZeroEffort
    </Link>
  </div>

  <div className="flex items-center gap-10 max-md:hidden">
    <Link href="#features" className="text-[18px] text-[#080808] font-light font-['DM_Sans'] leading-[40px] hover:scale-105 transition-transform duration-200">
      Features
    </Link>
    <Link href="#solutions" className="text-[18px] text-[#080808] font-light font-['DM_Sans'] leading-[40px] hover:scale-105 transition-transform duration-200">
      Solutions
    </Link>
    <Link href="#pricing" className="text-[18px] text-[#080808] font-light font-['DM_Sans'] leading-[40px] hover:scale-105 transition-transform duration-200">
      Pricing
    </Link>
  </div>

  <div className="flex items-center gap-4 z-50">
    <SignedIn>
      <Button
        variant="outline"
        className="hidden sm:flex hover:border-primary hover:text-white hover:bg-accent-foreground transition-colors duration-400 rounded-xl font-['Lexend']"
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </Button>
      <UserButton afterSignOutUrl=""/>
    </SignedIn>

    <SignedOut>
      <CustomButton onClick={handleGetStarted} className="px-[27px] py-[13px] text-[17px] leading-[19px] font-[500] font-['Lexend'] hover:cursor-pointer hover:bg-accent-foreground hover:text-white">
        Get Started
      </CustomButton>
    </SignedOut>

    {/* Mobile Menu Button */}
    <button className="hidden max-md:block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ti ti-menu-2 text-2xl"
      >
        <path d="M4 6h16"></path>
        <path d="M4 12h16"></path>
        <path d="M4 18h16"></path>
      </svg>
    </button>
  </div>
</nav>


    {/* <nav className="fixed w-full top-0 z-50 glassmorphism border-b border-white/20 rounded-b-xl">
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
    </nav> */}
    </>
  );
};

export default Navbar;

/* <nav className="w-full flex justify-between items-center px-[31px] py-[21px] max-md:px-5">
      <div className="flex items-center gap-2.5">
        <Link href={"/"} className="text-2xl font-semibold font-['Lexend']">
          ZeroEfforts
        </Link>
      </div>
      <div className="flex items-center gap-10 max-md:hidden">
        <Link href="#features" className="text-[18px] text-[#080808] font-light font-['DM_Sans'] leading-[40px]">
          Features
        </Link>
        <Link href="#playground" className="text-[18px] text-[#080808] font-light font-['DM_Sans'] leading-[40px]">
          Playground
        </Link>
        <Link href="#pricing" className="text-[18px] text-[#080808] font-light font-['DM_Sans'] leading-[40px]">
          Pricing
        </Link>
      </div>
      <button className="hidden max-md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ti ti-menu-2 text-2xl"
        >
          <path d="M4 6h16"></path>
          <path d="M4 12h16"></path>
          <path d="M4 18h16"></path>
        </svg>
      </button>
      <CustomButton onClick={() => router.push("/dashboard")} className="hover:cursor-pointer px-[27px] py-[13px] text-[17px] leading-[19px] font-[500] font-['Lexend']">
        DashBoard
      </CustomButton>

      <SignedIn>
            // {/* <Button
            //   variant="outline"
            //   className="hidden sm:flex hover:border-primary hover:text-primary rounded-xl hover:cursor-pointer"
            //   onClick={() => router.push("/dashboard")}
            // >
            //   Dashboard
            // </Button> 
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
    </nav> 
 */