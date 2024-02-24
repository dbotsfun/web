"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import Policy from "@/components/shared/policy";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserQuery } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/useSession";
import { avatar } from "@/lib/utils";
import { BeakerIcon, EllipsisHorizontalIcon, FlagIcon, HeartIcon, PencilIcon, WrenchScrewdriverIcon } from "@heroicons/react/20/solid";
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

    const badges: Record<string, JSX.Element> = {
        dev: <WrenchScrewdriverIcon className="w-6 h-6 text-rose-500" />,
        contributor: <HeartIcon className="w-6 h-6 text-amber-500" />,
        tester: <BeakerIcon className="w-6 h-6 text-green-500" />
    }

    if (gettingUser || gettingAuth) return <LoadingScreen />
    if (!user) return notFound()
    return <div className="mx-auto max-w-4xl py-12">
        <div className="overflow-hidden rounded-2xl border bg-card min-h-full">
            <div
                className="h-[200px] w-full bg-cover bg-no-repeat bg-primary"
            />
            <div className="p-6">
                <div className="relative flex justify-between">
                    <div className="-mt-20 h-24 w-24 rounded-full bg-card ring-card ring-4">
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
                                Report <FlagIcon className="h-4 w-4" />
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
                            <div className="mb-1 flex items-center gap-3">
                                <h2 className="text-3xl font-bold">{user.user.username}</h2>
                                <div className="flex flex-row items-center gap-2">
                                    <TooltipProvider>
                                        {user.user.badges.map(b =>
                                            <Tooltip>
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
                {/** bots here */}
            </div>
        </div>
    </div>
}