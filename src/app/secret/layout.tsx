"use client";

import { Button } from "@/components/ui/button"
import { CheckCircleIcon, ClockIcon, HomeModernIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { usePathname, useRouter } from "next/navigation";

export default function PanelLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const path = usePathname()
    const router = useRouter()
    return <div className="flex gap-5">
        <div className={"pb-12 w-1/4 bg-card h-full rounded-lg sticky top-24"}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        General
                    </h2>
                    <div className="flex flex-col gap-1">
                        <Button onClick={() => router.push("/secret")} variant={path === "/secret" ? "secondary" : "ghost"} className="w-full justify-start">
                            <HomeModernIcon className="w-4 h-4 mr-2" />
                            Panel
                        </Button>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Manage bots
                    </h2>
                    <div className="flex flex-col gap-1">
                        <Button onClick={() => router.push("/secret/pending")} variant={path === "/secret/pending" ? "secondary" : "ghost"} className="w-full justify-start">
                            <ClockIcon className="w-4 h-4 mr-2" />
                            Pending
                        </Button>
                        <Button onClick={() => router.push("/secret/denied")} variant={path === "/secret/denied" ? "secondary" : "ghost"} className="w-full justify-start">
                            <XMarkIcon className="w-4 h-4 mr-2" />
                            Denied
                        </Button>
                        <Button onClick={() => router.push("/secret/approved")} variant={path === "/secret/approved" ? "secondary" : "ghost"} className="w-full justify-start">
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Approved
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full">
            {children}
        </div>
    </div>

}