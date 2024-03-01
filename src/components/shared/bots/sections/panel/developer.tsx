"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// biome-ignore lint/complexity/noBannedTypes: wip
type BotDeveloperProps = {}

// biome-ignore lint/correctness/noEmptyPattern: wip
export default function BotDeveloper({
}: BotDeveloperProps) {
    return <Card>
        <CardHeader>
            <CardTitle>API Key</CardTitle>
            In order to see your API Key, you will need to reset it.
        </CardHeader>
        <CardContent>
            <Button>Reset API Key</Button>
        </CardContent>
    </Card>
}