import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDenyBotMutation } from "@/lib/apollo/types";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { toast } from "sonner";

interface ApprovedBotsActionsProps {
	id: string;
}

export default function ApprovedBotsActions({ id }: ApprovedBotsActionsProps) {
	const [deny, denied] = useDenyBotMutation();

	useEffect(() => {
		if (denied.called && !denied.error)
			toast.success(`Denied ${denied.data?.rejectBot.name}`);
		if (denied.error) toast.error(denied.error.message);
	}, [denied]);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"secondary"} size={"icon"}>
					<EllipsisHorizontalIcon className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() =>
						deny({ variables: { input: { id, reason: "Denied from panel" } } })
					}
				>
					Deny
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
