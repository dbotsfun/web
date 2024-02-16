"use client";

import SkeletonCard from "@/components/shared/bots/cards/skeleton";
import Bots from "@/components/shared/bots/list/bots";
import Loader from "@/components/shared/common/loader";
import BotsGrid from "@/components/shared/grids/bots";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BotOrderField, OrderDirection, useExploreBotsQuery, useTagsQuery } from "@/lib/apollo/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectIcon } from "@radix-ui/react-select";
import { ArrowDown01Icon, ArrowUp01Icon, ChevronUpIcon, ClockIcon, MessageCircleIcon, RotateCcwIcon, SandwichIcon, ServerIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"

const filterFormSchema = z.object({
    tag: z.string(),
    orderBy: z.object({
        direction: z.custom<OrderDirection>(),
        field: z.custom<BotOrderField>()
    })
})

export default function Page() {
    const [enable, setEnable] = useState(true)
    const filters = useForm<z.infer<typeof filterFormSchema>>({
        resolver: zodResolver(filterFormSchema),
        defaultValues: {
            tag: "no_tag",
            orderBy: {
                direction: OrderDirection.Desc,
                field: BotOrderField.CreatedAt
            }
        },
    })

    const { data: tags, loading: tagsLoading } = useTagsQuery()
    const { data: bots, loading: botsLoading, refetch: refetchBots } = useExploreBotsQuery({
        variables: {
            filters: {
                tags: undefined,
                orderBy: {
                    direction: OrderDirection.Desc,
                    field: BotOrderField.CreatedAt
                }
            }
        }
    })

    function onSubmit(values: z.infer<typeof filterFormSchema>) {
        const loadToastId = toast.loading("Wait...")
        refetchBots({
            filters: {
                tags: values.tag === "no_tag" ? undefined : [values.tag],
                orderBy: values.orderBy
            }
        }).then(() => {
            toast.success("Updated filters", {
                id: loadToastId,
                duration: 2_000
            })
            setEnable(false)
        })
    }
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">Explore bots</h1>
            <div className="flex flex-col lg:flex-row gap-5">
                <Card className="w-full lg:w-1/3 h-1/4 sticky top-24">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>
                            Filters
                        </CardTitle>
                        <Button size={"icon"} variant={"secondary"}>
                            <RotateCcwIcon className="w-5 h-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="h-96">
                        <Form {...filters}>
                            <form onChange={() => setEnable(true)} onSubmit={filters.handleSubmit(onSubmit)} className="flex flex-col h-full justify-between">
                                <div className="flex flex-col gap-3">
                                    <FormField
                                        control={filters.control}
                                        name="tag"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tag</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a tag" />
                                                            {tagsLoading && <SelectIcon>
                                                                <Loader />
                                                            </SelectIcon>}
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value={"no_tag"}>No tag</SelectItem>
                                                            {tags?.tags.nodes?.map(t => <SelectItem value={t.name}>{t.name}</SelectItem>)}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={filters.control}
                                        name="orderBy.direction"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Direction</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={"desc"}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a tag" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value={"desc"}><div className="flex items-center gap-2"><ArrowDown01Icon className="w-4 h-4" /> Descendant</div></SelectItem>
                                                            <SelectItem value={"asc"}><div className="flex items-center gap-2"><ArrowUp01Icon className="w-4 h-4" /> Ascendant</div></SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={filters.control}
                                        name="orderBy.field"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Order</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={"createdAt"}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a tag" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value={"createdAt"}><div className="flex items-center gap-2"><ClockIcon className="w-4 h-4" /> Creation date</div></SelectItem>
                                                            <SelectItem value={"guildCount"}><div className="flex items-center gap-2"><ServerIcon className="w-4 h-4" /> Guilds</div></SelectItem>
                                                            <SelectItem value={"reviews"}><div className="flex items-center gap-2"><MessageCircleIcon className="w-4 h-4" /> Reviews</div></SelectItem>
                                                            <SelectItem value={"votes"}><div className="flex items-center gap-2"><ChevronUpIcon className="w-4 h-4" /> Votes</div></SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button disabled={!enable} type="submit" className="w-full">Save</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <div className="w-full">
                    {botsLoading ? <BotsGrid gap={0}>{[...Array(4)].map((_, key) => <SkeletonCard key={key} />)}</BotsGrid> : bots?.bots.nodes?.length ? <BotsGrid columns={{ lg: 3 }} gap={2} ><Bots bots={bots?.bots.nodes} /></BotsGrid> : <div className="flex items-center justify-center h-32 text-red-500">
                        <SandwichIcon className="w-5 mr-2" /> No bots found
                    </div>}
                </div>
            </div>
        </div>
    )
}