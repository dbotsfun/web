"use client";

import Loader from "@/components/shared/common/loader";
import LoadingScreen from "@/components/shared/common/loading-screen";
import Policy from "@/components/shared/policy";
import { Button, buttonVariants } from "@/components/ui/button";
import { VOTE_BOT } from "@/lib/apollo/mutations/bots";
import { GET_BOT, VOTE_CHECK } from "@/lib/apollo/queries/bots";
import { Mutation, Query } from "@/lib/apollo/types/graphql";
import { useSession, withAuth } from "@/lib/hooks/useSession";
import { avatar } from "@/lib/utils";
import { useMutation, useQuery } from "@apollo/client";
import { ArrowLeftIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { toast } from "sonner"

export default function Page({ params }: { params: { id: string } }) {
    const cookies = parseCookies()
    const { data: auth, loading } = useSession(cookies)
    const { data, error, refetch } = useQuery<Query>(GET_BOT, {
        variables: {
            id: params.id
        }
    })

    const bot = data?.bot

    const { data: voteCheck, refetch: reloadCheck } = useQuery<Query>(VOTE_CHECK, {
        ...withAuth(cookies.session),
        variables: {
            id: params.id
        }
    })
    const [vote, result] = useMutation<Mutation>(VOTE_BOT, {
        ...withAuth(cookies.session),
        variables: {
            id: params.id
        }
    })

    const hasVoted = voteCheck?.voteCheck
    const userIsOwner = !!auth?.me.user.id && !!bot?.owners.find(x => x.id === auth?.me.user.id)

    useEffect(() => {
        if (result.called && !result.loading) {
            reloadCheck()
            refetch()
            toast(`You voted ${bot!.name}! 🎉`)
        }
    }, [result.loading, result.called])

    if (loading && !bot || loading) return <LoadingScreen />
    if (error?.message === "Bot not found" || ["DENIED", "PENDING"].includes(bot?.status!) && !userIsOwner || !bot && !loading) return notFound()
    if (error) return <>server error</>;
    return (
        <div className="flex flex-col h-[50vh] justify-center">
            <div className="bg-secondary p-5 rounded-xl border border-accent w-full lg:w-1/2 mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                        <img src={avatar(bot!.avatar, bot!.id)} alt="avatar" className="w-20 rounded-full ring-offset-1 ring-offset-background ring-ring ring-2" />
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="text-xs font-semibold text-muted-foreground uppercase">Voting for...</span>
                            <h1 className="text-2xl font-bold">{bot!.name}</h1>
                            <div className="font-semibold flex items-center gap-1 text-muted-foreground">
                                {bot!.votes} <ChevronUpIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                    {loading ? <Loader /> : <Policy fallback={<Button size={"lg"}>Login with Discord</Button>} policy={!!auth}>
                        {hasVoted ? <Button disabled aria-disabled>Come back later</Button> : <Button onClick={() => vote()} size={"lg"}>Vote for {bot!.name}</Button>}
                    </Policy>}
                </div>
                {result.error && <p className="text-destructive mt-2">{result.error.message}</p>}
            </div>
            <Link href={`/bot/${bot!.id}`} className={buttonVariants({ variant: "secondary", className: "w-min mx-auto my-5" })}><ArrowLeftIcon className="w-5 h-5 mr-2" />Return to {bot!.name}</Link>
        </div>
    )
}