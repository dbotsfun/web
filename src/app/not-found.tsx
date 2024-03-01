"use client";

import { Button } from "@/components/ui/button";
import { LinkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="flex items-center min-h-[60vh] px-6 mx-auto">
            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                <div className="p-3 text-sm font-medium text-accent-foreground bg-accent rounded-full">
                    <LinkIcon className="w-7 h-7" />
                </div>
                <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
                    Page not found
                </h1>
                <p className="mt-4 text-muted-foreground lg:text-base text-sm">
                    You ran into an unexisting page (or restricted), what will you do now?
                </p>
                <div className="flex items-center mt-6 gap-2 shrink-0 sm:w-auto">
                    <Button onClick={router.back} variant={"secondary"}>Go back</Button>
                    <Button onClick={router.refresh}>Retry</Button>
                </div>
            </div>
        </div>

    )
}