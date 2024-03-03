import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DlistIcon() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Badge className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                        <img draggable={false} alt="dlist.gg" src="/ext/dlistgg.svg" className="h-[17px] w-[17px] mr-2" /> From dlist
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>Imported from dlist.gg</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
