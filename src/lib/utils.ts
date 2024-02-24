import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function avatar(
  avatar: string | null | undefined,
  id: string,
  size?: AvatarSizes
) {
  return avatar
    ? `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=${size ?? 1024}`
    : "https://cdn.discordapp.com/embed/avatars/2.png";
}

export function formatMilliseconds(ms: number) {
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? Number(`0${hours}`) : hours;
  minutes = (minutes < 10) ? Number(`0${minutes}`) : minutes;

  return `${hours}h ${minutes}m`;
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export type AvatarSizes = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;