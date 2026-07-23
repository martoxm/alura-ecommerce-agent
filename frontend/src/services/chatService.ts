import type { ChatRequest, ChatResponse } from "../types/chat";

const API_URL = import.meta.env.VITE_API_URL;

export async function sendMessage(payload: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (!response.ok) {
      if (isJson) {
        const data = await response.json().catch(() => null);

        const message =
          typeof data?.message === "string"
            ? data.message
            : "Ocorreu um erro ao enviar sua mensagem.";

        throw new Error(message);
      }

      throw new Error("Ocorreu um erro ao enviar sua mensagem.");
    }

    if (!isJson) {
      throw new Error("A resposta da API não veio no formato esperado.");
    }

    return response.json() as Promise<ChatResponse>;
  } catch {
    throw new Error(
      "Não foi possível conectar à API. Verifique sua conexão e tente novamente.",
    );
  }
}
