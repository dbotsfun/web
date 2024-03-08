"use client";

import Listing from "@/components/shared/bots/list/base";
import Bots from "@/components/shared/bots/list/bots";
import { Input } from "@/components/ui/input";

import TagButton from "@/components/shared/common/tag-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFrontBotsQuery, useTagsQuery } from "@/lib/apollo/types";
import {
	ArrowPathRoundedSquareIcon,
	ArrowTrendingUpIcon,
	ClockIcon,
	FireIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useClickAway, useLocalStorage } from "react-use";

export default function Page() {
	const err = useSearchParams().get("err");
	const { data: bots, loading: botsLoading } = useFrontBotsQuery();
	const { data: tags } = useTagsQuery({
		variables: {
			first: 9
		}
	});

	const searchRef = useRef(null);
	const [history, setHistory] = useLocalStorage<string[]>("history", []);
	const [query, setQuery] = useState<string | null>();
	const [focus, setFocus] = useState<boolean>(false);

	if (history?.length! >= 5) history?.shift();

	useClickAway(searchRef, () => setFocus(false));
	return (
		<>
			{err && (
				<Alert className="my-4" variant={"destructive"}>
					<AlertDescription>{err}</AlertDescription>
				</Alert>
			)}
			<div className="w-full relative">
				<div className="relative grid items-center gap-0 no-animation md:grid-cols-2 z-30 py-10">
					<div className="overflow-x-hidden text-center md:text-left md:overflow-x-visible">
						<h1 className="lg:text-7xl text-3xl font-black">
							discord<span className="text-primary">bots</span>
						</h1>
						<p className="text-muted-foreground lg:text-base text-sm">
							Zero-profit website featuring new Discord bots every week.
						</p>
						<div className="flex flex-col gap-5 mt-5">
							<div className="relative" ref={searchRef}>
								<div className="relative w-full flex gap-2 items-center">
									<Input
										value={query ?? ""}
										onFocus={() => setFocus(true)}
										onKeyDown={(e) => {
											if (e.key === "Enter" && e.currentTarget.value.length)
												setHistory([...history!, e.currentTarget.value]);
										}}
										onChange={(e) => setQuery(e.currentTarget.value)}
										placeholder="Start typing to see popover"
										className="h-12 duration-150 px-4 focus-visible:!ring-background focus-visible:!ring-offset-primary"
									/>
									<Button size={"icon"} className="h-12 w-12 rounded-lg">
										<MagnifyingGlassIcon className="w-6 h-6" />
									</Button>
								</div>
								{focus && (
									<div className="absolute lg:flex hidden mt-2 left-0 w-full bg-card rounded-md shadow-lg z-[9999] animate-in fade-out fade-in slide-in-from-bottom-2 slide-out-from-top">
										<div className="text-left break-all w-full flex flex-col space-y-2 py-4">
											<div>
												<div className="flex justify-between items-center">
													<p className="text-muted-foreground px-4 text-xs mb-2">
														Search History
													</p>
													<button
														onClick={() => setHistory([])}
														className="text-muted-foreground px-4 text-xs mb-2"
													>
														Clear
													</button>
												</div>
												<div className="px-4 py-2">
													{history?.length
														? history?.map((h, key) => (
															<Link
																key={key}
																href={`/explore?q=${h.toLowerCase()}`}
															>
																<div className="w-full flex items-center justify-start hover:bg-dark-1/20 transition-all duration-200 cursor-pointer">
																	<ArrowPathRoundedSquareIcon className="w-5 h-5 flex items-center justify-center text-muted-foreground" />
																	<span className="line-clamp-1 ml-2">
																		{h}
																	</span>
																</div>
															</Link>
														))
														: "No search history"}
												</div>
											</div>
											<Separator className="bg-accent" />
											<div className="space-y-2 py-4">
												<p className="text-muted-foreground px-4 text-sm mb-2">
													Search Results
												</p>
											</div>
										</div>
									</div>
								)}
							</div>
							{tags?.tags.nodes?.length && (
								<div className="flex flex-wrap items-center gap-2 w-full animate-in fade-in slide-in-from-bottom-3">
									{tags.tags.nodes.map((t) => (
										<TagButton
											key={t.name}
											tag={t.name}
											count={t.bots.totalCount.toString()}
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<Listing
				loading={botsLoading}
				title="Most voted bots"
				subtext="This month's most voted bots"
				Icon={FireIcon}
				list={
					bots?.voted.nodes?.length ? (
						<Bots bots={bots?.voted.nodes} />
					) : undefined
				}
			/>
			<Listing
				loading={botsLoading}
				title="Most rated bots"
				subtext="This month's most rated bots"
				Icon={ArrowTrendingUpIcon}
				list={
					bots?.rated.nodes?.length ? (
						<Bots bots={bots.rated.nodes} />
					) : undefined
				}
			/>
			<Listing
				loading={botsLoading}
				title="Most recent bots"
				subtext="Most recent bots"
				Icon={ClockIcon}
				list={
					bots?.recent.nodes?.length ? (
						<Bots bots={bots?.recent.nodes} />
					) : undefined
				}
			/>
		</>
	);
}
