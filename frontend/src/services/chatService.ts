import type { ChatRequest, ChatResponse } from "../types/chat";

const API_URL = import.meta.env.VITE_API_URL;

export async function sendMessage(payload: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || `API error: ${res.status}`);
  }

  return res.json() as Promise<ChatResponse>;
}
