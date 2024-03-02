"use client";

import Bots from "@/components/shared/bots/list/bots";
import LoadingScreen from "@/components/shared/common/loading-screen";
import Policy from "@/components/shared/policy";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserBotsLazyQuery, useUserQuery } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/use-session";
import { avatar } from "@/lib/utils";
import { BeakerIcon, BugAntIcon, CodeBracketIcon, EllipsisHorizontalIcon, FaceFrownIcon, FingerPrintIcon, HeartIcon, PencilIcon, StarIcon, WrenchScrewdriverIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
    const { data: auth, loading: gettingAuth } = useSession()
    const { data: user, loading: gettingUser } = useUserQuery({
        variables: {
            userId: params.id
        }
    })
    const [getBots, botsResult] = useUserBotsLazyQuery()

    const badges: Record<string, JSX.Element> = {
        dev: <CodeBracketIcon className="w-6 h-6 fill-rose-500" />,
        admin: <WrenchScrewdriverIcon className="w-6 h-6 fill-pink-500" />,
        tester: <BeakerIcon className="w-6 h-6 fill-green-500" />,
        bug_hunter: <BugAntIcon className="w-6 h-6 fill-purple-500" />,
        donor: <StarIcon className="w-6 h-6 fill-teal-500" />,
        contributor: <HeartIcon className="w-6 h-6 fill-amber-500" />,
    }

    if (gettingUser || gettingAuth) return <LoadingScreen />
    if (!user) return notFound()
    return <div className="mx-auto max-w-4xl py-12">
        <div className="bg-gradient-to-b from-pink-500 rounded-3xl via-red-500 to-yellow-500 p-0">
            <div className="overflow-hidden rounded-2xl bg-card min-h-full">
                <div className="relative">
                    {user.user.banner ? <img src={user.user.banner} draggable={false} alt="banner" className="object-cover w-full h-72 rounded-t-lg z-10" /> : <div
                        className="inset-0 w-full h-72 bg-opacity-50 rounded-t-lg bg-primary"
                    />}
                </div>
                <div className="p-6">
                    <div className="relative flex justify-between">
                        <div className="-mt-20 h-24 w-24 rounded-full bg-card ring-card ring-8">
                            <Image
                                alt="user avatar"
                                width={96}
                                height={96}
                                src={avatar(user.user.avatar, user.user.id)}
                                className="rounded-full"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"outline"} size={"icon"}>
                                    <EllipsisHorizontalIcon className="h-6 w-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    className="flex justify-between"
                                >
                                    Copy ID <FingerPrintIcon className="h-4 w-4" />
                                </DropdownMenuItem>
                                <Policy policy={user.user.id === auth?.me.user.id}>
                                    <Link href="/user/edit">
                                        <DropdownMenuItem className="flex justify-between">
                                            Edit <PencilIcon className="h-4 w-4" />
                                        </DropdownMenuItem>
                                    </Link>
                                </Policy>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="mt-0 h-24">
                        <div className="flex flex-col">
                            <div>
                                <p className="text-sm text-muted-foreground">/u/front</p>
                                <div className="mb-1 flex lg:flex-row flex-col items-center gap-3">
                                    <h2 className="text-3xl font-bold">{user.user.username}</h2>
                                    <div className="flex flex-row items-center gap-2 bg-background px-2 py-1 rounded">
                                        <TooltipProvider>
                                            {user.user.badges.map(b =>
                                                <Tooltip key={b.id}>
                                                    <TooltipTrigger asChild>{badges[b.id]}</TooltipTrigger>
                                                    <TooltipContent>
                                                        {b.description}
                                                    </TooltipContent>
                                                </Tooltip>)}
                                        </TooltipProvider>
                                    </div>
                                </div>
                                <p className="text-secondary-foreground">{user.user.bio ?? "This user has no biography yet."}</p>
                            </div>
                        </div>
                    </div>
                    <Accordion onValueChange={(v) => {
                        if (v.includes("bots")) getBots({
                            variables: {
                                userId: params.id
                            }
                        })
                    }} type="multiple">
                        <AccordionItem value="bots">
                            <AccordionTrigger>Bots</AccordionTrigger>
                            <AccordionContent>
                                {botsResult.loading ? <LoadingScreen /> : botsResult.data?.user.bots.nodes?.length ? <div className="grid grid-cols-2 gap-2">
                                    <Bots bots={botsResult.data.user.bots.nodes!} />
                                </div> : <div className="flex items-center justify-center h-32 font-bold text-red-500">
                                    <FaceFrownIcon className="w-5 mr-2" /> No bots
                                </div>}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
}