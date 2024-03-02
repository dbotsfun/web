import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApproveBotMutation } from "@/lib/apollo/types";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { toast } from "sonner";

interface DeniedBotsActionsProps {
	id: string;
}

export default function DeniedBotsActions({ id }: DeniedBotsActionsProps) {
	const [approve, approved] = useApproveBotMutation();

	useEffect(() => {
		if (approved.error) toast.error(approved.error.message);
		if (approved.called && approved.data)
			toast.success(`Approved ${approved.data?.approveBot.name}`);
	}, [approved]);
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
					onClick={() => approve({ variables: { approveBotId: id } })}
				>
					Approve
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
