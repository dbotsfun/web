"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserQuery } from "@/lib/apollo/types";
import { avatar } from "@/lib/utils";
import { AmpersandIcon, FlagIcon, MoreHorizontalIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
    const { data: user, loading: gettingUser } = useUserQuery({
        variables: {
            userId: params.id
        }
    })

    const badges: Record<string, JSX.Element> = {
        dev: <AmpersandIcon className="w-6 h-6 text-rose-500" />
    }

    if (gettingUser) return <LoadingScreen />
    if (!user) return notFound()
    return <div className="mx-auto max-w-4xl py-24">
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div
                className="h-[200px] w-full bg-cover bg-no-repeat bg-primary"
            />
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
                                <MoreHorizontalIcon className="h-6 w-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="flex justify-between"
                            >
                                Report <FlagIcon className="h-4 w-4" />
                            </DropdownMenuItem>
                            <Link href="/u/edit">
                                <DropdownMenuItem className="flex justify-between">
                                    Edit <PencilIcon className="h-4 w-4" />
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="mt-0">
                    <div className="flex flex-col">
                        <div>
                            <div className="mb-1 flex items-center gap-3">
                                <h2 className="text-3xl font-bold">{user.user.username}</h2>
                                <div className="flex flex-row items-center gap-2">
                                    {user.user.badges.map(b => <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>{badges[b.id]}</TooltipTrigger>
                                            <TooltipContent>
                                                {b.description}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>)}
                                </div>
                            </div>
                            <p className="text-secondary-foreground">{user.user.bio ?? "This user has no biography yet."}</p>
                        </div>
                    </div>
                </div>
                <div>
                    bots here
                </div>
            </div>
        </div>
    </div>
}