import React from "react";
import { ZapIcon } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 bg-secondary/10">
        <ZapIcon size={18} className="text-primary" />
      </div>
      <div className="p-4 rounded-lg bg-card border border-border shadow-sm">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce [animation-delay:0ms]"></div>
          <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce [animation-delay:150ms]"></div>
          <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce [animation-delay:300ms]"></div>
        </div>
      </div>
    </div>
  );
};
