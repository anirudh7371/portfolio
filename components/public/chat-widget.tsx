"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageSquare, SendHorizontal, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";

export function ChatWidget() {
  const {
    isOpen,
    sessionId,
    messages,
    toggleOpen,
    addMessage,
    clearMessages,
  } = useChatStore();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [feedbackState, setFeedbackState] = useState<Record<string, "UP" | "DOWN">>({});
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messageContainerRef.current) {
      return;
    }
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }, [messages, isOpen]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();

    if (!question || isSending) {
      return;
    }

    setError(null);
    setIsSending(true);

    addMessage({
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
    });
    setInput("");

    const response = await fetch("/api/chat/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        visitorSessionId: sessionId,
      }),
    });

    setIsSending(false);

    if (!response.ok) {
      setError("Chat assistant is unavailable right now.");
      return;
    }

    const json = await response.json();
    addMessage({
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: json.data?.answer ?? "No answer returned.",
      assistantMessageId: json.data?.assistantMessageId,
    });
  }

  async function sendFeedback(messageId: string, feedback: "UP" | "DOWN") {
    if (!messageId) {
      return;
    }

    setFeedbackState((prev) => ({ ...prev, [messageId]: feedback }));

    await fetch("/api/chat/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId,
        feedback,
      }),
    });
  }

  return (
    <>
      <button type="button" className="chat-launcher" onClick={toggleOpen}>
        {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
        <span>{isOpen ? "Close" : "Ask AI"}</span>
      </button>

      {isOpen ? (
        <section className="chat-panel" aria-label="Portfolio assistant">
          <header className="chat-head">
            <div>
              <h2>Portfolio Assistant</h2>
              <p>Grounded on projects, skills, and experience.</p>
            </div>
            <button
              type="button"
              className="admin-button admin-button-ghost"
              onClick={clearMessages}
            >
              Reset
            </button>
          </header>

          <div ref={messageContainerRef} className="chat-messages">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`chat-bubble ${
                  message.role === "assistant" ? "chat-assistant" : "chat-user"
                }`}
              >
                <p>{message.content}</p>

                {message.role === "assistant" && message.assistantMessageId ? (
                  <div className="chat-feedback-row">
                    <button
                      type="button"
                      className={`chat-feedback-button ${
                        feedbackState[message.assistantMessageId] === "UP"
                          ? "chat-feedback-active"
                          : ""
                      }`}
                      onClick={() =>
                        sendFeedback(message.assistantMessageId as string, "UP")
                      }
                    >
                      <ThumbsUp size={14} />
                    </button>
                    <button
                      type="button"
                      className={`chat-feedback-button ${
                        feedbackState[message.assistantMessageId] === "DOWN"
                          ? "chat-feedback-active"
                          : ""
                      }`}
                      onClick={() =>
                        sendFeedback(message.assistantMessageId as string, "DOWN")
                      }
                    >
                      <ThumbsDown size={14} />
                    </button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          {error ? <p className="admin-error">{error}</p> : null}

          <form className="chat-form" onSubmit={onSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about projects, skills, or services"
              maxLength={500}
            />
            <button type="submit" className="admin-button" disabled={isSending}>
              <SendHorizontal size={16} />
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
