import React from "react";
import CustomButton from "@/components/CustomButton";

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white to-purple-50"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 w-full max-w-7xl mx-auto">
        <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/90 border border-gray-200 shadow-sm">
          <span className="text-sm font-medium text-[#110B53]">Just launched</span>
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[#110B53] text-white">Beta</span>
        </div>
        
        <h1 className="font-['Lexend'] text-[66px] font-bold text-[#080808] leading-[74px] max-w-[1100px] mb-6 max-md:text-5xl max-md:leading-[56px] max-sm:text-4xl max-sm:leading-[44px]">
          Achieve more with <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#310DF6] to-[#A139FF]">zero effort</span>
        </h1>
        
        <p className="font-['DM_Sans'] text-[30px] font-light text-[#080808] leading-[40px] tracking-[1%] max-w-[840px] mb-12 max-md:text-2xl max-md:leading-8 max-sm:text-lg max-sm:leading-7">
          The productivity platform that removes friction and lets you focus on what matters most.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <CustomButton 
            size="lg" 
            className="text-[22px] leading-[26px] px-8 py-5 font-['Lexend'] font-medium transition-colors duration-400 hover:cursor-pointer hover:bg-accent-foreground hover:text-white"
          >
            Try For Free
          </CustomButton>
          
          <button className="hover:cursor-pointer text-[22px] leading-[26px] px-8 py-5 font-['Lexend'] font-medium border-2 border-[#310DF6]/30 text-[#080808] rounded-full hover:bg-[#310DF6]/5 transition-colors">
            See How It Works
          </button>
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto mt-12">
        <img
          src="https://img.freepik.com/free-vector/gradient-ui-ux-elements-collection_79603-1923.jpg?t=st=1744287368~exp=1744290968~hmac=6c67e598c932ce908cd8261ea8e40f3e8ec180554d9a277302f4405f72aa07db&w=996"
          alt="ZeroEfforts Dashboard"
          className="w-full h-auto rounded-lg shadow-2xl border border-gray-200/30"
        />
      </div>
    </div>
  );
};

export default Hero;