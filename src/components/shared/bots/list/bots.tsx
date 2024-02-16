import Card from "../cards/normal";

interface BotsProps {
    bots: {
        id: string;
        name: string;
        avatar?: string | null | undefined;
        certified: boolean;
        shortDescription?: string | null | undefined;
        tags: string[];
        votes: number;
        guildCount?: number;
    }[];
}

export default function Bots({ bots }: BotsProps) {
    return bots.map((bot, key) => <Card key={key} {...bot} />)
}