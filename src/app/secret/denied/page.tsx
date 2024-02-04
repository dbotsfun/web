"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APPROVE_BOT, DELETE_BOT } from "@/lib/apollo/mutations/bots";
import { GET_PANEL_BOTS } from "@/lib/apollo/queries/bots";
import { Mutation, Query } from "@/lib/apollo/types/graphql";
import { withAuth } from "@/lib/hooks/useSession";
import { avatar } from "@/lib/utils";
import { useMutation, useQuery } from "@apollo/client";
import { ArrowLeftIcon, CheckIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
    const { data: pending, loading, refetch } = useQuery<Query>(GET_PANEL_BOTS, {
        ...withAuth(parseCookies().session),
        variables: {
            status: "Denied"
        }
    })

    const [approve, approveResult] = useMutation<Mutation>(APPROVE_BOT, {
        ...withAuth(parseCookies().session)
    })
    const [remove, removeResult] = useMutation<Mutation>(DELETE_BOT, {
        ...withAuth(parseCookies().session),
    })

    useEffect(() => {
        if (approveResult.called && !approveResult.loading) {
            toast(`Approved ${approveResult.data?.approveBot.name} successfully.`)
            refetch()
            approveResult.reset()
        }
    }, [approveResult.called, approveResult.loading])

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
                                    <Button size={"icon"} onClick={() => approve({ variables: { id: bot.id } })}>
                                        <CheckIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant={"destructive"} size={"icon"} onClick={() => remove({ variables: { id: bot.id } })}>
                                        <Trash2Icon className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>) : <p>No rejected bots</p>}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}