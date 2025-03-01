import { Zap, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-2 glassmorphism shadow-lg" 
          : "py-4 bg-transparent"
      } border-b border-white/10 rounded-b-xl`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="gradient-button p-2 rounded-xl mr-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Zap className="h-5 w-5" />
            </div>
            <Link href="/" className="text-2xl font-bold hero-gradient-text hover:opacity-90 transition-opacity">
              ZeroEffort
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 font-medium">
              <Link
                href="#features"
                className="hover:text-primary transition-colors duration-300 relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#playground"
                className="hover:text-primary transition-colors duration-300 relative group"
              >
                Playground
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#pricing"
                className="hover:text-primary transition-colors duration-300 relative group"
              >
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <Button
                  onClick={() => signOut()}
                  className="px-6 py-2 h-11 rounded-full bg-secondary/20 backdrop-blur-sm border  hover:bg-secondary/40 hover:border-primary/30 text-white transition-all duration-300 hover:shadow-md gradient-button"
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => router.push("/sign-in")}
                    className="px-6 py-2 h-11 rounded-full bg-secondary/20 backdrop-blur-sm  hover:bg-secondary/40 hover:border-primary/30 text-white transition-all duration-300 hover:shadow-md gradient-button"
                  >
                    Sign In
                  </Button>
                  {/* <Button
                    onClick={() => router.push("/sign-up")}
                    className="px-6 py-2 h-11 rounded-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:translate-y-[-2px] gradient-button"
                  >
                    Get Started
                  </Button> */}
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-300 hover:text-primary transition-colors bg-secondary/20 backdrop-blur-sm rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Improved slide-down animation */}
        <div 
          className={`md:hidden absolute w-full left-0 bg-background/95 backdrop-blur-lg border-t border-gray-800/50 transition-all duration-300 overflow-hidden ${
            mobileMenuOpen 
              ? "max-h-80 opacity-100 py-4 shadow-xl" 
              : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="container mx-auto px-4 flex flex-col gap-3">
            <Link
              href="#features"
              className="py-3 px-4 hover:bg-secondary/20 rounded-lg transition-colors flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="mr-3 w-1.5 h-1.5 rounded-full bg-primary"></span>
              Features
            </Link>
            <Link
              href="#playground"
              className="py-3 px-4 hover:bg-secondary/20 rounded-lg transition-colors flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="mr-3 w-1.5 h-1.5 rounded-full bg-primary"></span>
              Playground
            </Link>
            <Link
              href="#pricing"
              className="py-3 px-4 hover:bg-secondary/20 rounded-lg transition-colors flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="mr-3 w-1.5 h-1.5 rounded-full bg-primary"></span>
              Pricing
            </Link>

            <div className="mt-4 flex flex-col gap-3 pt-3 border-t border-gray-800/30">
              {isSignedIn ? (
                <Button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 flex items-center justify-center w-full rounded-full bg-secondary/20 border border-gray-800 hover:bg-secondary/30 transition-colors"
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      router.push("/sign-in");
                      setMobileMenuOpen(false);
                    }}
                    className="py-3 h-12 flex items-center justify-center w-full rounded-full bg-secondary/20 border border-gray-800 hover:bg-secondary/30 transition-colors"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      router.push("/sign-up");
                      setMobileMenuOpen(false);
                    }}
                    className="py-3 h-12 flex items-center justify-center w-full rounded-full bg-primary hover:bg-primary/90 transition-colors shadow-md"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Add spacer when mobile menu is open to prevent content from jumping */}
      {mobileMenuOpen && <div className="md:hidden h-64"></div>}
    </div>
  );
};

export default Navbar;