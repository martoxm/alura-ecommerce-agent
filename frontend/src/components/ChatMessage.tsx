import type { Message } from "../types/chat";

type Props = {
  msg: Message;
};

export default function ChatMessage({ msg }: Props) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[88%] items-end gap-3 sm:max-w-[78%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ${
            isUser
              ? "bg-sky-600 text-white ring-sky-500/30"
              : "bg-white text-slate-700 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700"
          }`}
        >
          {isUser ? "EU" : "IA"}
        </div>

        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? "rounded-br-sm bg-sky-600 text-white"
              : "rounded-bl-sm bg-white text-slate-800 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800"
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-6">{msg.content}</p>
          <p
            className={`mt-2 text-[11px] ${isUser ? "text-sky-100" : "text-slate-400"}`}
          >
            {new Date(msg.createdAt).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
