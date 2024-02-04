import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
    return <div className="relative overflow-hidden bg-card w-full h-full p-6 rounded-xl cursor-pointer">
        <div className="relative z-[2]">
            <div className="flex items-center mb-4 gap-4">
                <div>
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-input">
                        <Skeleton className="w-full h-full" />
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                        <Badge variant={"secondary"} className="text-opacity-0 animate-pulse w-12 h-5" />
                    </div>
                </div>
            </div>
            <div className="space-y-1 h-20">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[220px]" />
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
        </div>
    </div>

}