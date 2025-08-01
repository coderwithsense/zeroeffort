import React from "react";

export const SuggestionButton = ({ text, icon, onClick }: SuggestionProps) => {
  return (
    <button
      onClick={() => onClick(text)}
      className="p-4 bg-card rounded-lg shadow-sm border border-border text-left hover:bg-accent/5 transition-colors text-sm hover:border-primary/20"
    >
      <div className="flex items-start gap-2">
        {icon && <div className="mt-0.5">{icon}</div>}
        <span className="text-foreground">{text}</span>
      </div>
    </button>
  );
};
