export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Desenvolvido por{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            Gabriel Martorelli
          </span>
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/gabrielmartorelli/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn de Gabriel Martorelli"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-9.5 15v-7H7v7h2.5Zm-1.25-8a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM17 18v-4.1c0-2-.43-3.55-2.77-3.55-1.13 0-1.89.62-2.2 1.2h-.03V10H9.58v8H12v-3.96c0-1.04.2-2.04 1.48-2.04 1.26 0 1.28 1.18 1.28 2.1V18H17Z" />
            </svg>
          </a>

          <a
            href="https://github.com/martoxm"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub de Gabriel Martorelli"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.4-4.04-1.4-.54-1.36-1.32-1.72-1.32-1.72-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.24-3.25-.13-.31-.54-1.57.12-3.27 0 0 1-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.28-1.56 3.29-1.24 3.29-1.24.66 1.7.25 2.96.12 3.27.77.85 1.24 1.93 1.24 3.25 0 4.64-2.8 5.66-5.48 5.97.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>

          <a
            href="https://www.martodev.online/"
            target="_blank"
            rel="noreferrer"
            aria-label="Portfólio de Gabriel Martorelli"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M4 4h16v16H4V4Zm2 2v12h12V6H6Zm2 2h8v2H8V8Zm0 4h8v2H8v-2Zm0 4h5v2H8v-2Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
