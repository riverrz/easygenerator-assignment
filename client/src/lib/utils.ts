import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const containsLowercaseLetter = (chars: string) => /[a-z]/g.test(chars);
export const containsUppercaseLetter = (chars: string) => /[A-Z]/g.test(chars);

export const containsNumber = (chars: string) => /\d/g.test(chars);

export const containsSpecialCharacter = (chars: string) =>
  /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/g.test(chars);
