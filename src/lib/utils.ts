import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { COUNTRIESFLAG, SYMBOL } from "./constants";

const DATA_PREFIX = "tikeetiX::";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
export const special_character =
  /^(?=.*[!@#$%^&*()\-_=+{}[\]:;<>,.?/~])\S{8,}$/;

export const getFlag = (name: string) => {
  let flag = "";
  COUNTRIESFLAG.forEach((element) => {
    if (element?.name?.toLowerCase() === name?.toLowerCase()) {
      flag = element?.flag ?? "";
    }
  });

  return flag;
};

export function getSymbolFromCurrency(
  currencyCode: string
): string | undefined {
  if (typeof currencyCode !== "string") {
    return undefined;
  }

  const code = currencyCode.toUpperCase();

  if (!Object.prototype.hasOwnProperty.call(SYMBOL, code)) {
    return undefined;
  }

  return SYMBOL[code]!;
}

export function __flatten<T>(data: T) {
  if (data && Array.isArray(data)) {
    return data.map((res) => res?.data || {}).flat();
  }
}

export function generateRandomId() {
  return (
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  );
}

export function ticketRoutes(id?: string) {
  return [
    "/events",
    "/movies",
    "/transportation",
    "/create-event",
    "/create-movie",
    `/movie-details/${id}`,
    `/event-details/${id}`,
    `/edit-movie/${id}`,
  ];
}

export function routesWithoutHeader(id?: string) {
  return [
    "/create-event",
    "/create-movie",
    `/edit-movie/${id}`,
    `/movie-details/${id}`,
    `/event-details/${id}`,
    `/edit-event/${id}`,
  ];
}
