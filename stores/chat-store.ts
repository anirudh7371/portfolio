import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  assistantMessageId?: string;
};

type ChatState = {
  isOpen: boolean;
  sessionId: string;
  messages: ChatMessage[];
  toggleOpen: () => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
};

function getSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `visitor-${Date.now()}`;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      isOpen: false,
      sessionId: getSessionId(),
      messages: [
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hi! I can answer questions about Anirudh's projects, skills, experience, and services.",
        },
      ],
      toggleOpen: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
      addMessage: (message) => {
        set((state) => ({ messages: [...state.messages, message] }));
      },
      clearMessages: () => {
        set({
          sessionId: getSessionId(),
          messages: [
            {
              id: "welcome",
              role: "assistant",
              content:
                "Hi! I can answer questions about Anirudh's projects, skills, experience, and services.",
            },
          ],
        });
      },
    }),
    {
      name: "portfolio-chat-store",
      partialize: (state) => ({
        sessionId: state.sessionId,
        messages: state.messages,
      }),
    },
  ),
);
