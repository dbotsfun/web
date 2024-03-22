import Logo from "@/../public/ico.png";
import { BotCardProps } from "@/lib/types/bots";
import { avatar as av } from "@/lib/utils";
import { ArrowUpIcon, ChartBarIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import CertifiedIcon from "../bots/certified-icon";
import PendingIcon from "../bots/pending-icon";
import ImageWithFallback from "../common/image-with-fallback";

export default function BotCard({
	id,
	avatar,
	name,
	votes,
	tags,
	shortDescription,
	certified,
	guildCount,
	status,
}: BotCardProps) {
	return (
		<Link href={`/bot/${id}`}>
			<div
				className="relative animate-in fade-in slide-in-from-bottom-3 overflow-hidden group bg-card w-full h-full rounded-xl cursor-pointer group duration-150"
			>
				<div
					draggable={false}
					className="animate-in bg-no-repeat group-hover:scale-110 duration-150 bg-cover fade-in absolute w-full h-32 gradient-mask-b-0 opacity-[0.15]"
					style={{
						backgroundImage: `url('${av(avatar, id, 4096)}')`
					}}
				/>
				<div className="relative z-[2] p-6">
					<div className="flex items-center mb-4 gap-4">
						<div>
							<div className="relative w-16 h-16 rounded-lg overflow-hidden">
								<ImageWithFallback
									key={id}
									alt="bot avatar"
									draggable="false"
									src={av(avatar, id, 4096)}
									width={80}
									height={80}
									placeholder="blur"
									blurDataURL={Logo.blurDataURL}
									className="w-full h-full object-cover"
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
					<p className="text-secondary-foreground gradient-mask-b-30 text-sm mt-1 line-clamp-4 text-wrap break-words h-20">
						{shortDescription}
					</p>
					<div className="flex justify-between mt-4">
						<div className="flex gap-2 items-center">
							<ArrowUpIcon className="w-4 h-4" /> {votes}
						</div>
						<div className="flex gap-2 items-center">
							<ChartBarIcon className="w-4 h-4" /> {guildCount ?? 0}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
