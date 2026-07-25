import type { Message } from "../types/chat";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

type Props = {
  msg: Message;
};

function renderContent(text: string) {
  const lines = text.split("\n");
  const blocks: { type: "paragraph" | "list"; content: string[] }[] = [];

  let currentParagraph: string[] = [];
  let currentList: string[] = [];

  const pushParagraph = () => {
    if (currentParagraph.length) {
      blocks.push({ type: "paragraph", content: currentParagraph });
      currentParagraph = [];
    }
  };

  const pushList = () => {
    if (currentList.length) {
      blocks.push({ type: "list", content: currentList });
      currentList = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const isListItem = /^[-*+]\s+/.test(trimmed);

    if (!trimmed) {
      pushParagraph();
      pushList();
      continue;
    }

    if (isListItem) {
      pushParagraph();
      currentList.push(trimmed.replace(/^[-*+]\s+/, ""));
    } else {
      pushList();
      currentParagraph.push(line);
    }
  }

  pushParagraph();
  pushList();

  return blocks.map((block, index) => {
    if (block.type === "paragraph") {
      return (
        <p key={index} className="whitespace-pre-wrap leading-6">
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>
            {block.content.join("\n")}
          </ReactMarkdown>
        </p>
      );
    }

    return (
      <ul key={index} className="ml-5 list-disc space-y-1">
        {block.content.map((item, i) => (
          <li key={i} className="leading-6">
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>{item}</ReactMarkdown>
          </li>
        ))}
      </ul>
    );
  });
}

export default function ChatMessage({ msg }: Props) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[88%] items-end gap-3 sm:max-w-[78%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
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
          <div className="space-y-3">{renderContent(msg.content)}</div>

          <p
            className={`mt-2 text-[11px] ${
              isUser ? "text-sky-100" : "text-slate-400"
            }`}
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
