import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function CertifiedIcon({
	className,
	...props
}: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger>
					<CheckCircleIcon
						{...props}
						className={cn("text-primary hidden md:flex", className)}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p className="font-normal">
						This bot is certified by us
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
