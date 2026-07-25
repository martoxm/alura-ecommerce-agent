import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { sendMessage } from "./services/chatService";
import type { Message, ChatRequest } from "./types/chat";
import { v4 as uuidv4 } from "uuid";

const THEME_KEY = "alura_theme";
const SESSION_KEY = "alura_session";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(SESSION_KEY) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      if (sessionId) localStorage.setItem(SESSION_KEY, sessionId);
      else localStorage.removeItem(SESSION_KEY);
    } catch {}
  }, [sessionId]);

  const append = (role: "user" | "assistant", content: string) => {
    const msg: Message = {
      id: uuidv4(),
      role,
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((current) => [...current, msg]);
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
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro inesperado ao enviar a mensagem.";
      setError(message);
      append("assistant", "Desculpe, não consegui responder agora.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
        <header className="border-b border-slate-200/70 bg-white/60 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400">
                AluraEcommerceAgent
              </p>
              <h1 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
                Assistente interno de e-commerce
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Tire dúvidas sobre trocas, devoluções, pedidos, logística e
                processos internos.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {theme === "dark" ? "Tema claro" : "Tema escuro"}
              </button>

              <button
                type="button"
                onClick={clearChat}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                Limpar conversa
              </button>
            </div>
          </div>
        </header>

        <main className="flex flex-1 min-h-0 flex-col">
          <ChatWindow messages={messages} loading={loading} error={error} />
          <ChatInput onSend={handleSend} disabled={loading} />
        </main>
      </div>
    </div>
  );
}
