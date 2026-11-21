import { API_BASE_URL } from "@/lib/constants";

export type ChatApiMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatApiResponse = {
  reply: string;
};

/**
 * Chat client for the FastAPI Pratyush AI backend.
 * API keys stay on the server — never in the browser.
 */
export async function sendChatMessage(
  messages: ChatApiMessage[],
): Promise<ChatApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error(`Chat request failed (${response.status})`);
  }

  return response.json() as Promise<ChatApiResponse>;
}
