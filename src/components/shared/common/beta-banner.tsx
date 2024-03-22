"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HandRaisedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useLocalStorage } from "react-use";

export default function BetaBanner() {
	const [betaBanner, setBetaBanner] = useLocalStorage("beta-banner-2", 0);
	return (
		<AlertDialog open={betaBanner === 0}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<HandRaisedIcon className="w-8 h-8 text-primary" />
					<AlertDialogTitle>Important! Read before continuing</AlertDialogTitle>
					<AlertDialogDescription>
						DiscordBots is currently in beta so you might face some bugs, if you
						see something wrong please notify us asap.
						<br />
						<br />
						We also encourage users to <Link href="/api/redirect?s=dc">join our Discord server</Link> before adding a bot or just to support us :)
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={() => setBetaBanner(1)}>
						It's ok
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
