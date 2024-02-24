"use client";

import AnimatedNumber from "@/components/ui/animated-number";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBotCountQuery } from "@/lib/apollo/types";

export default function Page() {
    const { data: botCount } = useBotCountQuery()
    return (
        <div className="gap-2 grid grid-cols-3">
            <Card>
                <CardHeader>
                    Total bots
                </CardHeader>
                <CardContent>
                    <CardTitle><AnimatedNumber value={botCount?.bots.totalCount ?? 0} /></CardTitle>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    Total bots
                </CardHeader>
                <CardContent>
                    <CardTitle><AnimatedNumber value={botCount?.bots.totalCount ?? 0} /></CardTitle>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    Total bots
                </CardHeader>
                <CardContent>
                    <CardTitle><AnimatedNumber value={botCount?.bots.totalCount ?? 0} /></CardTitle>
                </CardContent>
            </Card>

        </div>
    )
}