"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, Clock10Icon, HashIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    return (
        <Card>
            <CardHeader>
                <span className="text-xs uppercase font-bold text-muted-foreground">Welcome, simxnet</span>
                <CardTitle>
                    Where do you want to go?
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
                <div onClick={() => router.push("/secret/approved")} className="flex justify-center cursor-pointer hover:ring-4 duration-150 ring-accent flex-col hover:scale-105 active:scale-95 items-center gap-2 p-5 rounded-lg border border-accent bg-card">
                    <div className="bg-accent p-4 rounded-full">
                        <CheckIcon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">Approved</h1>
                    <p>Approved bots</p>
                </div>
                <div onClick={() => router.push("/secret/denied")} className="flex justify-center cursor-pointer hover:ring-4 duration-150 ring-accent flex-col items-center hover:scale-105 active:scale-95 gap-2 p-5 rounded-lg border border-accent bg-card">
                    <div className="bg-accent p-4 rounded-full">
                        <XIcon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">Denied</h1>
                    <p>Denied bots</p>
                </div>
                <div onClick={() => router.push("/secret/pending")} className="flex justify-center cursor-pointer hover:ring-4 duration-150 ring-accent flex-col items-center hover:scale-105 active:scale-95 gap-2 p-5 rounded-lg border border-accent bg-card">
                    <div className="bg-accent p-4 rounded-full">
                        <Clock10Icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">Pending</h1>
                    <p>Pending bots</p>
                </div>
                <div onClick={() => router.push("/secret/tags")} className="flex justify-center cursor-pointer hover:ring-4 duration-150 ring-accent flex-col items-center hover:scale-105 active:scale-95 gap-2 p-5 rounded-lg border border-accent bg-card">
                    <div className="bg-accent p-4 rounded-full">
                        <HashIcon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">Tags</h1>
                    <p>Manage tags</p>
                </div>
            </CardContent>
        </Card>
    )
}