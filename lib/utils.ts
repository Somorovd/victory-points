import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeDatabaseData<T>(arr: T[], key: keyof T) {
  const hash: Record<string, T> = {};

  for (let item of arr) {
    hash[item[key] as string] = item;
  }
  return hash;
}
