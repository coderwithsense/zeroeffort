import React from "react";
import FeatureCard from "@/components/FeatureCard";

export const Features: React.FC = () => {
  const features = [
    {
      id: 1,
      title: "Smart Automation",
      description:
        "Eliminate manual work with intelligent workflows that learn and adapt to your processes over time.",
    },
    {
      id: 2,
      title: "Unified Workspace",
      description:
        "Bring all your tools, documents, and communications together in one seamless platform that works how you think.",
    },
    {
      id: 3,
      title: "Intelligent Assistant",
      description:
        "Get personalized recommendations and insights to help you make better decisions faster.",
    },
    {
      id: 4,
      title: "Seamless Integration",
      description:
        "Connect with your favorite tools and services without friction, maintaining your existing workflows.",
    }
  ];

  return (
    <div id="features" className="flex flex-col items-center py-28 px-5 bg-gradient-to-b from-white to-purple-50/30">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-6xl font-semibold text-[#080808] leading-[70px] mb-6 max-md:text-5xl max-md:leading-[56px] max-sm:text-4xl max-sm:leading-[44px]">
          Features you'll love
        </h2>
        <p className="text-[28px] text-[#080808] font-light leading-10 max-w-[780px] max-md:text-2xl max-md:leading-8 max-sm:text-lg max-sm:leading-7">
          Designed to eliminate friction and help you accomplish more with less effort, so you can focus on what matters.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1400px]">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      
      <div className="mt-24 flex justify-center">
        <img 
          src="https://img.freepik.com/free-vector/music-player-app-interface-concept_23-2148514079.jpg?t=st=1744287435~exp=1744291035~hmac=cd4265c6e868021d95c3e8e5267cbb375eb34fd82244a5958e57701ff0860526&w=996"
          alt="ZeroEfforts Features"
          className="max-w-full md:max-w-4xl rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default Features;