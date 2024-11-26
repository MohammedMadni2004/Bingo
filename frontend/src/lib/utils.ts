import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names conditionally and resolves Tailwind class conflicts.
 * @param classes - A list of class names or conditionals.
 * @returns A single, merged class name string.
 */
export function cn(...classes: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(classes));
}
