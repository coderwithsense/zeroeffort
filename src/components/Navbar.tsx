
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { CustomButton } from "@/components/CustomButton";
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
    <nav className="w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 flex justify-between items-center px-[31px] py-[21px] rounded-b-xl max-md:px-5">
  <div className="flex items-center gap-2.5">
    <Link href="/" className="text-2xl font-bold font-['Lexend'] flex items-center justify-center">
      ZeroEffort
    </Link>
  </div>

  <div className="flex items-center gap-10 max-md:hidden">
    <Link href="#features" className="text-[18px] text-[#080808] font-light font-['DM_Sans'] leading-[40px] hover:scale-105 transition-transform duration-200">
      Features
    </Link>
    <Link href="#playground" className="text-[18px] text-[#080808] font-light font-['DM_Sans'] leading-[40px] hover:scale-105 transition-transform duration-200">
      Playground
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
  );
};

export default Navbar;