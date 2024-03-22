"use client";

import ImageWithFallback from "@/components/shared/common/image-with-fallback";
import Loader from "@/components/shared/common/loader";
import LoadingScreen from "@/components/shared/common/loading-screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBotQuery, useTagsQuery, useUpdateBotMutation, useUserBotsLazyQuery } from "@/lib/apollo/types";
import { BOT_DESCRIPTION_MAX_LENGTH, BOT_DESCRIPTION_MIN_LENGTH, BOT_PREFIX_MAX_LENGTH, BOT_PREFIX_MIN_LENGTH, BOT_SHORT_DESCRIPTION_MAX_LENGTH, BOT_SHORT_DESCRIPTION_MIN_LENGTH } from "@/lib/constants";
import { useSession } from "@/lib/hooks/use-session";
import { PermissionFlags } from "@/lib/types/permissions";
import { avatar, hasPermissions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CheckIcon } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
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
    }).max(5, {
        message: "Must enter less or equal to 5 tags"
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

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [formTags, setFormTags] = useState<string[]>([]);
    const { data: user, loading: gettingAuth } = useSession();
    const { data: tags } = useTagsQuery();
    const { data, loading: gettingBot } = useBotQuery({
        variables: {
            id: params.id
        }
    })
    const [getUserBots, { data: userBots, loading: gettingUserBots }] = useUserBotsLazyQuery()
    const [updateBot, { loading: updatingBot }] = useUpdateBotMutation({
        onCompleted: (data) => toast.success(`Successfully edited ${data.updateBot.name}`),
        onError: (error) => toast.error(error.message)
    })

    useEffect(() => {
        if (user) getUserBots({ variables: { userId: user.me.user.id } })
    }, [user])

    useEffect(() => {
        if (userBots) userBots.user.bots.nodes?.map(b => router.prefetch(`/bot/${b.id}/edit`))
    }, [userBots])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { setValue } = form;

    function onSubmit(values: Partial<z.infer<typeof formSchema>>) {
        updateBot({
            variables: {
                input: {
                    id: bot.id,
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

    useEffect(() => {
        setValue("tags", formTags.map(x => ({ id: x })));
    }, [formTags])

    useEffect(() => {
        if (data?.getBot && user && data.getBot.tags.length > 0) {
            setFormTags(data.getBot.tags)

            setValue("coOwners", bot.owners.map(o => o.id).join(", ")!)
            setValue("description", bot.description!)
            setValue("prefix", bot.prefix!)
            setValue("shortDescription", bot.shortDescription!)
        }
    }, [data?.getBot, user])

    if (gettingAuth || gettingBot || updatingBot) return <LoadingScreen />
    if (!user || !data?.getBot) return notFound()
    if (!hasPermissions(data.getBot.userPermissions, user.me.user.id, PermissionFlags.Administrator)) return notFound() // wip loololol

    const bot = data.getBot;
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold">Edit</h1>
                {gettingUserBots ? <Loader /> : <Select onValueChange={(v) => router.replace(`/bot/${v}/edit`)} defaultValue={bot.id}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Quick edit bots" />
                    </SelectTrigger>
                    <SelectContent>
                        {userBots?.user.bots.nodes?.map(b => <SelectItem value={b.id}>
                            <div className="flex items-center gap-2">
                                <ImageWithFallback width={40} height={40} src={avatar(b.avatar, b.id)} className="w-5 h-5 flex rounded-full" alt="bot avatar" /> {b.name}
                            </div>
                        </SelectItem>)}
                    </SelectContent>
                </Select>}
            </div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        Editing {bot.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="shortDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short description <RequiredMark /></FormLabel>
                                        <FormControl>
                                            <Textarea defaultValue={bot.shortDescription!} {...field} />
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
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild>
                                                    <Input value={formTags.length >= 1 ? formTags.join(", ") : "Select up to 5 tags"} readOnly aria-readonly />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" side="bottom" className="w-80">
                                                    <DropdownMenuLabel>Tags</DropdownMenuLabel>
                                                    <ScrollArea className="h-72">
                                                        <DropdownMenuSeparator />
                                                        {tags?.tags.nodes?.map(tag => <DropdownMenuCheckboxItem
                                                            disabled={!formTags.includes(tag.name) && formTags.length >= 5}
                                                            checked={formTags.includes(tag.name)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) setFormTags([...formTags, tag.name])
                                                                else setFormTags([...formTags.filter(t => t !== tag.name)]);
                                                            }}
                                                        >
                                                            {tag.name}
                                                        </DropdownMenuCheckboxItem>)}
                                                    </ScrollArea>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormControl>
                                        <FormDescription className="flex items-center justify-between w-full">
                                            <p className="cursor-pointer" onClick={() => setFormTags([])}>Clear tags</p>
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
                                            <Textarea defaultValue={bot.description!} rows={10} {...field} />
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
                                            <Input defaultValue={bot.owners.filter(o => o.id !== user.me.user.id).map(o => o.id).join(", ")!} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Extra bot owners, separated by commas (or it will not work, <strong>only IDs</strong>)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="prefix"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prefix</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={bot.prefix!} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            <p>Minimum {BOT_PREFIX_MIN_LENGTH}, maximum {BOT_PREFIX_MAX_LENGTH} (if provided)</p>
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
        </div>
    )
}

function RequiredMark() {
    return <span className="text-destructive">*</span>
}