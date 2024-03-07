import { BotCardProps } from "@/lib/types/bots";
import Card from "../../cards/bot";
import BotReducedCard from "../../cards/bot-reduced";

interface BotsProps {
	bots: BotCardProps[];
	reduced?: boolean;
}

export default function Bots({ bots, reduced }: BotsProps) {
	return bots.map((bot, key) => reduced ? <BotReducedCard key={key} {...bot} /> : <Card key={key} {...bot} />);
}
