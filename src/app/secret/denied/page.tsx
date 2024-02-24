"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BotStatus, useApproveBotMutation, usePanelBotsQuery, useRemoveBotMutation } from "@/lib/apollo/types";
import { avatar } from "@/lib/utils";
import { CheckIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
    const { data: denied, loading, refetch } = usePanelBotsQuery({
        variables: {
            status: BotStatus.Denied
        },
        fetchPolicy: "no-cache"
    })

    const [approve, approveResult] = useApproveBotMutation()
    const [remove, removeResult] = useRemoveBotMutation()

    useEffect(() => {
        if (approveResult.called && !approveResult.loading) {
            toast.success(`Approved ${approveResult.data?.approveBot.name}`)
            refetch()
            approveResult.reset()
        }

        if (approveResult.error) toast.error(approveResult.error.message)
    }, [approveResult.called, approveResult.loading])

    useEffect(() => {
        if (removeResult.called && !removeResult.loading && !removeResult.error) {
            toast.success(`Deleted ${removeResult.data?.removeBot.name}`)
            refetch()
            removeResult.reset()
        }

        if (removeResult.error) toast.error(removeResult.error.message)
    }, [removeResult.called, removeResult.loading])
    return loading ? <LoadingScreen /> : denied?.bots.nodes?.length ? <Table>
        <TableCaption>Current denied bots</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {denied.bots.nodes.map((bot) => (
                <TableRow key={bot.id}>
                    <TableCell className="font-medium w-56">
                        <div className="flex flex-row gap-2 items-center">
                            <Avatar>
                                <AvatarImage src={avatar(bot.avatar, bot.id)} />
                            </Avatar>
                            {bot.name}
                        </div>
                    </TableCell>
                    <TableCell>No one</TableCell>
                    <TableCell>Denied</TableCell>
                    <TableCell className="justify-end flex"><div className="flex gap-1 items-center">
                        <Button size={"icon"} variant={"secondary"} onClick={() => approve({ variables: { approveBotId: bot.id } })}>
                            <CheckIcon className="w-5 h-5" />
                        </Button>
                        <Button variant={"secondary"} size={"icon"} onClick={() => remove({ variables: { id: bot.id } })}>
                            <TrashIcon className="w-5 h-5" />
                        </Button>
                    </div></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table> : <div className="flex flex-col h-full items-center justify-center">
        No denied bots
    </div>
}