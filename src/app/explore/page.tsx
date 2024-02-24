"use client";

import SkeletonCard from "@/components/shared/bots/cards/skeleton";
import Bots from "@/components/shared/bots/list/bots";
import BotsGrid from "@/components/shared/grids/bots";
import AnimatedNumber from "@/components/ui/animated-number";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BotOrderField, OrderDirection, useBotCountQuery, useExploreBotsQuery, useTagsQuery } from "@/lib/apollo/types";
import { BarsArrowDownIcon, BarsArrowUpIcon, ChatBubbleLeftRightIcon, ChevronUpIcon, ClockIcon, FaceFrownIcon, ServerStackIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const [tag, setTag] = useState<string | undefined>(undefined)
    const [dir, setDir] = useState<OrderDirection | undefined>(OrderDirection.Desc)
    const [field, setField] = useState<BotOrderField | undefined>(BotOrderField.Votes)
    const [q, setQ] = useState<string | undefined>(undefined)

    const { data: tags } = useTagsQuery()
    const { data: botCount } = useBotCountQuery()
    const { data: bots, loading: botsLoading, refetch: refetchBots } = useExploreBotsQuery({
        variables: {
            filters: {
                tags: undefined,
                query: q && q.length >= 3 ? q : undefined,
                orderBy: {
                    direction: OrderDirection.Desc,
                    field: BotOrderField.Votes
                }
            }
        }
    })

    function changeFilters() {
        refetchBots({
            filters: {
                tags: tag === "all" || !tag ? undefined : [tag],
                query: q && q.length >= 3 ? q : undefined,
                orderBy: {
                    direction: dir ?? OrderDirection.Desc,
                    field: field ?? BotOrderField.Votes
                }
            }
        })
    }

    useEffect(() => {
        changeFilters()
        toast.success("Updated filters")
    }, [tag, dir, field])

    useEffect(() => {
        if (q && q.length >= 3) changeFilters()
    }, [q])
    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">Explore</h1>
            <span className="text-muted-foreground text-sm mb-2">Currently, there are <AnimatedNumber value={botCount?.bots.totalCount ?? 0} /> bots listed</span>
            <div className="flex flex-col lg:flex-row gap-5">
                <Card className="w-full lg:w-1/3 h-full sticky top-24">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-96">
                        <form className="flex flex-col h-full justify-between">
                            <div className="flex flex-col gap-3">
                                <Label>Tag</Label>
                                <Select onValueChange={(e) => setTag(e)} defaultValue={tag ?? "all"} value={tag}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a tag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={"all"}>All</SelectItem>
                                            {tags?.tags.nodes?.map(t => <SelectItem disabled={t.bots.totalCount === 0} className="flex items-center" value={t.name}>
                                                {t.name} <span className="text-muted-foreground ml-auto">{t.bots.totalCount}</span>
                                            </SelectItem>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Label>Direction</Label>
                                <Select onValueChange={(e) => setDir(e as OrderDirection)} defaultValue={dir ?? "desc"} value={dir}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a direction" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={"asc"}><div className="flex items-center gap-2"><BarsArrowUpIcon className="w-4 h-4" /> Ascendant</div></SelectItem>
                                            <SelectItem value={"desc"}><div className="flex items-center gap-2"><BarsArrowDownIcon className="w-4 h-4" /> Descendant</div></SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Label>Order</Label>
                                <Select onValueChange={(e) => setField(e as BotOrderField)} defaultValue={field ?? "votes"} value={field}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a tag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={"votes"}><div className="flex items-center gap-2"><ChevronUpIcon className="w-4 h-4" /> Votes</div></SelectItem>
                                            <SelectItem value={"createdAt"}><div className="flex items-center gap-2"><ClockIcon className="w-4 h-4" /> Creation date</div></SelectItem>
                                            <SelectItem value={"guildCount"}><div className="flex items-center gap-2"><ServerStackIcon className="w-4 h-4" /> Guilds</div></SelectItem>
                                            <SelectItem value={"reviews"}><div className="flex items-center gap-2"><ChatBubbleLeftRightIcon className="w-4 h-4" /> Reviews</div></SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="w-full">
                    <Input defaultValue={q} onChange={(e) => setQ(e.currentTarget.value)} placeholder="Search for bots" className="h-12 px-4 mb-4 focus-visible:!ring-background focus-visible:!ring-offset-primary" />
                    {botsLoading ? <BotsGrid columns={{ lg: 3 }} gap={2}>{[...Array(6)].map((_, key) => <SkeletonCard key={key} />)}</BotsGrid> : bots?.bots.nodes?.length ? <BotsGrid columns={{ lg: 3 }} gap={2}><Bots bots={bots?.bots.nodes} /></BotsGrid> : <div className="flex items-center justify-center h-32 font-bold text-red-500">
                        <FaceFrownIcon className="w-5 mr-2" /> No bots found
                    </div>}
                </div>
            </div>
        </div>
    )
}