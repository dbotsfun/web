import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BotWebhooks() {
	return (
		<Card aria-disabled className="opacity-50">
			<CardHeader>
				<CardTitle>Webhooks</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-5">
					<div>
						<Label>URL</Label>
						<Input disabled aria-disabled placeholder="Webhook URL" />
					</div>
					<div>
						<Label>Secret</Label>
						<Input disabled aria-disabled placeholder="Client secret" />
					</div>
				</div>
				<Button className="mt-5">Save</Button>
			</CardContent>
		</Card>
	);
}
