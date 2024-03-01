"use client";

import AnimatedNumber from "@/components/ui/animated-number";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePanelBotCountQuery } from "@/lib/apollo/types";

export default function Page() {
    const { data: counts } = usePanelBotCountQuery()
    return (
        <div className="gap-2 grid grid-cols-3">
            <Card>
                <CardHeader>
                    Approved bots
                </CardHeader>
                <CardContent>
                    <CardTitle><AnimatedNumber value={counts?.approved.totalCount ?? 0} /></CardTitle>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    Pending bots
                </CardHeader>
                <CardContent>
                    <CardTitle><AnimatedNumber value={counts?.pending.totalCount ?? 0} /></CardTitle>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    Denied bots
                </CardHeader>
                <CardContent>
                    <CardTitle><AnimatedNumber value={counts?.denied.totalCount ?? 0} /></CardTitle>
                </CardContent>
            </Card>

        </div>
    )
}