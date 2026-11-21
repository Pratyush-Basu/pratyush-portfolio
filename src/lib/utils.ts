export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatFramePath(base: string, index: number, pad = 2): string {
  return `${base}/frame-${String(index).padStart(pad, "0")}.png`;
}
