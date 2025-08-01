import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled: boolean;
}

export const ChatInput = ({ onSubmit, disabled }: ChatInputProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt("");
    }
  };

  const handleSuggestionClick = (text: string) => {
    setPrompt(text);
    // Auto-focus input after selecting a suggestion
    const inputElement = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    if (inputElement) inputElement.focus();
  };

  return (
    <div className="border-t border-border p-4 bg-card">
      <div className="flex items-center space-x-2 max-w-4xl mx-auto">
        <Input
          placeholder="Type your message..."
          className="flex-1 border-input focus:ring-2 focus:ring-primary/30 focus:border-primary py-6"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleSubmit}
              disabled={disabled || !prompt.trim()}
              size="icon"
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 rounded-full shadow-sm disabled:bg-primary/50"
            >
              <SendIcon size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Send message</TooltipContent>
        </Tooltip>
      </div>
      <div className="text-xs text-center text-muted-foreground mt-2">
        Press Enter to send
      </div>
    </div>
  );
};
