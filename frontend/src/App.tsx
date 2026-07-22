import { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { sendMessage } from "./services/chatService";
import type { Message } from "./types/chat";
import type { ChatRequest } from "./types/chat";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(() => {
    try {
      return localStorage.getItem("alura_session") || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (sessionId) localStorage.setItem("alura_session", sessionId);
      else localStorage.removeItem("alura_session");
    } catch {}
  }, [sessionId]);

  const append = (role: "user" | "assistant", content: string) => {
    const msg: Message = {
      id: uuidv4(),
      role,
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((s) => [...s, msg]);
  };

  const handleSend = async (text: string) => {
    setError(null);
    append("user", text);
    setLoading(true);

    const payload: ChatRequest = { sessionId, message: text };

    try {
      const res = await sendMessage(payload);
      setSessionId(res.sessionId);
      append("assistant", res.answer);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Unknown error");
      append("assistant", "Sorry, there was an error reaching the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b">
          <h1 className="text-lg font-semibold">AluraEcommerceAgent</h1>
          <p className="text-sm text-gray-500">
            Internal agent for order, returns and operations
          </p>
        </div>

        <ChatWindow messages={messages} loading={loading} error={error} />
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
