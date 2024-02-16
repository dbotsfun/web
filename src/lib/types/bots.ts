export interface BotCardProps {
    id: string;
    name: string;
    avatar?: string | null | undefined;
    certified: boolean;
    shortDescription?: string | null | undefined;
    tags: string[];
    votes: number;
    guildCount?: number;
}