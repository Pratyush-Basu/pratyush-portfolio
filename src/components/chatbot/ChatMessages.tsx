"use client";

import type { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";

type ChatMessagesProps = {
  messages: ChatMessage[];
};

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
            message.role === "user"
              ? "ml-auto bg-violet-500/25 text-white"
              : "mr-auto bg-white/5 text-white/75",
          )}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
}
