"use client";

import Tags from "@/components/shared/bots/list/tags"
import Ad from "@/components/shared/common/ad";
import LoadingScreen from "@/components/shared/common/loading-screen";
import MD from "@/components/shared/common/md"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DELETE_BOT } from "@/lib/apollo/mutations/bots";
import { GET_BOT } from "@/lib/apollo/queries/bots"
import { Mutation, Query } from "@/lib/apollo/types/graphql"
import { useSession, withAuth } from "@/lib/hooks/useSession";
import { avatar } from "@/lib/utils"
import { useMutation, useQuery } from "@apollo/client"
import { AlertTriangleIcon, ChevronUpIcon, ClipboardCheckIcon, ClipboardIcon, EyeIcon, EyeOffIcon, InfoIcon, MessageCircleMoreIcon, MessageCircleOffIcon, PlusIcon, Settings2Icon, SlashSquareIcon } from "lucide-react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

export default function Page({ params }: { params: { id: string } }) {
    const [viewKey, setViewKey] = useState(false)
    const [copied, copy] = useCopyToClipboard()
    const router = useRouter()

    const { data: user } = useSession(parseCookies())
    const { data, loading, error } = useQuery<Query>(GET_BOT, {
        variables: {
            id: params.id
        }
    })
    const [deleteBot, result] = useMutation<Mutation>(DELETE_BOT, {
        ...withAuth(parseCookies().session),
        variables: {
            id: params.id
        }
    })

    const bot = data?.bot
    const userIsOwner = !!user?.me.user.id && !!bot?.owners.find(x => x.id === user?.me.user.id)

    useEffect(() => {
        if (result.called && !result.loading) {
            toast(`You deleted ${bot!.name}.`)
            router.push("/")
        }
    }, [result.called, result.loading])

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
                    <Link href="/" className={buttonVariants({ size: "lg", className: "w-full lg:w-min" })}><PlusIcon className="w-5 h-5 mr-2" />Invite</Link>
                    <Link href={`/bot/${bot.id}/vote`} className={buttonVariants({ size: "lg", variant: "secondary", className: "w-full lg:w-min" })}><ChevronUpIcon className="w-5 h-5 mr-2" />Vote</Link>
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-between gap-24">
                <Tabs orientation="horizontal" defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview"><InfoIcon className="w-4 h-4 mr-2" />Overview</TabsTrigger>
                        <TabsTrigger value="commands"><SlashSquareIcon className="w-4 h-4 mr-2" />Commands</TabsTrigger>
                        <TabsTrigger value="reviews"><MessageCircleMoreIcon className="w-4 h-4 mr-2" />Reviews</TabsTrigger>
                        {userIsOwner && <TabsTrigger value="manage"><Settings2Icon className="w-4 h-4 mr-2" />Manage</TabsTrigger>}
                    </TabsList>
                    <TabsContent value="overview" className="max-w-xl">
                        <MD content={bot.description!} />
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
                    {userIsOwner && <TabsContent value="manage" className="flex flex-col gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Developer panel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Label>API Key</Label>
                                <div className="flex gap-2 items-center">
                                    <Input aria-readonly readOnly type={!viewKey ? "password" : "text"} className="max-w-72" defaultValue={bot.apiKey ?? ""} />
                                    <Button variant={"secondary"} size={"icon"} onClick={() => setViewKey(!viewKey)}>{viewKey ? <EyeOffIcon /> : <EyeIcon />}</Button>
                                    <Button variant={copied.value ? "default" : "secondary"} size={"icon"} onClick={() => copy(bot.apiKey ?? "")}>{copied.value ? <ClipboardCheckIcon /> : <ClipboardIcon />}</Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Webhooks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <Label>URL</Label>
                                        <Input placeholder="Webhook URL" />
                                    </div>
                                    <div>
                                        <Label>Secret</Label>
                                        <Input placeholder="Client secret" />
                                    </div>
                                </div>
                                <Button className="mt-5">Save</Button>
                            </CardContent>
                        </Card>
                        <Card className="border-destructive bg-destructive/10 text-destructive">
                            <CardHeader>
                                <CardTitle>Danger zone</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button disabled={result.called || result.loading} onClick={() => deleteBot()} variant={"destructive"}>Delete {bot.name}</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>}
                </Tabs>
                <div className="w-1/3 flex flex-col justify-between sticky">
                    <div className="flex flex-col gap-3 h-80 sticky">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-black">Information</h1>
                            <div className="flex flex-row justify-between">
                                <h1 className="text-base font-bold text-secondary-foreground">Prefix</h1>
                                <h1 className="text-base font-normal text-muted-foreground">{bot.prefix}</h1>
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