import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isBase64Image = (value: string) => {
  var regex = /^data:image\/([a-zA-Z]*);base64,([^\"]*)/;
  return regex.test(value);
};
