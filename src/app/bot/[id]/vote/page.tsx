"use client";

// this page is bad af, please dont blame at me I WILL refactor it (someday)

import Loader from "@/components/shared/common/loader";
import LoadingScreen from "@/components/shared/common/loading-screen";
import LoginDialog from "@/components/shared/common/login-dialog";
import AnimatedNumber from "@/components/ui/animated-number";
import { Button, buttonVariants } from "@/components/ui/button";
import { APIErrorMessages } from "@/lib/api/messages";
import { useBotQuery, useVoteBotMutation, useVoteCheckQuery } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/useSession";
import { avatar, formatMilliseconds } from "@/lib/utils";
import { ArrowLeftIcon, CheckCircleIcon, ChevronUpIcon, ServerIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner"

export default function Page({ params }: { params: { id: string } }) {
    const { data: user, loading } = useSession();
    const { data, error, refetch: botRefetch } = useBotQuery({
        variables: { id: params.id }
    })

    const { data: check, refetch: checkRefetch, loading: checking } = useVoteCheckQuery({
        variables: { id: params.id },
        pollInterval: 60_000
    })
    const [vote, result] = useVoteBotMutation({
        variables: { id: params.id }
    })

    let bot = data?.getBot;
    const hasVoted = check?.voteCheck.voted;
    const isOwner = !!bot?.owners.find(u => u.id === user?.me.user.id)
    const canAccess = bot && bot.status === "APPROVED" || isOwner

    const refresh = () => {
        checkRefetch();
        botRefetch()
    }

    useEffect(() => {
        if (result.called && !result.loading && !result.error) {
            refresh();
            toast.success(`You voted for ${bot!.name}`);
        }

        if (result.error)
            toast.error(result.error.message);

    }, [result.loading, result.called]);

    if (loading) return <LoadingScreen />;
    if (!user) return <LoginDialog />
    if (!canAccess || error?.message === APIErrorMessages.BOT_NOT_FOUND) return notFound();

    bot = bot!
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="max-w-xl flex flex-col items-center w-full">
                <div className="flex flex-col items-center w-full mt-5 md:mx-auto py-7 px-10 rounded-xl bg-card">
                    <div className="flex-col sm:flex-row items-center flex justify-between w-full">
                        <div className="flex flex-col w-full md:w-auto md:items-center md:flex-row">
                            <div className="flex-shrink-0 md:mr-6">
                                <Image src={avatar(bot.avatar, bot.id)} width={96} height={96} alt="avatar" className="w-24 rounded-xl ring-secondary ring-4" />
                            </div>
                            <div className="flex-col flex">
                                <h1 className="mt-3 mb-1 md:mt-0 md:mb-0 text-2xl flex gap-1 items-center font-semibold truncate">
                                    {bot.name} {bot.certified && <CheckCircleIcon className="w-6 text-primary hidden lg:flex" />}
                                </h1>
                                <div className="flex text-sm text-muted-foreground">
                                    <div className="flex items-center mt-2 gap-4">
                                        <div className="flex items-center font-medium">
                                            <ServerIcon className="mr-1 w-4 h-4" />
                                            <AnimatedNumber value={bot.guildCount ?? 0} />
                                        </div>
                                        <div className="flex items-center font-medium">
                                            <ChevronUpIcon className="mr-1 w-4 h-4" />
                                            <AnimatedNumber value={bot.votes} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        <div className="flex flex-col items-center w-full mt-2 rounded-md md:w-auto md:mt-0">
                            <div className="w-full text-center md:w-full">
                                {checking ? <Loader /> : hasVoted ? <p>Wait {formatMilliseconds(check.voteCheck.expires - Date.now())}</p> : <Button onClick={() => vote()} size={"lg"}>Vote now</Button>}
                            </div>
                        </div>
                    </div>
                </div>
                {hasVoted && <div className="flex animate-in fade-in slide-in-from-bottom flex-col w-full mt-5 py-7 px-10 md:mx-auto rounded-xl bg-card">
                    <h3 className="text-xl font-semibold text-card-foreground">Thanks for voting {bot.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Come back tomorrow to vote again!</p>
                </div>}
                <Link href={`/bot/${bot!.id}`} className={buttonVariants({ variant: "link", className: "w-min mx-auto my-5" })}><ArrowLeftIcon className="w-5 h-5 mr-2" />Return to {bot.name}</Link>
            </div>
        </div>
    )
}