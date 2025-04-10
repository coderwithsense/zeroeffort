import React, { useState } from "react";
import { Clock, Calendar, Brain, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const TryItYourself: React.FC = () => {
  const [taskInput, setTaskInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!taskInput) {
      toast.error("Please describe your goals or tasks first");
      return;
    }
    
    setIsGenerating(true);
    toast.info("Generating your perfect plan...");
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your plan is ready!");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-white via-[#FCFCFF] to-[#F7F8FF] rounded-3xl shadow-lg border border-[#E5E9FF] p-10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#310DF6] to-[#8568FC]"></div>
          <div className="absolute top-4 right-4 flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#310DF6]"></div>
            <div className="w-2 h-2 rounded-full bg-[#6945FA]/40"></div>
            <div className="w-2 h-2 rounded-full bg-[#8568FC]/40"></div>
          </div>
          
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#310DF6] to-[#6945FA] mb-4 font-['Lexend']">
              Try It Yourself
            </h2>
            <p className="text-lg font-['DM_Sans'] text-[#080808]/80 max-w-2xl mx-auto">
              Experience ZeroEffort in action. Describe your task and let our AI create your perfect productivity plan.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-grow relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6945FA]">
                  <Search size={18} />
                </div>
                <Input
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder="Create a stunning 30-day productivity plan for learning web development"
                  className="pl-10 h-14 rounded-xl border-2 border-[#E5E9FF] focus:border-[#310DF6] text-[#080808] bg-white shadow-sm"
                />
              </div>
              
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="h-14 px-8 bg-gradient-to-r from-[#310DF6] to-[#6945FA] hover:from-[#2B0BD0] hover:to-[#5935EA] text-white font-medium text-base rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:cursor-pointer"
              >
                Generate
              </Button>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-[#E5E9FF] rounded-xl p-4 flex items-center mb-10 shadow-sm">
              <div className="flex-grow text-gray-600 text-sm italic">
                Create a stunning 30-day productivity plan for learning web development
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#E5E0FF] to-[#EEF2FF] rounded-xl p-6 flex flex-col items-center cursor-pointer hover:shadow-md transition-all duration-300 group border border-white/50">
                <div className="w-12 h-12 rounded-full bg-white/90 border border-[#D5E4FF] flex items-center justify-center mb-3 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Clock className="text-[#310DF6]" size={24} />
                </div>
                <h3 className="text-center font-medium text-[#080808]">Quick daily tasks</h3>
              </div>
              
              <div className="bg-gradient-to-br from-[#EEF2FF] to-[#F5EEFF] rounded-xl p-6 flex flex-col items-center cursor-pointer hover:shadow-md transition-all duration-300 group border border-white/50">
                <div className="w-12 h-12 rounded-full bg-white/90 border border-[#ECDEFF] flex items-center justify-center mb-3 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Calendar className="text-[#6945FA]" size={24} />
                </div>
                <h3 className="text-center font-medium text-[#080808]">Weekly schedule</h3>
              </div>
              
              <div className="bg-gradient-to-br from-[#F5EEFF] to-[#F0F2FF] rounded-xl p-6 flex flex-col items-center cursor-pointer hover:shadow-md transition-all duration-300 group border border-white/50">
                <div className="w-12 h-12 rounded-full bg-white/90 border border-[#E5E9FF] flex items-center justify-center mb-3 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Brain className="text-[#8568FC]" size={24} />
                </div>
                <h3 className="text-center font-medium text-[#080808]">Monthly plan</h3>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-[#310DF6]/5 to-transparent rounded-full -mr-32 -mb-32 z-0"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#6945FA]/5 to-transparent rounded-full -ml-32 -mt-32 z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default TryItYourself;