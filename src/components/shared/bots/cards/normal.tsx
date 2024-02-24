import AnimatedNumber from "@/components/ui/animated-number";
import { badgeVariants } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { BotCardProps } from "@/lib/types/bots";
import { avatar as av } from "@/lib/utils";
import { CheckCircleIcon, ChevronUpIcon, ServerStackIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../../public/ico.png"

export default function BotCard({ id, avatar, name, votes, tags, shortDescription, certified, guildCount }: BotCardProps) {
    return <div className="relative animate-in fade-in slide-in-from-bottom-3 overflow-hidden bg-card w-full h-full p-6 rounded-xl cursor-pointer">
        <div className="relative z-[2]">
            <div className="flex items-center mb-4 gap-4">
                <div>
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-input">
                        <Image
                            alt="bot avatar"
                            draggable="false"
                            src={av(avatar, id, 4096)}
                            width={"64"}
                            height={"64"}
                            placeholder="blur"
                            blurDataURL={Logo.blurDataURL}
                            className="w-full h-full object-cove animate-in fade-in"
                        />
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1">
                            <h3 className="min-w-min text-card-foreground font-semibold text-lg line-clamp-1">
                                {name}
                            </h3>
                            {certified && <CheckCircleIcon className="w-5 text-primary" />}
                        </div>
                        <Link href={`/bot/${id}/vote`} className={badgeVariants({ className: "text-muted-foreground", variant: "secondary", })}>
                            <ChevronUpIcon className="mr-1 w-5" /> {votes}
                        </Link>
                    </div>
                    <h4 className="text-muted-foreground text-xs">{tags.join(", ")}</h4>
                </div>
            </div>
            <p className="text-secondary-foreground text-sm mt-1 line-clamp-4 text-wrap break-words h-20">
                {shortDescription}
            </p>
            <div className="flex flex-row items-center gap-1 text-xs text-muted-foreground">
                <ServerStackIcon className="w-3 h-3" />
                <AnimatedNumber value={guildCount ?? 0} />
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Link href={`/bot/${id}`} className={buttonVariants({ className: "w-full", size: "sm", variant: "default" })}>View</Link>
                <Button size={"sm"} className="w-full" variant={"secondary"}>Invite</Button>
            </div>
        </div>
    </div>

}

// mocked card