
import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex-1 min-w-[300px] max-w-[500px]">
      <div className="bg-[#FDFDFD] p-[35px] rounded-xl border-2 border-[#080808]">
        <h3 className="text-[46px] font-medium text-[#080808] leading-[54px] tracking-[0.03em] mb-4 max-md:text-4xl max-md:leading-[44px] max-sm:text-[28px] max-sm:leading-9">
          {title}
        </h3>
        <p className="text-[28px] text-[#080808] font-light leading-10 max-md:text-2xl max-md:leading-8 max-sm:text-lg max-sm:leading-7">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
