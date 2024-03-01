"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import ReturnButton from "@/components/shared/common/return-button";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEditUserMutation, useUserLazyQuery } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/use-session";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    bio: z.string().min(1, "Bio must be at least 1 character long").max(200, "Bio must be less than 200 characters long"),
    banner: z.string().url().optional()
})

export default function Page() {
    const { data: auth, loading: gettingAuth } = useSession()
    const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({});
    const [getUser, user] = useUserLazyQuery();
    const [edit, editResult] = useEditUserMutation()

    useEffect(() => {
        if (auth) getUser({
            variables: {
                userId: auth.me.user.id
            }
        })
    }, [auth])

    useEffect(() => {
        if (editResult.called && !editResult.loading && !editResult.error) {
            toast.success("Updated user information")
            user.refetch({
                userId: auth!.me.user.id
            })
            editResult.reset()
        }

        if (editResult.error) toast.error(editResult.error.message)
    }, [editResult.called, editResult.loading])

    function onSubmit(values: Partial<z.infer<typeof formSchema>>) {
        edit({
            variables: {
                input: {
                    banner: values.banner,
                    bio: values.bio
                }
            }
        })
    }

    if (user.loading || gettingAuth) return <LoadingScreen />
    if (user.called && !user.loading && !user.data) return notFound()
    return <div className="mx-auto max-w-4xl py-24">
        <ReturnButton />
        <Card>
            <CardHeader className="border-b">
                <CardTitle>User settings</CardTitle>
            </CardHeader>
            <CardContent className="mt-5">
                <AutoForm values={values} onParsedValuesChange={setValues} onSubmit={() => onSubmit(values)} formSchema={formSchema} fieldConfig={{
                    bio: {
                        inputProps: {
                            placeholder: "A nice bio to describe yourself",
                            defaultValue: user.data?.user.bio ?? undefined
                        }
                    },
                    banner: {
                        description: "The optimal dimensions for a banner are 1100x360",
                        inputProps: {
                            placeholder: "https://imgur...",
                            defaultValue: user.data?.user.banner ?? undefined
                        }
                    }
                }}>
                    <AutoFormSubmit className="mt-4 justify-end flex">Save</AutoFormSubmit>
                </AutoForm>
            </CardContent>
        </Card>
    </div>
}