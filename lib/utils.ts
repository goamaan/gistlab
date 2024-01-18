import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const base64ToString = (str: any) =>
    typeof str === "string"
        ? Buffer.from(str || "", "base64").toString("utf-8")
        : str
