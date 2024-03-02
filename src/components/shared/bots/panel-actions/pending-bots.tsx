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
        if (approved.called && !approved.error) toast.success(`Approved ${approved.data?.approveBot.name}`)
        if (approved.error) toast.error(approved.error.message)
    }, [approved])

    useEffect(() => {
        if (denied.called && !denied.error) toast.success(`Denied ${denied.data?.rejectBot.name}`)
        if (denied.error) toast.error(denied.error.message)
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