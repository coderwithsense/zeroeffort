import React from "react";
import { Brain, Rocket, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, bgColor, iconColor }) => {
  return (
    <div className="flex flex-col items-center group">
      <div className={`${bgColor} w-20 h-20 rounded-full flex items-center justify-center mb-6 relative transition-all duration-300 group-hover:shadow-lg`}>
        <div className={`absolute ${iconColor}`}>
          {icon}
        </div>
        <div className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center absolute -top-1 -right-1 border border-white/20 shadow-sm">
          <span className="text-lg font-bold bg-gradient-to-br from-[#310DF6] to-[#6945FA] bg-clip-text text-transparent">{number}</span>
        </div>
      </div>
      <h3 className="text-xl font-medium mb-3 font-['Lexend']">{title}</h3>
      <p className="text-center text-[#080808]/70 font-['DM_Sans']">{description}</p>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
  const router = useRouter()
  return (
    <div className="w-full py-20 bg-gradient-to-b from-white via-[#FCFCFF] to-[#F7F8FF]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#310DF6] to-[#6945FA] font-['Lexend']">
          How ZeroEffort Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
          <Step 
            number={1}
            title="Describe Your Task or Goal"
            description="Simply tell ZeroEffort what you need to accomplish in plain text."
            icon={<Lightbulb size={32} className="text-[#310DF6]" />}
            bgColor="bg-gradient-to-br from-[#E5E0FF] to-[#EEF2FF]"
            iconColor="text-[#310DF6]"
          />
          
          <Step 
            number={2}
            title="AI Creates Your Plan"
            description="Our AI analyzes your needs and generates a tailored productivity plan."
            icon={<Brain size={32} className="text-[#6945FA]" />}
            bgColor="bg-gradient-to-br from-[#EEF2FF] to-[#F5EEFF]"
            iconColor="text-[#6945FA]"
          />
          
          <Step 
            number={3}
            title="Execute & Track Progress"
            description="Follow your plan with reminders and adaptive adjustments as you go."
            icon={<Rocket size={32} className="text-[#8568FC]" />}
            bgColor="bg-gradient-to-br from-[#F5EEFF] to-[#F0F2FF]"
            iconColor="text-[#8568FC]"
          />
        </div>
        
        <div className="flex justify-center mt-14">
          <Button onClick={() => router.push("/sign-up")} className="bg-gradient-to-r from-[#310DF6] to-[#6945FA] hover:from-[#2B0BD0] hover:to-[#5935EA] text-white font-medium px-8 py-6 h-auto text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:cursor-pointer">
            Get Started
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20">
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E5E0FF] to-[#EEF2FF] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3L21 7L13 11L5 7L13 3Z" stroke="#310DF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 17L13 21L21 17" stroke="#310DF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12L13 16L21 12" stroke="#310DF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-center font-medium">Smart Planning</h3>
          </div>
          
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EEF2FF] to-[#F5EEFF] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12Z" stroke="#6945FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="#6945FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-center font-medium">AI-Powered</h3>
          </div>
          
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F5EEFF] to-[#F0F2FF] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#8568FC" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="#8568FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-center font-medium">Time Saving</h3>
          </div>
          
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F0F2FF] to-[#E5E0FF] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke="#310DF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="#310DF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 13H15" stroke="#310DF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 17H15" stroke="#310DF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-center font-medium">One-Click Setup</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;