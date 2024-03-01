import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function CertifiedIcon({ className, ...props }: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>) {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <CheckCircleIcon {...props} className={cn("text-primary hidden md:flex", className)} />
            </TooltipTrigger>
            <TooltipContent>
                Certified bot
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}