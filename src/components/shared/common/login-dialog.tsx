"use client";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import LoginButton from "./login-button";

export default function LoginDialog() {
	const router = useRouter();

	return (
		<div className="h-screen">
			<AlertDialog open>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Unauthorized</AlertDialogTitle>
						<AlertDialogDescription>
							In order to access the following page, login with Discord.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button
							onClick={() => router.push("/")}
							variant={"secondary"}
							className="w-full"
						>
							<HomeIcon className="mr-2 w-5 h-5" /> Return to homepage
						</Button>
						<LoginButton className="w-full">Login with Discord</LoginButton>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
