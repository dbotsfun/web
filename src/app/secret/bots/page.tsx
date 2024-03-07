"use client";

import ApprovedBotsActions from "@/components/shared/bots/panel-actions/approved-bots";
import DeniedBotsActions from "@/components/shared/bots/panel-actions/denied-bots";
import PendingBotsActions from "@/components/shared/bots/panel-actions/pending-bots";
import LoadingScreen from "@/components/shared/common/loading-screen";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { BotStatus, usePanelBotsQuery } from "@/lib/apollo/types";
import { avatar } from "@/lib/utils";
import {
	ArrowPathIcon,
	CheckCircleIcon,
	ClockIcon,
	FaceFrownIcon,
	FunnelIcon,
	XCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface Filters {
	status: BotStatus;
	query?: string
}

const statusIcons: Record<string, ReactNode> = {
	APPROVED: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
	PENDING: <ClockIcon className="w-5 h-5 text-orange-500" />,
	DENIED: <XCircleIcon className="w-5 h-5 text-red-500" />
}

export default function Page() {
	const [filters, setFilters] = useState<Filters>({
		status: BotStatus.All,
		query: undefined
	});
	const {
		data: bots,
		loading,
		refetch,
	} = usePanelBotsQuery({
		variables: {
			filters
		},
		onError: (err) => toast.error(err.message)
	});

	useEffect(() => {
		refetch({
			filters
		});
	}, [filters]);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex justify-between w-full items-center sticky top-24 bg-background/10 backdrop-blur z-10 p-3 rounded-xl">
				<Input onChange={(e) => setFilters({ query: e.currentTarget.value === "" ? undefined : e.currentTarget.value, status: filters.status })} className="w-1/4" placeholder="Search bots" />
				<div className="flex gap-2 items-center">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant={"secondary"}><FunnelIcon className="w-5 h-5 mr-2" />Filters</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Status</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup value={filters.status} onValueChange={(v) => setFilters({ status: v as BotStatus })}>
								<DropdownMenuRadioItem value={BotStatus.All}>All</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value={BotStatus.Approved}>Approved</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value={BotStatus.Denied}>Denied</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value={BotStatus.Pending}>Pending</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button onClick={() => refetch({
						filters
					})} size={"icon"} variant={"secondary"}><ArrowPathIcon className="w-5 h-5" /></Button>
				</div>
			</div>
			{loading ? (
				<LoadingScreen />
			) : bots?.bots.nodes?.length ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Bot</TableHead>
							<TableHead>Owner</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{bots.bots.nodes.map((bot) => (
							<TableRow key={bot.id}>
								<TableCell>
									<Link href={`/bot/${bot.id}`} className="flex flex-row items-center gap-2">
										<img
											alt="bot avatar"
											src={avatar(bot.avatar, bot.id)}
											className="w-7 h-7 rounded-full"
										/>
										{bot.name}
									</Link>
								</TableCell>
								<TableCell>
									<Link href={`/user/${bot.owners[0].id}`} className="flex flex-row items-center gap-2">
										<img
											alt="bot avatar"
											src={avatar(bot.owners[0].avatar, bot.owners[0].id)}
											className="w-7 h-7 rounded-full"
										/>
										{bot.owners[0].username}
									</Link>
								</TableCell>
								<TableCell>
									<div className="flex flex-row items-center gap-2">
										{statusIcons[bot.status]} {bot.status}
									</div>
								</TableCell>
								<TableCell className="justify-end flex">
									{bot.status === "APPROVED" ? (
										<ApprovedBotsActions id={bot.id} />
									) : bot.status === "DENIED" ? (
										<DeniedBotsActions id={bot.id} />
									) : (
										<PendingBotsActions id={bot.id} />
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<div className="flex items-center justify-center h-32 font-bold text-red-500">
					<FaceFrownIcon className="w-5 mr-2" /> No{" "}
					{filters.status.toLowerCase()} bots
				</div>
			)}
		</div>
	);
}
