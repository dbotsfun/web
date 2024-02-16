import { BotCardProps } from "@/lib/types/bots";
import Card from "../cards/normal";

interface BotsProps {
    bots: BotCardProps[];
}

export default function Bots({ bots }: BotsProps) {
    return bots.map((bot, key) => <Card key={key} {...bot} />)
}