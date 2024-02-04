"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DELETE_BOT, REJECT_BOT } from "@/lib/apollo/mutations/bots";
import { GET_PANEL_BOTS } from "@/lib/apollo/queries/bots";
import { Mutation, Query } from "@/lib/apollo/types/graphql";
import { withAuth } from "@/lib/hooks/useSession";
import { avatar } from "@/lib/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Label } from "@radix-ui/react-label";
import { ArrowLeftIcon, Trash2Icon, XIcon } from "lucide-react";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const { data: pending, loading, refetch } = useQuery<Query>(GET_PANEL_BOTS, {
        ...withAuth(parseCookies().session),
        variables: {
            status: "Approved"
        }
    })

    const [reject, rejectResult] = useMutation<Mutation>(REJECT_BOT, {
        ...withAuth(parseCookies().session),
    })
    const [remove, removeResult] = useMutation<Mutation>(DELETE_BOT, {
        ...withAuth(parseCookies().session),
    })

    const [rejectReason, setRejectReason] = useState<string | null>()

    useEffect(() => {
        if (rejectResult.called && !rejectResult.loading) {
            toast(`Rejected ${rejectResult.data?.rejectBot.name} successfully.`)
            refetch()
            rejectResult.reset()
        }
    }, [rejectResult.called, rejectResult.loading])

    useEffect(() => {
        if (removeResult.called && !removeResult.loading) {
            toast(`Deleted ${removeResult.data?.deleteBot.name} successfully.`)
            refetch()
            removeResult.reset()
        }
    }, [removeResult.called, removeResult.loading])
    return (
        <div className="flex flex-col gap-3">
            <Card>
                <CardHeader>
                    <Link href="/secret" className="text-xs uppercase font-bold text-muted-foreground flex items-center"><ArrowLeftIcon className="mr-2 w-4 h-4" /> Back</Link>
                    <CardTitle>Approved bots</CardTitle>
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
                                                        onChange={(e) => setRejectReason(e.currentTarget.value)}
                                                        id="reason"
                                                        placeholder="E.g: Bot has no commands lol"
                                                        className="col-span-3"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button onClick={() => reject({ variables: { id: bot.id, reason: rejectReason } })} type="submit">Reject</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant={"destructive"} size={"icon"} onClick={() => remove({ variables: { id: bot.id } })}>
                                        <Trash2Icon className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>) : <p>No approved bots</p>}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}