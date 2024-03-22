"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PencilIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface BotEditProps {
    id: string;
}

export default function BotEdit({ id }: BotEditProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit bot</CardTitle>
                Edit your bot's information
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href={`/bot/${id}/edit`}>
                        <PencilIcon className="w-5 h-5 mr-2" /> Edit bot
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
