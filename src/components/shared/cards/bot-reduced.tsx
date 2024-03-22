import Logo from "@/../public/ico.png";
import { BotCardProps } from "@/lib/types/bots";
import { avatar as av } from "@/lib/utils";
import Link from "next/link";
import CertifiedIcon from "../bots/certified-icon";
import PendingIcon from "../bots/pending-icon";
import ImageWithFallback from "../common/image-with-fallback";

export default function BotReducedCard({
    id,
    avatar,
    name,
    tags,
    certified,
    status,
}: BotCardProps) {
    return (
        <Link href={`/bot/${id}`}>
            <div
                className="relative animate-in fade-in slide-in-from-bottom-3 overflow-hidden group bg-card w-full h-full rounded-xl cursor-pointer"
            >
                <div className="relative z-[2] p-4">
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-input">
                                <ImageWithFallback
                                    key={id}
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
                            <h4 className="text-muted-foreground text-xs">
                                {tags.join(", ")}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
