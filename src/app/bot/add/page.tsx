"use client";
import Loader from "@/components/shared/common/loader";
import LoadingScreen from "@/components/shared/common/loading-screen";
import LoginDialog from "@/components/shared/common/login-dialog";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    BotListSource,
    useCreateBotMutation,
    useImportBotMutation,
} from "@/lib/apollo/types";
import {
    BOT_DESCRIPTION_MAX_LENGTH,
    BOT_DESCRIPTION_MIN_LENGTH,
    BOT_PREFIX_MAX_LENGTH,
    BOT_PREFIX_MIN_LENGTH,
    BOT_SHORT_DESCRIPTION_MAX_LENGTH,
    BOT_SHORT_DESCRIPTION_MIN_LENGTH,
} from "@/lib/constants";
import { useSession } from "@/lib/hooks/use-session";
import {
    ArrowDownTrayIcon,
    ArrowUpRightIcon,
    CommandLineIcon,
    DocumentTextIcon,
    TagIcon,
} from "@heroicons/react/20/solid";
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
        .min(BOT_SHORT_DESCRIPTION_MIN_LENGTH, {
            message: "Short description must be at least 25 characters long.",
        })
        .max(BOT_SHORT_DESCRIPTION_MAX_LENGTH, {
            message: "Short description must be less than 250 characters long.",
        }),
    prefix: z
        .string({
            required_error: "Prefix is required.",
        })
        .describe("Prefix")
        .min(BOT_PREFIX_MIN_LENGTH, {
            message: "Prefix must be at least 1 characters long.",
        })
        .max(BOT_PREFIX_MAX_LENGTH, {
            message: "Prefix must be less than 12 characters long.",
        })
        .optional(),
    tags: z.string().describe("Tags"),
    description: z
        .string({
            required_error: "Long description is required.",
        })
        .describe("Long description")
        .min(BOT_DESCRIPTION_MIN_LENGTH, {
            message: "Description must be at least 100 characters long.",
        })
        .max(BOT_DESCRIPTION_MAX_LENGTH, {
            message: "Description must be less than 2000 characters long.",
        }),
    inviteLink: z.string().url("Invite url should be an url").optional(),
    github: z.string().url("Github url should be an url").optional(),
    website: z.string().url("Website url should be an url").optional(),
    supportServer: z
        .string()
        .url("Support server url should be an url")
        .optional(),
});

export default function Page() {
    const router = useRouter();
    const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({});
    const [importId, setImportId] = useState<string | null>();

    const { data: auth, loading: gettingUser } = useSession();
    const [submit, result] = useCreateBotMutation();

    function onSubmit(values: Partial<z.infer<typeof formSchema>>) {
        submit({
            variables: {
                input: {
                    id: values.id!,
                    shortDescription: values.shortDescription!,
                    description: values.description!,
                    prefix: values.prefix,
                    github: values.github,
                    inviteLink: values.inviteLink,
                    supportServer: values.supportServer,
                    tags: values.tags!.split(", "),
                    website: values.website,
                },
            },
        });
    }

    const [importBot, importResult] = useImportBotMutation({
        variables: {
            input: {
                id: importId!,
                source: BotListSource.DiscordList, // the only option lool
            },
        },
    });

    useEffect(() => {
        if (result.called && !result.loading && !result.error) {
            router.push("/");
            toast.success(`${result.data?.createBot.name} has been submitted`);
        }

        if (result.error) {
            toast.error(result.error.message);
            result.reset();
        }
    }, [result]);

    useEffect(() => {
        if (importResult.called && !importResult.loading && !importResult.error) {
            router.push("/");
            toast.success(
                `${importResult.data?.importBot.name} has been submitted from dlist.gg`,
            );
        }

        if (importResult.error) {
            toast.error(importResult.error.message);
            importResult.reset();
        }
    }, [importResult]);

    if (gettingUser) return <LoadingScreen />;
    if (!gettingUser && !auth) return <LoginDialog />;
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Submit your bot</CardTitle>
                <Dialog onOpenChange={() => setImportId(null)}>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={"secondary"} size={"icon"}>
                                            <ArrowDownTrayIcon className="w-5 h-5" />
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
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    <img
                                        alt="dlist.gg"
                                        src="/ext/dlistgg.svg"
                                        draggable={false}
                                        className="h-5 w-5 mr-2 dark:invert-0 invert"
                                    />
                                    dlist.gg
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem disabled aria-disabled>
                                <img
                                    alt="top.gg"
                                    src="/ext/topgg.png"
                                    className="h-5 w-5 mr-2"
                                />
                                top.gg
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex gap-2 items-center">
                                Import bot from dlist.gg{" "}
                                <img
                                    alt="dlist.gg"
                                    src="/ext/dlistgg.svg"
                                    className="h-5 w-5 mr-2 dark:invert-0 invert"
                                />
                            </DialogTitle>
                            <DialogDescription>
                                Import a bot from dlist.gg introducing bot's ID below.
                            </DialogDescription>
                            <Input
                                onChange={(e) => setImportId(e.target.value)}
                                defaultValue={importId ?? ""}
                                required
                                placeholder="Bot ID"
                            />
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                disabled={!importId || importResult.called}
                                onClick={() => importBot()}
                                className="w-full"
                            >
                                {importResult.loading ? <Loader /> : "Submit"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {result.loading ? (
                    <Loader />
                ) : (
                    <AutoForm
                        values={values}
                        onParsedValuesChange={setValues}
                        onSubmit={() => onSubmit(values)}
                        fieldConfig={{
                            id: {
                                description: (
                                    <Link
                                        href="https://discord.com/developers/applications"
                                        target="_blank"
                                        className="flex items-center text-primary underline hover:text-primary/80"
                                    >
                                        <ArrowUpRightIcon className="mr-1 w-4 h-4" />
                                        Get the ID
                                    </Link>
                                ),
                                inputProps: {
                                    placeholder: "E.g: 9999999999999999",
                                    autoComplete: "off",
                                },
                            },
                            shortDescription: {
                                description: (
                                    <div className="flex items-center text-muted-foreground">
                                        <DocumentTextIcon className="mr-1 w-4 h-4" />
                                        Min. 25, Max. 250
                                    </div>
                                ),
                                fieldType: "textarea",
                                inputProps: {
                                    placeholder:
                                        "E.g: An amazing bot who has this features, short",
                                    autoComplete: "off",
                                },
                            },
                            prefix: {
                                description: (
                                    <div className="flex items-center text-muted-foreground">
                                        <CommandLineIcon className="mr-1 w-4 h-4" />
                                        Leave in blank if you only accept slash commands
                                    </div>
                                ),
                                inputProps: {
                                    placeholder: "E.g: !!",
                                    autoComplete: "off",
                                },
                            },
                            tags: {
                                description: (
                                    <div className="flex items-center text-muted-foreground">
                                        <TagIcon className="mr-1 w-4 h-4" />
                                        Select up to 4 tags
                                    </div>
                                ),
                                inputProps: {
                                    placeholder: "E.g: Fun, Moderation",
                                    autoComplete: "off",
                                },
                            },
                            description: {
                                fieldType: "textarea",
                                inputProps: {
                                    maxLength: 2000,
                                    className: "font-mono",
                                },
                            },
                        }}
                        formSchema={formSchema}
                    >
                        <AutoFormSubmit className="w-full">Submit</AutoFormSubmit>
                    </AutoForm>
                )}
            </CardContent>
            <CardFooter>
                <p className="text-sm">
                    Labels with <span className="text-destructive">*</span> are mandatory.
                </p>
            </CardFooter>
        </Card>
    );
}