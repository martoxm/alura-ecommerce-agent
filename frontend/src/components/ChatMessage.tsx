import type { Message } from "../types/chat";

type Props = {
  msg: Message;
};

export default function ChatMessage({ msg }: Props) {
  const isUser = msg.role === "user";

  return (
    <div
      className={`max-w-[80%] ${
        isUser
          ? "ml-auto bg-sky-600 text-white"
          : "mr-auto bg-gray-100 text-gray-900"
      } rounded-lg p-3 my-2`}
    >
      <div className="text-sm">{msg.content}</div>
      <div className="text-[10px] opacity-60 mt-1 text-right">
        {new Date(msg.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
