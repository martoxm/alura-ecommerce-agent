import { useState, type SubmitEvent } from "react";

type Props = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState("");

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <form
      onSubmit={submit}
      className="border-t border-slate-200/70 bg-white/70 p-3 dark:border-slate-800 dark:bg-slate-950/60 sm:p-4"
    >
      <div className="mx-auto flex w-full max-w-4xl items-end gap-3">
        <div className="flex-1">
          <label htmlFor="chat-message" className="sr-only">
            Digite sua mensagem
          </label>
          <textarea
            id="chat-message"
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Digite sua pergunta aqui..."
            disabled={disabled}
            className="max-h-40 min-h-12 w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-400"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(e as unknown as SubmitEvent);
              }
            }}
          />
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Pressione Enter para enviar ou Shift + Enter para quebrar linha.
          </p>
        </div>

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
