"use client";

import Tags from "@/components/shared/bots/list/tags"
import BotDangerZone from "@/components/shared/bots/sections/panel/danger";
import BotDeveloper from "@/components/shared/bots/sections/panel/developer";
import BotWebhooks from "@/components/shared/bots/sections/panel/webhooks";
import Ad from "@/components/shared/common/ad";
import LoadingScreen from "@/components/shared/common/loading-screen";
import Policy from "@/components/shared/policy";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApiKeyLazyQuery, useBotQuery } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/useSession";
import { avatar } from "@/lib/utils"
import { AlertTriangleIcon, ChevronUpIcon, FlagIcon, InfoIcon, MessageCircleMoreIcon, MessageCircleOffIcon, MoreHorizontalIcon, PlusIcon, Settings2Icon, SlashSquareIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
    const { data: user } = useSession()
    const { data, loading, error } = useBotQuery({
        variables: {
            id: params.id
        }
    })
    const [getApiKey, apiKey] = useApiKeyLazyQuery({
        variables: {
            input: {
                id: params.id
            }
        }
    })

    const bot = data?.bot
    const isOwner = !!bot?.owners.find(u => u.id === user?.me.user.id)

    useEffect(() => {
        if (isOwner) getApiKey()
    }, [isOwner])

    if (loading) return <LoadingScreen />
    if (error?.message === "Bot not found" || !bot) return notFound()
    if (error) return <>server error</>;
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 lg:flex-row w-full justify-between items-center py-5">
                <div className="flex flex-col lg:flex-row gap-5 items-center">
                    <img src={avatar(bot.avatar, bot.id)} alt="avatar" className="w-24 rounded-full ring-offset-1 ring-offset-background ring-ring ring-2" />
                    <div className="flex flex-col lg:items-start items-center gap-1">
                        <h1 className="mr-3 md:text-3xl text-2xl font-semibold">
                            {bot.name} <Badge className="bg-gradient-to-r text-white group from-purple-500 h-6 to-indigo-500"><img alt="dlist.gg" src="/ext/dlistgg.svg" className="h-4 w-4 group-hover:mr-2 duration-150" />
                                <p className="group-hover:flex hidden">Imported from dlist.gg</p>
                            </Badge>
                        </h1>
                        <p className="text-muted-foreground lg:text-start text-center">{bot.shortDescription}</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-min">
                    <Link href={bot.inviteLink ?? "/"} className={buttonVariants({ size: "lg", className: "w-full lg:w-min" })}><PlusIcon className="w-5 h-5 mr-2" />Invite</Link>
                    <Link href={`/bot/${bot.id}/vote`} className={buttonVariants({ size: "lg", variant: "secondary", className: "w-full lg:w-min" })}><ChevronUpIcon className="w-5 h-5 mr-2" />Vote</Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"secondary"} className="h-11 w-11" size={"icon"}>
                                <MoreHorizontalIcon className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Extra options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:!bg-destructive hover:!text-destructive-foreground"><FlagIcon fill="currentColor" className="w-4 h-4 mr-2" />Report {bot.name}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-between gap-24">
                <Tabs orientation="horizontal" defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview"><InfoIcon className="w-4 h-4 mr-2" />Overview</TabsTrigger>
                        <TabsTrigger value="commands"><SlashSquareIcon className="w-4 h-4 mr-2" />Commands</TabsTrigger>
                        <TabsTrigger value="reviews"><MessageCircleMoreIcon className="w-4 h-4 mr-2" />Reviews</TabsTrigger>
                        <Policy policy={isOwner}><TabsTrigger value="manage"><Settings2Icon className="w-4 h-4 mr-2" />Manage</TabsTrigger></Policy>
                    </TabsList>
                    <TabsContent value="overview" className="">
                        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: i dont give a fuck */}
                        <div dangerouslySetInnerHTML={{ __html: bot.description! }} />
                    </TabsContent>
                    <TabsContent value="commands">
                        <Alert variant={"destructive"}>
                            <AlertTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Oops...</AlertTitle>
                            <AlertDescription>
                                This section is under development at the moment, come back later!
                            </AlertDescription>
                        </Alert>
                    </TabsContent>
                    <TabsContent value="reviews">
                        <div className="h-56 flex flex-col justify-center">
                            <div className="flex flex-col gap-3 w-max mx-auto">
                                <div className="flex w-min mx-auto items-center justify-center p-5 rounded-full bg-accent">
                                    <MessageCircleOffIcon className="text-accent-foreground w-6 h-6" />
                                </div>
                                <p className="text-muted-foreground">No reviews at the moment</p>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="manage" className="flex flex-col gap-4">
                        <BotDeveloper apiKey={apiKey.data?.getAPIKey} />
                        <BotWebhooks />
                        <BotDangerZone name={bot.name} id={bot.id} />
                    </TabsContent>
                </Tabs>
                <div className="w-1/3 flex flex-col justify-between sticky">
                    <div className="flex flex-col gap-3 h-80 sticky">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-black">Information</h1>
                            <div className="flex flex-row justify-between">
                                <h1 className="text-base font-bold text-secondary-foreground">Prefix</h1>
                                <h1 className="text-base font-normal text-muted-foreground">{bot.prefix ?? <Badge>Only slashes</Badge>}</h1>
                            </div>
                            <div className="flex flex-row justify-between">
                                <h1 className="text-base font-bold text-secondary-foreground">Votes</h1>
                                <h1 className="text-base font-normal text-muted-foreground">{bot.votes}</h1>
                            </div>
                            <div className="flex flex-row justify-between">
                                <h1 className="text-base font-bold text-secondary-foreground">Guilds</h1>
                                <h1 className="text-base font-normal text-muted-foreground">{bot.guildCount ?? "Not provided"}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-black">Tags</h1>
                            <div className="flex flex-row gap-2">
                                <Tags tags={bot.tags} />
                            </div>
                        </div>
                    </div>
                    <Ad />
                </div>
            </div>
        </div>
    )
}