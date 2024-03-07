"use client";

import Loader from "@/components/shared/common/loader";
import LoadingScreen from "@/components/shared/common/loading-screen";
import LoginDialog from "@/components/shared/common/login-dialog";
import { Badge } from "@/components/ui/badge";
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
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    useTagsQuery,
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
import { ArrowDownTrayIcon, CheckIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    id: z
        .string({
            required_error: "ID is required."
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
    tags: z.array(z.object({
        id: z.string(),
    })).describe("Tags").min(1, {
        message: "Must enter at least 1 tag"
    }).max(4, {
        message: "Must enter less or equal to 4 tags"
    }),
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
    coOwners: z.string().optional(),
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
    const [importId, setImportId] = useState<string | null>();
    const [formTags, setFormTags] = useState<string[]>([]);

    const { data: auth, loading: gettingUser } = useSession();
    const { data: tags } = useTagsQuery();
    const [submit, result] = useCreateBotMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { setValue } = form;

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
                    tags: formTags,
                    website: values.website,
                    owners: values.coOwners ? values.coOwners.replace(/\s/g, "").split(",") : undefined
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
        setValue("tags", formTags.map(x => ({ id: x })));
    }, [formTags])

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
                <CardTitle className="flex items-center gap-2">Submit your bot <Badge>BETA FORM</Badge></CardTitle>
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID <RequiredMark /></FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription className="flex items-center justify-between">
                                        <p>Get your bot's id from the developer portal</p>
                                        {field.value?.length >= 18 && <CheckIcon className="w-4 h-4 text-green-500" />}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="shortDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short description <RequiredMark /></FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormDescription className="flex items-center justify-between">
                                        <p>Minimum {BOT_SHORT_DESCRIPTION_MIN_LENGTH}, maximum {BOT_SHORT_DESCRIPTION_MAX_LENGTH}</p>
                                        {field.value?.length >= BOT_SHORT_DESCRIPTION_MIN_LENGTH && <CheckIcon className="w-4 h-4 text-green-500" />}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={() => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel className="text-left">Tags <RequiredMark /></FormLabel>
                                    <FormControl>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Input value={formTags.length >= 1 ? formTags.join(", ") : "Select up to 4 tags"} readOnly aria-readonly />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" side="bottom" className="w-80">
                                                <DropdownMenuLabel>Tags</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {tags?.tags.nodes?.map(tag => <DropdownMenuCheckboxItem
                                                    disabled={!formTags.includes(tag.name) && formTags.length >= 4}
                                                    checked={formTags.includes(tag.name)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) setFormTags([...formTags, tag.name])
                                                        else setFormTags([...formTags.filter(t => t !== tag.name)]);
                                                    }}
                                                >
                                                    {tag.name}
                                                </DropdownMenuCheckboxItem>)}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </FormControl>
                                    <FormDescription className="flex items-center justify-between w-full">
                                        <p>Beta selector</p>
                                        {formTags.length >= 1 && <CheckIcon className="w-4 h-4 text-green-500" />}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description <RequiredMark /></FormLabel>
                                    <FormControl>
                                        <Textarea rows={10} {...field} />
                                    </FormControl>
                                    <FormDescription className="flex items-center justify-between">
                                        <p>Minimum {BOT_DESCRIPTION_MIN_LENGTH}, maximum {BOT_DESCRIPTION_MAX_LENGTH}, allows markdown</p>
                                        {field.value?.length >= BOT_DESCRIPTION_MIN_LENGTH && <CheckIcon className="w-4 h-4 text-green-500" />}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="coOwners"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Co-owners</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Extra bot owners, separated by commas (or it will not work, <strong>only IDs</strong>)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p className="text-sm">
                    Labels with <RequiredMark /> are mandatory.
                </p>
            </CardFooter>
        </Card>
    );
}

function RequiredMark() {
    return <span className="text-destructive">*</span>
}