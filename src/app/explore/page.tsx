"use client";

import Bots from "@/components/shared/bots/list/bots";
import SkeletonCard from "@/components/shared/cards/skeleton";
import BotsGrid from "@/components/shared/grids/bots";
import AnimatedNumber from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
	BotOrderField,
	OrderDirection,
	useBotCountQuery,
	useExploreBotsQuery,
	useTagsQuery,
} from "@/lib/apollo/types";
import { NetworkStatus } from "@apollo/client";
import {
	ChatBubbleLeftRightIcon,
	ChevronUpIcon,
	ClockIcon,
	FaceFrownIcon,
	ServerStackIcon,
	XMarkIcon,
} from "@heroicons/react/20/solid";
import { isNullOrUndefinedOrEmpty, objectEntries } from "@sapphire/utilities"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const orderFields = ["votes", "guildCount", "reviews", "createdAt", "updatedAt"] as readonly [string, ...string[]]
const orderDirections = ["desc", "asc"] as readonly [string, ...string[]]

const filtersSchema = z.object({
	tag: z.string().optional(),
	dir: z.enum(orderDirections) as z.ZodType<OrderDirection>,
	field: z.enum(orderFields) as z.ZodType<BotOrderField>,
	query: z.string().optional()
})

//! WIP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DO NOT TOUCH!!!
// TODO: Optimize this and also make it query-friendly (e.g: dbots.fun/explore?q=Hir&t=Fun)
export default function Page() {
	const router = useRouter()
	const searchQuery = useSearchParams()
	// TODO 👇
	const [filters, setFilters] = useState<z.infer<typeof filtersSchema>>({
		tag: undefined,
		dir: OrderDirection.Desc,
		field: BotOrderField.Votes,
		query: undefined

	});

	function updateQueryFilters(values: { query: string, value: string | undefined }[]) {
		const newUrl = new URL(window.location.href);
		values.map((v) => !v.value ? null : newUrl.searchParams.set(v.query, v.value))
		router.push(newUrl.toString());
	}

	const { data: tags } = useTagsQuery();
	const { data: botCount } = useBotCountQuery();
	const {
		data: bots,
		loading: botsLoading,
		refetch: refetchBots,
		networkStatus,
	} = useExploreBotsQuery({
		notifyOnNetworkStatusChange: true,
		fetchPolicy: "network-only",
		variables: {
			first: 9,
			filters: {
				tags: undefined,
				query: isNullOrUndefinedOrEmpty(filters.query) ? undefined : filters.query,
				orderBy: {
					direction: OrderDirection.Desc,
					field: BotOrderField.Votes,
				},
			},
		},
	});

	const loading =
		networkStatus === NetworkStatus.refetch ||
		networkStatus === NetworkStatus.loading ||
		botsLoading;

	function updateFilters() {
		refetchBots({
			filters: {
				tags: filters.tag === "all" || !filters.tag ? undefined : [filters.tag],
				query: isNullOrUndefinedOrEmpty(filters.query) ? undefined : filters.query,
				orderBy: {
					direction: filters.dir ?? OrderDirection.Desc,
					field: filters.field ?? BotOrderField.Votes,
				},
			},
		});

		updateQueryFilters(
			objectEntries(filters).map(x => ({ query: x[0] as string, value: x[1] as string }))
		)
	}

	useEffect(() => {
		setFilters({
			dir: searchQuery.get("dir") as OrderDirection ?? filters.dir,
			field: searchQuery.get("field") as BotOrderField ?? filters.field,
			query: searchQuery.get("q") ?? undefined,
			tag: searchQuery.get("tag") ?? "all"
		})
	}, [])

	useEffect(() => {
		updateFilters()
	}, [filters])
	return (
		<div className="flex flex-col gap-1">
			<h1 className="text-3xl font-bold flex items-center gap-2">Explore <Badge>WIP</Badge></h1>
			<span className="text-muted-foreground text-sm mb-2">
				Currently, there are{" "}
				<AnimatedNumber value={botCount?.bots.totalCount ?? 0} /> bots listed
			</span>
			<div className="flex flex-col lg:flex-row gap-5">
				<Card className="w-full lg:w-1/3 h-full relative lg:sticky top-24 hidden lg:block">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Filters</CardTitle>
					</CardHeader>
					<CardContent className="h-96 flex-col flex gap-3">
						<div className="">
							<Label>Tag</Label>
							<Select value={filters.tag} onValueChange={(tag) => setFilters({
								...filters,
								tag
							})}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a tag" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Tags</SelectLabel>
										<SelectItem value="all">All</SelectItem>
										{tags?.tags.nodes?.map(t => <SelectItem
											key={t.name}
											disabled={t.bots.totalCount === 0}
											value={t.name}
										>
											{t.name}
										</SelectItem>)}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="">
							<Label>Field</Label>
							<Select value={filters.field} onValueChange={(field) => setFilters({
								...filters,
								field: field as BotOrderField
							})}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a field" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Fields</SelectLabel>
										<SelectItem value={"votes"}>
											<div className="flex items-center gap-2">
												<ChevronUpIcon className="w-4 h-4" /> Votes
											</div>
										</SelectItem>
										<SelectItem value={"createdAt"}>
											<div className="flex items-center gap-2">
												<ClockIcon className="w-4 h-4" /> Creation date
											</div>
										</SelectItem>
										<SelectItem value={"guildCount"}>
											<div className="flex items-center gap-2">
												<ServerStackIcon className="w-4 h-4" /> Guilds
											</div>
										</SelectItem>
										<SelectItem value={"reviews"}>
											<div className="flex items-center gap-2">
												<ChatBubbleLeftRightIcon className="w-4 h-4" />{" "}
												Reviews
											</div>
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="">
							<Label>Direction</Label>
							<Select value={filters.dir} onValueChange={(dir) => setFilters({
								...filters,
								dir: dir as OrderDirection
							})}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a direction" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Directions</SelectLabel>
										<SelectItem
											value={"asc"}
										>
											Ascendant
										</SelectItem>
										<SelectItem
											value={"desc"}
										>
											Descendant
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</CardContent>
				</Card>
				<div className="w-full">
					<div className="flex flex-row gap-1">
						<Input
							value={filters.query ?? undefined}
							onChange={(e) => setFilters({
								...filters,
								query: e.target.value
							})}
							placeholder="Search for bots"
							className="h-12 px-4 mb-4 focus-visible:!ring-background focus-visible:!ring-offset-primary"
						/>
						{filters.query && (
							<Button
								onClick={() => setFilters({
									...filters,
									query: undefined
								})}
								className="h-12 w-12 animate-in fade-in slide-in-from-bottom"
								size={"icon"}
							>
								<XMarkIcon className="w-5 h-5" />
							</Button>
						)}
					</div>
					{loading ? (
						<BotsGrid columns={{ lg: 3 }} gap={2}>
							{[...Array(20)].map((_, key) => (
								<SkeletonCard key={key} />
							))}
						</BotsGrid>
					) : bots?.bots.nodes?.length ? (
						<>
							<BotsGrid columns={{ lg: 3, md: 2, xl: 4 }} gap={2}>
								<Bots bots={bots?.bots.nodes} />
							</BotsGrid>
						</>
					) : (
						<div className="flex items-center justify-center h-32 font-bold text-red-500">
							<FaceFrownIcon className="w-5 mr-2" /> No bots found {filters.tag && `with the tag ${filters.tag}`}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
