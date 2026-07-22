import React, { useState } from "react";

type Props = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState("");

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const txt = value.trim();
    if (!txt) return;
    onSend(txt);
    setValue("");
  };

  return (
    <form
      onSubmit={submit}
      className="flex gap-2 items-center p-3 border-t bg-white"
    >
      <input
        className="flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder="Type your question for the internal agent..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-sky-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
