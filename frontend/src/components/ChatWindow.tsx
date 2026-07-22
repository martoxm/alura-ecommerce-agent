import { useEffect, useRef } from "react";
import type { Message } from "../types/chat";
import ChatMessage from "./ChatMessage";

type Props = {
  messages: Message[];
  loading: boolean;
  error?: string | null;
};

export default function ChatWindow({ messages, loading, error }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div ref={ref} className="flex-1 min-h-0 overflow-y-auto px-4 py-5 sm:px-6">
      {messages.length === 0 && !loading && (
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            Como posso ajudar hoje?
          </p>
          <p className="mt-2 text-sm">
            Exemplo: “Qual é o prazo de troca?” ou “Como funciona a devolução?”
          </p>
        </div>
      )}

      <div className="space-y-3">
        {messages.map((m) => (
          <ChatMessage key={m.id} msg={m} />
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-sky-500/10 ring-1 ring-sky-500/20 dark:bg-sky-400/10" />
            <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3 text-sm text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
              Digitando...
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}
