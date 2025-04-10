import React from "react";
import CustomButton from "@/components/CustomButton";

const CallToAction: React.FC = () => {
  return (
    <section id="pricing" className="py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#310DF6]/10 to-[#A139FF]/10 rounded-3xl p-12 md:p-20 text-center">
          <h2 className="font-['Lexend'] text-5xl font-bold text-[#080808] mb-6 max-md:text-4xl max-sm:text-3xl">
            Ready to simplify your workflow?
          </h2>
          <p className="font-['DM_Sans'] text-2xl font-light text-[#080808] max-w-2xl mx-auto mb-12 max-md:text-xl max-sm:text-lg">
            Join thousands of teams who have transformed the way they work with ZeroEfforts.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-left max-w-sm w-full">
              <div className="mb-4">
                <span className="text-lg font-medium text-[#110B53]">Free</span>
              </div>
              <h3 className="font-['Lexend'] text-5xl font-bold text-[#080808] mb-2">
                $0
                <span className="text-xl font-normal text-gray-500">/month</span>
              </h3>
              <p className="font-['DM_Sans'] text-lg font-light text-gray-600 mb-6">
                Perfect for personal projects
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#310DF6] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 3 projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#310DF6] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#310DF6] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Core features</span>
                </li>
              </ul>
              
              <CustomButton className="w-full justify-center text-lg hover:cursor-pointer hover:bg-accent-foreground transition-colors duration-400 hover:text-white">
                Get Started
              </CustomButton>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-left max-w-sm w-full relative">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-[#310DF6] text-white text-sm font-medium px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
              <div className="mb-4">
                <span className="text-lg font-medium text-[#110B53]">Pro</span>
              </div>
              <h3 className="font-['Lexend'] text-5xl font-bold text-[#080808] mb-2">
                $29
                <span className="text-xl font-normal text-gray-500">/month</span>
              </h3>
              <p className="font-['DM_Sans'] text-lg font-light text-gray-600 mb-6">
                For teams and businesses
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#310DF6] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#310DF6] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#310DF6] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              
              <CustomButton className="w-full justify-center text-lg hover:cursor-pointer hover:bg-accent-foreground transition-colors duration-400 hover:text-white">
                Start Free Trial
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;