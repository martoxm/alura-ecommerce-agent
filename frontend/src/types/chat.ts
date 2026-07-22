export interface ChatRequest {
  sessionId: string | null;
  message: string;
}

export interface ChatResponse {
  sessionId: string;
  answer: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}
