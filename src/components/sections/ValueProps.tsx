import React from "react";
import { CheckCircle } from "lucide-react";

const ValueProps: React.FC = () => {
  const valueProps = [
    {
      title: "Save Time",
      description: "Automate repetitive tasks and workflows to focus on what truly matters.",
      icon: "⏱️"
    },
    {
      title: "Stay Organized",
      description: "Keep all your projects, tasks, and communications in one central place.",
      icon: "✨"
    },
    {
      title: "Collaborate Easily",
      description: "Work seamlessly with your team no matter where they are located.",
      icon: "👥"
    }
  ];

  return (
    <section id="solutions" className="py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-['Lexend'] text-5xl font-bold text-[#080808] mb-6 max-md:text-4xl max-sm:text-3xl">
            Why teams choose ZeroEfforts
          </h2>
          <p className="font-['DM_Sans'] text-2xl font-light text-[#080808] max-w-3xl mx-auto max-md:text-xl max-sm:text-lg">
            Experience the difference when your tools actually work for you, not against you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-transform hover:translate-y-[-5px]"
            >
              <div className="text-5xl mb-5">{prop.icon}</div>
              <h3 className="font-['Lexend'] text-2xl font-semibold text-[#080808] mb-4">
                {prop.title}
              </h3>
              <p className="font-['DM_Sans'] text-lg font-light text-[#080808]">
                {prop.description}
              </p>
              <div className="mt-6 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-[#310DF6]" />
                    <span className="font-['DM_Sans'] text-base">
                      Feature benefit {i}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;