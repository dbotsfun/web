import { BotCardProps } from "@/lib/types/bots";
import { avatar as av } from "@/lib/utils";
import { ArrowUpIcon, ChartBarIcon } from "@heroicons/react/16/solid";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { usePalette } from 'react-palette';
import Logo from "../../../../../public/ico.png"
import CertifiedIcon from "../certified-icon";
import PendingIcon from "../pending-icon";

export default function BotCard({ id, avatar, name, votes, tags, shortDescription, certified, guildCount, status }: BotCardProps) {
    const { data, loading } = usePalette(av(avatar, id, 4096))
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    return <Link href={`/bot/${id}`}>
        <div className="relative animate-in fade-in slide-in-from-bottom-3 overflow-hidden group bg-card w-full h-full rounded-xl cursor-pointer"
            onMouseMove={handleMouseMove}>
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.02),
              transparent 100%
            )
          `,
                }}
            />
            <div draggable={false} className="animate-in bg-no-repeat bg-cover fade-in absolute w-full h-28 gradient-mask-b-0 opacity-10" style={{
                backgroundColor: loading ? "hsl(var(--primary))" : data.vibrant
            }} />
            <div className="relative z-[2] p-6">
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
                                {certified && <CertifiedIcon className="w-5" />}
                                {status === "PENDING" && <PendingIcon className="w-5" />}
                            </div>
                        </div>
                        <h4 className="text-muted-foreground text-xs">{tags.join(", ")}</h4>
                    </div>
                </div>
                <p className="text-secondary-foreground gradient-mask-b-30 text-sm mt-1 line-clamp-4 text-wrap break-words h-20">
                    {shortDescription}
                </p>
                <div className="flex justify-between mt-4">
                    <div className="flex gap-2 items-center"><ArrowUpIcon className="w-4 h-4" /> {votes}</div>
                    <div className="flex gap-2 items-center"><ChartBarIcon className="w-4 h-4" /> {guildCount ?? 0}</div>
                </div>
            </div>
        </div></Link>

}