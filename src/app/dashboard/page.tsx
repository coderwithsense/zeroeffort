"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { askAIRequest } from "@/hooks/useAskAI";

const ComingSoon = () => {
  const [prompt, setPrompt] = useState("");
  const chatId = "demo-chat-id"; // Replace with dynamic if needed

  const { trigger, isMutating } = useSWRMutation("/api/chat", askAIRequest);

const handleSubmit = async () => {
  if (!prompt.trim()) return toast.error("Prompt is required");

  try {
    const res = await trigger({ chatId, prompt });
    toast.success("AI says: " + res.message);
  } catch (error: any) {
    toast.error(error.message);
  }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-lg mb-8">
        We're working hard to launch this feature!
      </p>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Enter your prompt"
          className="w-64"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={isMutating}>
          {isMutating ? "Asking..." : "Ask AI"}
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
