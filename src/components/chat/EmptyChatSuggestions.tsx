import React from "react";
import Image from "next/image";
import { SuggestionButton } from "./SuggestionButton";

interface EmptyChatSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (text: string) => void;
}

export const EmptyChatSuggestions = ({
  suggestions,
  onSuggestionClick,
}: EmptyChatSuggestionsProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="mb-8 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
        <Image
          src="/logo.png"
          alt="ZeroEffort Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-2">
        How can I help you today?
      </h2>

      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Start a conversation or select a suggestion below
      </p>

      <div className="max-w-lg w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <SuggestionButton
            key={index}
            text={suggestion}
            onClick={onSuggestionClick}
          />
        ))}
      </div>
    </div>
  );
};
