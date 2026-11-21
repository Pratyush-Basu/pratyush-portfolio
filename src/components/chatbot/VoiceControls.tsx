"use client";

import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type VoiceControlsProps = {
  listening: boolean;
  speaking: boolean;
  supported: boolean;
  onToggleListen: () => void;
  onStopSpeaking: () => void;
};

export default function VoiceControls({
  listening,
  speaking,
  supported,
  onToggleListen,
  onStopSpeaking,
}: VoiceControlsProps) {
  if (!supported) {
    return (
      <p className="px-4 pb-2 text-[11px] text-white/40">
        Voice APIs are unavailable in this browser. Text mode is active.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 px-4 pb-2">
      <button
        type="button"
        onClick={onToggleListen}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition",
          listening
            ? "border-electric-blue/50 bg-electric-blue/20 text-white"
            : "border-white/10 text-white/65 hover:text-white",
        )}
        aria-pressed={listening}
      >
        {listening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
        {listening ? "Listening…" : "Voice input"}
      </button>

      <button
        type="button"
        onClick={onStopSpeaking}
        disabled={!speaking}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition",
          speaking
            ? "border-violet-400/50 bg-violet-500/20 text-white"
            : "border-white/10 text-white/40",
        )}
      >
        {speaking ? (
          <VolumeX className="h-3.5 w-3.5" />
        ) : (
          <Volume2 className="h-3.5 w-3.5" />
        )}
        {speaking ? "Stop audio" : "TTS ready"}
      </button>

      {listening || speaking ? (
        <div className="ml-auto flex items-end gap-0.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className="waveform-bar w-0.5 rounded-full bg-electric-blue"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
