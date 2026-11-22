"use client";

/**
 * Card shell with a cursor-following spotlight and gradient border ring
 * (styles: `.spotlight` in globals.css). Set `--spot` / `--spot-border` via
 * `style` to tint it per card.
 */

import type { CSSProperties, ElementType, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  /** Passed through when rendering as an anchor (`as="a"`). */
  href?: string;
  target?: string;
  rel?: string;
};

export default function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  style,
  ...rest
}: SpotlightCardProps) {
  function onMove(event: MouseEvent<HTMLElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag
      className={cn("spotlight", className)}
      onMouseMove={onMove}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
