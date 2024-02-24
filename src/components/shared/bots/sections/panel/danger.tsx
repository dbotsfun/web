"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRemoveBotMutation } from "@/lib/apollo/types";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
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
    const [remove, removeResult] = useRemoveBotMutation({
        variables: {
            id
        },
        update(cache) {
            const normalizedId = cache.identify({ id, __typename: 'BotObject' });
            cache.evict({ id: normalizedId });
            cache.gc();
        }
    })

    function removeBot() {
        toast.promise(remove(), {
            loading: `Removing ${name}`,
            error: `We couldn't remove ${name}`,
            success: `Removed ${name}`
        })
        router.push("/")
    }
    return <Card className="border-destructive bg-destructive/10 text-destructive">
        <CardHeader>
            <CardTitle>Danger zone</CardTitle>
        </CardHeader>
        <CardContent>
            <Button disabled={removeResult.loading || removeResult.called} onClick={removeBot} variant={"destructive"}><TrashIcon className="w-5 mr-2" />Delete {name}</Button>
        </CardContent>
    </Card>
}