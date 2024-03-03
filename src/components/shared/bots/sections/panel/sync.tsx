"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSyncBotInformationMutation } from "@/lib/apollo/types";
import { CubeTransparentIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { toast } from "sonner";

interface BotSyncProps {
    id: string;
}

export default function BotSync({ id }: BotSyncProps) {
    const [sync, syncStatus] = useSyncBotInformationMutation();

    useEffect(() => {
        if (syncStatus.error) toast.error(syncStatus.error.message)
        if (syncStatus.called && syncStatus.data?.syncBotInformation.name)
            toast.success(
                "Bot information has been synchronized",
            );
    }, [syncStatus]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sync bot information</CardTitle>
                If you recently updated bot's Discord client you should use this, it syncs the bot's Discord client with the bot's database record.
            </CardHeader>
            <CardContent>
                {syncStatus.loading ? <LoadingScreen /> : <Button onClick={() => sync({ variables: { syncBotInformationId: id } })}><CubeTransparentIcon className="w-5 h-5 mr-2" />Sync information</Button>}
            </CardContent>
            <CardFooter>
                <p className="text-muted-foreground text-xs">
                    You can only synchronize once every 10 minutes
                </p>
            </CardFooter>
        </Card>
    );
}
