interface AskAIRequestArgs {
  chatId: string;
  prompt: string;
}

interface AskAIResponse {
  chatId: any;
  success: boolean;
  message: string;
}

export const askAIRequest = async (
  key: string,
  { arg }: { arg: AskAIRequestArgs }
): Promise<AskAIResponse> => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to ask AI");
  }

  return res.json();
};
