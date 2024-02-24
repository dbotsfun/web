"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BotStatus, useDenyBotMutation, usePanelBotsQuery, useRemoveBotMutation } from "@/lib/apollo/types";
import { avatar } from "@/lib/utils";
import { TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const { data: approved, loading, refetch } = usePanelBotsQuery({
        variables: {
            status: BotStatus.Approved
        },
        fetchPolicy: "no-cache"
    })

    const [deny, denyResult] = useDenyBotMutation()
    const [remove, removeResult] = useRemoveBotMutation()
    const [denyReason, setDenyReason] = useState<string>("")

    useEffect(() => {
        if (denyResult.called && !denyResult.loading && !denyResult.error) {
            toast.success(`Denied ${denyResult.data?.rejectBot.name}`)
            refetch()
            denyResult.reset()
        }

        if (denyResult.error) toast.error(denyResult.error.message)
    }, [denyResult.called, denyResult.loading])

    useEffect(() => {
        if (removeResult.called && !removeResult.loading && !removeResult.error) {
            toast.success(`Deleted ${removeResult.data?.removeBot.name}`)
            refetch()
            removeResult.reset()
        }

        if (removeResult.error) toast.error(removeResult.error.message)
    }, [removeResult.called, removeResult.loading])
    return loading ? <LoadingScreen /> : approved?.bots.nodes?.length ? <Table>
        <TableCaption>Current approved bots</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {approved.bots.nodes.map((bot) => (
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
                    <TableCell>Approved</TableCell>
                    <TableCell className="justify-end flex"><div className="flex gap-1 items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={"secondary"} size={"icon"}>
                                    <XMarkIcon className="w-5 h-5" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Reject {bot.name}</DialogTitle>
                                    <DialogDescription>
                                        Enter the reason below
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="reason" className="text-right">
                                            Reason
                                        </Label>
                                        <Input
                                            onChange={(e) => setDenyReason(e.currentTarget.value)}
                                            id="reason"
                                            placeholder="E.g: Bot has no commands lol"
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button onClick={() => deny({
                                            variables: {
                                                input: {
                                                    id: bot.id,
                                                    reason: denyReason
                                                }
                                            }
                                        })} type="submit">Deny</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button variant={"secondary"} size={"icon"} onClick={() => remove({ variables: { id: bot.id } })}>
                            <TrashIcon className="w-5 h-5" />
                        </Button>
                    </div></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table> : <div className="flex flex-col h-full items-center justify-center">
        No approved bots
    </div>
}