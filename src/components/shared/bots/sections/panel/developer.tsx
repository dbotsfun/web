"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// biome-ignore lint/complexity/noBannedTypes: wip
type BotDeveloperProps = {}

// biome-ignore lint/correctness/noEmptyPattern: wip
export default function BotDeveloper({
}: BotDeveloperProps) {
    return <Card>
        <CardHeader>
            <CardTitle>Developer panel</CardTitle>
        </CardHeader>
        <CardContent>
            <Label>API Key</Label>
            <div className="flex gap-2 items-center">
                <Button>Reset API Key</Button>
                <Label>You <strong>need</strong> to reset your api key in order to see it</Label>
            </div>
        </CardContent>
    </Card>
}