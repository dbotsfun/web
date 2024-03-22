"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
} from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRemoveBotMutation } from "@/lib/apollo/types";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface BotDangerZoneProps {
	id: string;
	name: string;
}

export default function BotDangerZone({ id, name }: BotDangerZoneProps) {
	const router = useRouter();
	const [confirmName, setConfirmName] = useState<string | null>();
	const [remove, { loading }] = useRemoveBotMutation({
		variables: {
			id,
		},
		onCompleted: (data) => {
			toast.success(`Successfully removed ${data.removeBot.name}`)
			router.push("/");
		},
		onError: (error) => toast.error(error.message),
		update: (cache) => { // remove cache lollll
			const normalizedId = cache.identify({ id, __typename: "BotObject" });
			cache.evict({ id: normalizedId });
			cache.gc();
		},
	});
	return (
		<Card className="border-destructive bg-destructive/10 text-destructive">
			<CardHeader>
				<CardTitle>Danger zone</CardTitle>
			</CardHeader>
			<CardContent>
				<Credenza onOpenChange={() => setConfirmName(null)}>
					<CredenzaTrigger asChild>
						<Button variant={"destructive"}>
							<TrashIcon className="w-5 mr-2" />
							Remove {name}
						</Button>
					</CredenzaTrigger>
					<CredenzaContent>
						<CredenzaHeader>
							<CredenzaTitle>Are you absolutely sure?</CredenzaTitle>
							<CredenzaDescription>
								This will remove {name} and all it's information (votes, guild count, etc...)
							</CredenzaDescription>
						</CredenzaHeader>
						<CredenzaBody>
							<Label htmlFor="confirmName">Type "{name}" to continue</Label>
							<Input
								id="confirmName"
								placeholder={name}
								onChange={(e) => setConfirmName(e.target.value)}
							/>
						</CredenzaBody>
						<CredenzaFooter>
							<CredenzaClose asChild>
								<Button variant={"outline"}>Cancel</Button>
							</CredenzaClose>
							<Button
								disabled={
									loading || confirmName !== name
								}
								onClick={() => remove()}
							>
								Continue
							</Button>
						</CredenzaFooter>
					</CredenzaContent>
				</Credenza>
			</CardContent>
		</Card>
	);
}
