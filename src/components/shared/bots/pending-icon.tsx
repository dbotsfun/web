import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ClockIcon } from "@heroicons/react/20/solid";

export default function PendingIcon({
	className,
	...props
}: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<ClockIcon
						{...props}
						className={cn("text-amber-500 hidden md:flex", className)}
					/>
				</TooltipTrigger>
				<TooltipContent>Pending</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
