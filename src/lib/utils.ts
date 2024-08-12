import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const DATA_PREFIX = "tikeetiX::";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveItem<T>(key: string, value: T) {
  if (typeof window !== "undefined") {
    localStorage.setItem(`${DATA_PREFIX}${key}`, JSON.stringify(value));
  }
}

export function getItem<T>(key: string) {
  if (typeof window !== "undefined") {
    const got = localStorage.getItem(`${DATA_PREFIX}${key}`);
    return got ? (JSON.parse(got) as T) : null;
  }
}

export function removeItem(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(`${DATA_PREFIX}${key}`);
  }
}

export const one_number = /\d+/;
export const one_alphabet = /^(?=.*[a-zA-Z]).+$/;
export const upper_lowercase = /(?=.*[a-z])(?=.*[A-Z])/;
export const special_character = /^(?=.*[!@#$%^&*()\-_=+{}[\]:;<>,.?/~])\S{8,}$/;