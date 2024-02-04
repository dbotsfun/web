'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BotError() {
    const router = useRouter()
    return (
        <div className="flex h-[60vh] justify-center flex-col">
            <h1 className="text-7xl font-bold text-center">404</h1>
            <p className="text-xl font-normal text-center">Bot not found</p>
            <Button className="w-min mx-auto my-5" variant={"secondary"} onClick={() => router.back()}>
                <ArrowLeftIcon className="mr-2 w-5 h-5" />
                Go back
            </Button>
        </div>
    )
}