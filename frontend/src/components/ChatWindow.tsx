import React, { useRef, useEffect } from "react";
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
    <div className="flex-1 overflow-auto p-4" ref={ref}>
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Ask something about processes, returns, or logistics.
        </div>
      )}

      <div className="flex flex-col">
        {messages.map((m) => (
          <ChatMessage key={m.id} msg={m} />
        ))}
        {loading && (
          <div className="mr-auto bg-gray-100 rounded-lg p-3 my-2 text-gray-700">
            Typing...
          </div>
        )}
      </div>

      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
}
