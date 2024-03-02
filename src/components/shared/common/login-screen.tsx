import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import LoginButton from "./login-button";

export default function LoginScreen() {
	const router = useRouter();

	return (
		<div className="flex flex-col h-[70vh] justify-center">
			<Card className="w-1/3 mx-auto">
				<CardHeader>
					<CardTitle>Unauthorized</CardTitle>
					In order to access the following page, login with Discord.
				</CardHeader>
				<CardContent>
					<div className="flex flex-row gap-2 w-full">
						<Button
							onClick={() => router.push("/")}
							variant={"secondary"}
							className="w-full"
						>
							<HomeIcon className="mr-2 w-5 h-5" /> Return to homepage
						</Button>
						<LoginButton className="w-full">Login with Discord</LoginButton>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
