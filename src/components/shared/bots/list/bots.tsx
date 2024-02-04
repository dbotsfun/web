import { BotObject } from "@/lib/apollo/types/graphql";
import Card from "../cards/normal";

interface BotsProps {
    bots: BotObject[];
}

export default function Bots({ bots }: BotsProps) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 base:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-4">
        {bots.map((bot, key) => <Card key={key} {...bot} />)}
    </div>
}