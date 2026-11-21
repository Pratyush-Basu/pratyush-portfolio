"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ChatWindow from "@/components/chatbot/ChatWindow";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [showTip, setShowTip] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="mb-3"
          >
            <ChatWindow onClose={() => setOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative flex justify-end">
        <AnimatePresence>
          {!open && showTip ? (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-full border border-white/10 bg-[#0b1020]/90 px-3 py-1.5 text-xs text-white/70 backdrop-blur"
            >
              Ask me about Pratyush.
              <button
                type="button"
                className="ml-2 text-white/40 hover:text-white"
                onClick={() => setShowTip(false)}
                aria-label="Dismiss tip"
              >
                ×
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="group relative h-14 w-14 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          aria-label={open ? "Close Pratyush AI" : "Open Pratyush AI"}
        >
          <span className="absolute inset-0 animate-orb-breathe rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-electric-blue opacity-90 shadow-glow" />
          <span className="absolute inset-[3px] rounded-full bg-[#070a14]/70" />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
            AI
          </span>
        </button>
      </div>
    </div>
  );
}
