"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function ReturnButton() {
    const router = useRouter()
    return <Button onClick={router.back} className="text-sm" variant={"link"}>
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Return
    </Button>
}