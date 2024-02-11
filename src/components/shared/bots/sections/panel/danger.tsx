"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteBotMutation } from "@/lib/apollo/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface BotDangerZoneProps {
    id: string;
    name: string;
}

export default function BotDangerZone({
    id,
    name
}: BotDangerZoneProps) {
    const router = useRouter()
    const [remove, removeResult] = useDeleteBotMutation({
        variables: {
            id: id
        }
    })

    useEffect(() => {
        if (removeResult.loading) {
            toast.loading(`Deleting ${name}...`)
        }
        if (removeResult.called && !removeResult.loading) {
            toast.success(`You deleted ${name}.`)
            router.push("/")
        }
    }, [removeResult])
    return <Card className="border-destructive bg-destructive/10 text-destructive">
        <CardHeader>
            <CardTitle>Danger zone</CardTitle>
        </CardHeader>
        <CardContent>
            <Button disabled={removeResult.loading || removeResult.called} onClick={() => remove()} variant={"destructive"}>Delete {name}</Button>
        </CardContent>
    </Card>
}