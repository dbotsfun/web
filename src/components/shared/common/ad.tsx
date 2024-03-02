import { Badge } from "@/components/ui/badge";

export default function Ad() {
	return (
		<div className="flex flex-col text-start justify-center w-full items-center">
			<div className="w-full rounded-xl bg-secondary flex items-center justify-center h-24">
				<span className="font-semibold text-muted-foreground">
					discord<strong>bots</strong>
				</span>
				<Badge className="ml-2 bg-amber-400 hover:bg-amber-400">Ad</Badge>
			</div>
		</div>
	);
}
