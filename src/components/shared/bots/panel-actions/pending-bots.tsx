import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useApproveBotMutation, useDenyBotMutation } from "@/lib/apollo/types";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { toast } from "sonner";

interface PendingBotsActionsProps {
    id: string;
}

export default function PendingBotsActions({ id }: PendingBotsActionsProps) {
    const [approve, approved] = useApproveBotMutation();
    const [deny, denied] = useDenyBotMutation()

    useEffect(() => {
        if (approved.error) toast.error(approved.error.message)
        if (approved.called && approved.data) toast.success(`Approved ${approved.data?.approveBot.name}`)
    }, [approved])

    useEffect(() => {
        if (denied.error) toast.error(denied.error.message)
        if (denied.called && denied.data) toast.success(`Denied ${denied.data?.rejectBot.name}`)
    }, [denied])
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"secondary"} size={"icon"}>
                <EllipsisHorizontalIcon className='w-4 h-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => approve({ variables: { approveBotId: id } })}>Approve</DropdownMenuItem>
            <DropdownMenuItem onClick={() => deny({ variables: { input: { id, reason: "Denied from panel" } } })}>Deny</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}