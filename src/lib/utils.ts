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

export function formatMilliseconds(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedHours = hours > 0 ? `${hours}h ` : '';
  const formattedMinutes = minutes % 60 > 0 ? `${minutes % 60}m ` : '';
  const formattedSeconds = seconds % 60 > 0 ? `${seconds % 60}s` : '';

  return formattedHours + formattedMinutes + formattedSeconds;
}

export type AvatarSizes = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;