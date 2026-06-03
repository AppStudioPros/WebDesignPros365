"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { AiNodeOrb } from "./AiNodeOrb";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "wdp365.chat.history";
const OPEN_KEY = "wdp365.chat.open";

const SUGGESTED = [
  "What's the difference between SEO, AEO, and GEO?",
  "Can you replace my GoHighLevel setup?",
  "How much does a custom AI app cost?",
  "Book me a discovery call",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi. I'm the WDP365 assistant, powered by our ACI platform. I can answer questions about our services, pricing, the AI Visibility Stack, or how we replace platforms like GoHighLevel. What are you working on?",
};

export function AciChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Restore history + open state on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Msg[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
      const openSaved = window.localStorage.getItem(OPEN_KEY);
      if (openSaved === "1") setOpen(true);
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(OPEN_KEY, open ? "1" : "0");
  }, [open]);

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || streaming) return;
    setInput("");
    setError(null);

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setStreaming(true);

    // Add a streaming placeholder assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          // strip the welcome message from the wire payload — it's UI-only
          messages: next.slice(1),
        }),
      });

      if (!res.ok || !res.body) {
        const errBody = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(errBody.error || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            if (parsed.text) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + parsed.text,
                  };
                }
                return updated;
              });
            }
          } catch (e) {
            // ignore individual JSON parse hiccups; bubble real errors
            if (e instanceof Error && e.message !== data) {
              throw e;
            }
          }
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      // Remove the empty assistant placeholder if streaming failed early
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === "assistant" && last.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const resetChat = () => {
    setMessages([WELCOME]);
    setError(null);
    setInput("");
  };

  return (
    <>
      {/* Floating launcher — bottom-right */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#3b1184] to-[#5b21b6] text-white shadow-xl shadow-[#3b1184]/40 flex items-center justify-center hover:shadow-2xl hover:shadow-[#5b21b6]/50 transition-shadow ring-1 ring-white/15"
        aria-label={open ? "Close chat" : "Open chat with the ACI assistant"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" strokeWidth={2.25} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <AiNodeOrb className="w-12 h-12" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="fixed bottom-24 right-6 z-40 w-[calc(100%-3rem)] max-w-[400px] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            role="dialog"
            aria-label="ACI chat assistant"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Sparkles className="w-5 h-5" strokeWidth={2.25} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight">
                    ACI Assistant
                  </h3>
                  <p className="text-xs text-white/80 leading-tight">
                    Patented AI · Powered by ACI
                  </p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Reset chat"
                title="Reset chat"
              >
                <RefreshCw className="w-4 h-4" strokeWidth={2.25} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#f8f9fc]"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-[#8734E1] to-[#2F73EE] text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    {msg.content || (
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        thinking
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  {error}
                </div>
              )}
            </div>

            {/* Suggested prompts — only show on initial state */}
            {messages.length === 1 && !streaming && (
              <div className="px-4 pb-2 bg-[#f8f9fc] border-t border-gray-200">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 mt-2">
                  Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#8734E1] hover:text-[#8734E1] transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-200 bg-white p-3 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about services, pricing, or anything else..."
                disabled={streaming}
                className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8734E1]/40 focus:border-[#8734E1] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8734E1] to-[#2F73EE] text-white flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                aria-label="Send message"
              >
                {streaming ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" strokeWidth={2.25} />
                )}
              </button>
            </form>

            <p className="text-[10px] text-gray-400 text-center px-4 pb-3 bg-white">
              Patented ACI architecture · No hallucination · Always human-in-the-loop
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
