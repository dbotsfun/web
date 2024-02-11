"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardCheckIcon, ClipboardIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";

interface BotDeveloperProps {
    apiKey?: string;
}

export default function BotDeveloper({
    apiKey
}: BotDeveloperProps) {
    const [viewKey, setViewKey] = useState(false)
    const [copied, copy] = useCopyToClipboard()
    return <Card>
        <CardHeader>
            <CardTitle>Developer panel</CardTitle>
        </CardHeader>
        <CardContent>
            <Label>API Key</Label>
            <div className="flex gap-2 items-center">
                <Input aria-readonly readOnly type={!viewKey ? "password" : "text"} className="max-w-72" defaultValue={apiKey ?? ""} />
                <Button variant={"secondary"} size={"icon"} onClick={() => setViewKey(!viewKey)}>{viewKey ? <EyeOffIcon /> : <EyeIcon />}</Button>
                <Button variant={copied.value ? "default" : "secondary"} size={"icon"} onClick={() => copy(apiKey ?? "")}>{copied.value ? <ClipboardCheckIcon /> : <ClipboardIcon />}</Button>
            </div>
        </CardContent>
    </Card>
}