"use client";
import Loader from "@/components/shared/common/loader";
import LoadingScreen from "@/components/shared/common/loading-screen";
import LoginDialog from "@/components/shared/common/login-dialog";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCreateBotMutation } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/useSession";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, CodeIcon, ImportIcon, QuoteIcon, TextIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    id: z
        .string({
            required_error: "ID is required.",
        })
        .describe("Bot ID")
        .min(18, {
            message: "ID must be at least 18 characters.",
        }),
    shortDescription: z
        .string({
            required_error: "Short description is required.",
        })
        .describe("Short description")
        .min(20, {
            message: "Short description must be at least 25 characters long.",
        })
        .max(200, {
            message: "Short description must be less than 250 characters long."
        }),
    tags: z
        .string({
            required_error: "Tags are required.",
        })
        .describe("Tags"),
    description: z
        .string({
            required_error: "Long description is required.",
        })
        .describe("Long description")
        .min(100, {
            message: "Description must be at least 100 characters long.",
        })
        .max(2000, {
            message: "Description must be less than 2000 characters long."
        }),
    inviteLink: z
        .string()
        .url("Invite url should be an url")
        .optional(),
    github: z
        .string()
        .url("Github url should be an url")
        .optional(),
    website: z
        .string()
        .url("Website url should be an url")
        .optional(),
    supportServer: z
        .string()
        .url("Support server url should be an url")
        .optional()
})

export default function Page() {
    const router = useRouter()
    const [id, setId] = useState<string | null>()
    const [description, setDescription] = useState<string | null>()
    const [shortDescription, setShortDescription] = useState<string | null>()
    const [tags, setTags] = useState<string | null>()

    const { data: auth, loading: gettingUser } = useSession()
    const [submit, result] = useCreateBotMutation({
        variables: {
            input: {
                id: id!,
                description: description!,
                shortDescription: shortDescription!,
                tags: tags?.split(", ")!
            }
        }
    })

    useEffect(() => {
        if (result.called && !result.loading && !result.error) {
            router.push("/")
            toast.success(`You just submitted ${result.data?.createBot.name}.`)
        }
    }, [result])

    if (gettingUser) return <LoadingScreen />
    if (!gettingUser && !auth) return <LoginDialog />
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Submit your bot
                </CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={"secondary"} size={"icon"}>
                                        <ImportIcon className="w-5 h-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Import from another botlist</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={"end"}>
                        <DropdownMenuLabel>Import from</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><img alt="dlist.gg" src="/ext/dlistgg.svg" className="h-5 w-5 mr-2 dark:invert-0 invert" />dlist.gg</DropdownMenuItem>
                        <DropdownMenuItem><img alt="top.gg" src="/ext/topgg.png" className="h-5 w-5 mr-2" />top.gg</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                {result.loading ? <Loader /> : <AutoForm onSubmit={() => submit()} fieldConfig={{
                    id: {
                        description: <Link href="https://discord.com/developers/applications" target="_blank" className="flex items-center text-primary underline hover:text-primary/80"><ArrowUpRightIcon className="mr-1 w-4 h-4" />Get the ID</Link>,
                        inputProps: {
                            placeholder: "E.g: 9999999999999999",
                            autoComplete: "off",
                            onInput: (e) => setId(e.currentTarget.value)
                        }
                    },
                    shortDescription: {
                        description: <div className="flex items-center text-muted-foreground"><TextIcon className="mr-1 w-4 h-4" />Min. 25, Max. 250</div>,
                        inputProps: {
                            placeholder: "E.g: An amazing bot who has this features, short",
                            autoComplete: "off",
                            onInput: (e) => setShortDescription(e.currentTarget.value)
                        }
                    },
                    tags: {
                        description: <div className="flex items-center text-muted-foreground"><QuoteIcon className="mr-1 w-4 h-4" />Separated by commas</div>,
                        inputProps: {
                            placeholder: "E.g: Fun, Moderation",
                            autoComplete: "off",
                            onInput: (e) => setTags(e.currentTarget.value)
                        }
                    },
                    description: {
                        fieldType: "textarea",
                        description: <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-muted-foreground"><CodeIcon className="mr-1 w-4 h-4" />Uses HTML. Injecting styles that change website look will result in a rejection.</div>
                            <div className={cn("flex items-center",
                                description?.length === 0 ? "text-muted-foreground" :
                                    description?.length! >= 2000 ? "text-red-500" :
                                        description?.length! >= 1700 ? "text-orange-500" :
                                            description?.length! >= 250 ? "text-green-500" :
                                                "text-muted-foreground"
                            )}>{description?.length ?? 0}/2000</div>
                        </div>,
                        inputProps: {
                            maxLength: 2000,
                            onInput: (e) => setDescription(e.currentTarget.value),
                            className: "font-mono"
                        }
                    }
                }} formSchema={formSchema}>
                    <AutoFormSubmit className="w-full">Submit</AutoFormSubmit>
                </AutoForm>}
            </CardContent>
            <CardFooter>
                {result.error ? <p className="text-destructive">{result.error.message}</p> : <p>Labels with <span className="text-destructive">*</span> are mandatory.</p>}
            </CardFooter>
        </Card>
    )
}