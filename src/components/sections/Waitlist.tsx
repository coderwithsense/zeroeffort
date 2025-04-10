import React, { useState } from "react";
import { ArrowRight, Rocket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("You've been added to our waitlist!");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full py-16 bg-gradient-to-br from-white via-[#F8F9FF] to-[#EFF1FF]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg p-10 relative overflow-hidden border border-[#E5E9FF]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#310DF6] to-[#A139FF]"></div>
          
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-['Lexend'] text-[#080808] mb-4">
              Join Our Exclusive Waitlist
            </h2>
            <p className="text-lg text-[#080808]/80 font-['DM_Sans'] max-w-lg mb-8">
              Be among the first to experience ZeroEffort and receive early-bird pricing.
            </p>
            
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="relative flex-grow">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 px-4 w-full border-2 border-[#080808]/10 rounded-xl focus:border-[#310DF6] focus:ring-1 focus:ring-[#310DF6]"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-6 bg-gradient-to-r from-[#310DF6] to-[#6945FA] hover:from-[#2B0BD0] hover:to-[#5935EA] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 hover:cursor-pointer"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
            
            <p className="text-sm text-[#080808]/60 mt-4">
              Join 350+ professionals already on the waitlist
            </p>
          </div>
          
          <div className="mt-8 w-full flex justify-center">
            <div className="bg-gradient-to-r from-[#E5E0FF] to-[#EFF7FF] text-[#310DF6] px-5 py-3 rounded-full flex items-center gap-2 font-medium shadow-sm">
              <Rocket size={16} className="text-[#310DF6]" />
              <span>Early bird offer: $29 lifetime access for first 100 signups</span>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-[#310DF6]/5 to-transparent rounded-full -mr-16 -mb-16 z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistSection;