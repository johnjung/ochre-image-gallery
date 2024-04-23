import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Content } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getContent(content: Content | Content[]): string {
  if (typeof content === "string" || typeof content === "number") {
    return content.toString();
  } else if (Array.isArray(content)) {
    return content
      .map((item) =>
        typeof item === "object" && item.string ? item.string.toString() : "",
      )
      .join(" ");
  } else {
    return content?.string ? content.string.toString() : "";
  }
}
