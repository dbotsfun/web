import { Button, ButtonProps } from "@/components/ui/button";
import { promptLoginWindow } from "@/lib/functions/login";
import * as React from "react";
import DiscordIcon from "../icons/discord";

export default function LoginButton({ ...props }: ButtonProps) {
	return (
		<Button onClick={promptLoginWindow} {...props}>
			<DiscordIcon className="mr-2 w-6 h-6" />
			{props.children ?? "Login"}
		</Button>
	);
}
