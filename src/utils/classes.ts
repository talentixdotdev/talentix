import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges CSS class names using clsx and tailwind-merge.
 * This utility function helps manage conditional classes and resolves
 * Tailwind CSS conflicts.
 *
 * @param inputs - Array of class names, objects, or arrays (ClassValue[])
 * @returns string - Merged class names string with resolved Tailwind conflicts
 *
 * @example
 * // Basic usage
 * cn('px-2', 'py-1') // returns "px-2 py-1"
 *
 * // With conditionals
 * cn('btn', isActive && 'btn-active') // returns "btn btn-active" or "btn"
 *
 * // With Tailwind conflicts
 * cn('px-2 py-1', 'px-4') // returns "py-1 px-4" (px-4 takes precedence)
 *
 * // With object syntax
 * cn({
 *   'btn-primary': isPrimary,
 *   'btn-secondary': !isPrimary
 * })
 */
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export { cn };
