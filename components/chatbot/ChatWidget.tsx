"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { owner } from "@/lib/data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string | null>(null);
  const startedAt = useRef<string | null>(null);
  const loggedCount = useRef(0);
  const messagesRef = useRef<Message[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Sends the transcript to the Worker if it grew since the last flush.
  const flushLog = useCallback(() => {
    const current = messagesRef.current;
    if (!CHAT_API_URL || !sessionId.current) return;
    if (!current.some((m) => m.role === "user") || current.length <= loggedCount.current) return;

    const payload = {
      sessionId: sessionId.current,
      messages: current,
      page: window.location.href,
      startedAt: startedAt.current,
    };
    navigator.sendBeacon(
      `${CHAT_API_URL}/log`,
      new Blob([JSON.stringify(payload)], { type: "text/plain" })
    );
    loggedCount.current = current.length;
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flushLog();
    };
    window.addEventListener("pagehide", flushLog);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("pagehide", flushLog);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [flushLog]);

  const handleClose = () => {
    flushLog();
    setIsOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hi! I'm ${owner.name}'s AI assistant. Ask me anything about his experience, projects, or skills!`,
        },
      ]);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    if (!sessionId.current) {
      sessionId.current = crypto.randomUUID();
      startedAt.current = new Date().toISOString();
    }
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!CHAT_API_URL) {
        throw new Error("Chat API URL is missing. Please check your configuration.");
      }

      const response = await fetch(`${CHAT_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.slice(-10), userMessage],
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Sorry, I encountered an error. Please try again later.");
      }

      const messageContent = data.content;
      if (messageContent) {
        setMessages((prev) => [...prev, { role: "assistant", content: messageContent }]);
      } else {
        throw new Error("No response from AI");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            (error instanceof Error && error.message) ||
            "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-jetLight text-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:absolute sm:top-auto sm:left-auto sm:bottom-20 sm:right-0 w-full sm:w-96 h-full sm:h-[500px] bg-background border-b sm:border border-foreground/10 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-jetLight text-white font-bold flex justify-between items-center shrink-0">
            <span>Chat with AI</span>
            <button 
              onClick={handleClose}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-jetLight text-white rounded-tr-none"
                      : "bg-foreground/5 text-foreground rounded-tl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-foreground/5 p-3 rounded-2xl rounded-tl-none animate-pulse text-sm">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="shrink-0 bg-background border-t border-foreground/10 pb-safe">
            <form onSubmit={handleSubmit} className="px-4 pt-4 pb-2 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow bg-foreground/5 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-jetLight text-white rounded-full disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            <p className="px-4 pb-3 text-[11px] text-foreground/50 text-center">
              Conversations may be saved to improve responses.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
