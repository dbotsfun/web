"use client";

import Loader from "@/components/shared/common/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Credenza, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { useResetApiKeyMutation } from "@/lib/apollo/types";
import { useEffect } from "react";
import { toast } from "sonner";

interface BotDeveloperProps {
    id: string;
}

export default function BotDeveloper({
    id
}: BotDeveloperProps) {
    const [resetApiKey, apiKeyResult] = useResetApiKeyMutation()

    useEffect(() => {
        if (apiKeyResult.called && apiKeyResult.data?.resetAPIKey) toast.success("API Key has been reset, once you change the tab you will not be able to see key again")
    }, [apiKeyResult])
    return <Card>
        <CardHeader>
            <CardTitle>API Key</CardTitle>
            In order to see your API Key, you will need to reset it.
        </CardHeader>
        <CardContent>
            {apiKeyResult.loading ? <Loader /> :
                apiKeyResult.error ?
                    <p className="text-red-500">{apiKeyResult.error.message}</p> :
                    apiKeyResult.called ?
                        <Input readOnly aria-readonly className="w-full" value={apiKeyResult.data?.resetAPIKey} /> :
                        <Credenza>
                            <CredenzaTrigger asChild>
                                <Button variant={"secondary"}>Reset API Key</Button>
                            </CredenzaTrigger>
                            <CredenzaContent>
                                <CredenzaHeader>
                                    <CredenzaTitle>Reset API Key</CredenzaTitle>
                                    <CredenzaDescription>
                                        If you reset your API Key the previous one will be useless.
                                    </CredenzaDescription>
                                </CredenzaHeader>
                                <CredenzaFooter>
                                    <CredenzaClose asChild>
                                        <Button variant={"outline"}>Cancel</Button>
                                    </CredenzaClose>
                                    <Button disabled={apiKeyResult.loading || apiKeyResult.called} onClick={() => resetApiKey({
                                        variables: {
                                            input: {
                                                id
                                            }
                                        }
                                    })}>Confirm</Button>
                                </CredenzaFooter>
                            </CredenzaContent>
                        </Credenza>}
        </CardContent>
        <CardFooter>
            <p className="text-muted-foreground text-xs">
                API Key is used to interact with dbots' api and access certain data.
            </p>
        </CardFooter>
    </Card>
}