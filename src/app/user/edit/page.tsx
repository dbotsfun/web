"use client";

import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { z } from "zod";

const formSchema = z.object({
    bio: z.string()
})

export default function Page() {
    return <div className="mx-auto max-w-4xl py-24">
        <Button variant={"link"}><ArrowLeftIcon className="w-5 h-5 mr-2" /> Return</Button>
        <Card>
            <CardHeader className="border-b">
                <CardTitle>User settings</CardTitle>
            </CardHeader>
            <CardContent className="mt-5">
                <AutoForm formSchema={formSchema} />
            </CardContent>
            <CardFooter className="border-t flex w-full">
                <Button className="mt-4 justify-end flex">Save</Button>
            </CardFooter>
        </Card>
    </div>
}