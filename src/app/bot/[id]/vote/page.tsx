"use client";

// this page is bad af, please dont blame at me I WILL refactor it (someday)

import Loader from "@/components/shared/common/loader";
import LoadingScreen from "@/components/shared/common/loading-screen";
import LoginDialog from "@/components/shared/common/login-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { APIErrorMessages } from "@/lib/api/messages";
import { useBotQuery, useVoteBotMutation, useVoteCheckQuery } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/useSession";
import { avatar } from "@/lib/utils";
import { ArrowLeftIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner"

export default function Page({ params }: { params: { id: string } }) {
    const { data: user, loading } = useSession();
    const { data, error, refetch: botRefetch } = useBotQuery({
        variables: { id: params.id }
    })

    const { data: check, refetch: checkRefetch } = useVoteCheckQuery({
        variables: { id: params.id }
    })
    const [vote, result] = useVoteBotMutation({
        variables: { id: params.id }
    })

    let bot = data?.getBot;
    const hasVoted = check?.voteCheck;
    const isOwner = !!bot?.owners.find(u => u.id === user?.me.user.id)
    const canAccess = bot && bot.status === "APPROVED" || isOwner

    const refresh = () => {
        checkRefetch();
        botRefetch()
    }

    useEffect(() => {
        if (result.called && !result.loading) {
            refresh();
            toast.success(`You voted for ${bot!.name}`);
        }
    }, [result.loading, result.called]);

    if (loading) return <LoadingScreen />;
    if (!user) return <LoginDialog />
    if (!canAccess || error?.message === APIErrorMessages.BOT_NOT_FOUND) return notFound();

    bot = bot!
    return (
        <div className="flex flex-col h-[50vh] justify-center">
            <div className="bg-secondary p-5 rounded-xl border border-accent w-full lg:w-1/2 mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                        <img src={avatar(bot.avatar, bot.id)} alt="avatar" className="w-20 rounded-full ring-offset-1 ring-offset-background ring-ring ring-2" />
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="text-xs font-semibold text-muted-foreground uppercase">{hasVoted ? "Voted" : "Voting"} for...</span>
                            <h1 className="text-2xl font-bold">{bot!.name}</h1>
                            <div className="font-semibold flex items-center gap-1 text-muted-foreground">
                                {bot.votes} <ChevronUpIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                    {loading ? <Loader /> : hasVoted ? null : <Button onClick={() => vote()} size={"lg"}>Vote for {bot!.name}</Button>}
                </div>
                {result.error && <p className="text-destructive mt-2">{result.error.message}</p>}
            </div>
            <Link href={`/bot/${bot!.id}`} className={buttonVariants({ variant: "secondary", className: "w-min mx-auto my-5" })}><ArrowLeftIcon className="w-5 h-5 mr-2" />Return to {bot!.name}</Link>
        </div>
    )
}