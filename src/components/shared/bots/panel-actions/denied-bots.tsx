import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
        if (approved.called && !approved.error) toast.success(`Denied ${approved.data?.approveBot.name}`)
        if (approved.error) toast.error(approved.error.message)
    }, [approved])
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"secondary"} size={"icon"}>
                <EllipsisHorizontalIcon className='w-4 h-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => approve({ variables: { approveBotId: id } })}>Deny</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}