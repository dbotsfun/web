"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BotStatus, useApproveBotMutation, useDenyBotMutation, usePanelBotsQuery, useRemoveBotMutation } from "@/lib/apollo/types";
import { avatar } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { ArrowLeftIcon, CheckIcon, Trash2Icon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const { data: pending, loading, refetch } = usePanelBotsQuery({
        variables: {
            status: BotStatus.Pending
        }
    })

    const [approve, approveResult] = useApproveBotMutation()
    const [deny, denyResult] = useDenyBotMutation()
    const [remove, removeResult] = useRemoveBotMutation()
    const [denyReason, setDenyReason] = useState<string>("")

    useEffect(() => {
        if (approveResult.called && !approveResult.loading) {
            toast.success(`Approved ${approveResult.data?.approveBot.name}`)
            refetch()
            approveResult.reset()
        }
    }, [approveResult.called, approveResult.loading])

    useEffect(() => {
        if (denyResult.called && !denyResult.loading) {
            toast.success(`Denied ${denyResult.data?.rejectBot.name}`)
            refetch()
            denyResult.reset()
        }
    }, [denyResult.called, denyResult.loading])

    useEffect(() => {
        if (removeResult.called && !removeResult.loading) {
            toast.success(`Deleted ${removeResult.data?.removeBot.name}`)
            refetch()
            removeResult.reset()
        }
    }, [removeResult.called, removeResult.loading])
    return (
        <div className="flex flex-col gap-3">
            <Card>
                <CardHeader>
                    <Link href="/secret" className="text-xs uppercase font-bold text-muted-foreground flex items-center"><ArrowLeftIcon className="mr-2 w-4 h-4" /> Back</Link>
                    <CardTitle>Pending bots</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? <LoadingScreen /> : (
                        <div className="flex flex-col gap-3">
                            {pending?.bots.nodes?.length ? pending.bots.nodes.map(bot => <div className="flex w-full justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <img src={avatar(bot.avatar, bot.id)} alt="bot" className="rounded-full ring ring-accent w-9 h-9" />
                                    <p>{bot.name}</p>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <Button size={"icon"} onClick={() => approve({ variables: { approveBotId: bot.id } })}>
                                        <CheckIcon className="w-5 h-5" />
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant={"secondary"} size={"icon"}>
                                                <XIcon className="w-5 h-5" />
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
                                    <Button variant={"destructive"} size={"icon"} onClick={() => remove({ variables: { id: bot.id } })}>
                                        <Trash2Icon className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>) : <p>No pending bots</p>}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}