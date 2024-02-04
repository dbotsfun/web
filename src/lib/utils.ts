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

export type AvatarSizes = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;