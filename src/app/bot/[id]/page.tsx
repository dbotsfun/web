"use client";

import CertifiedIcon from "@/components/shared/bots/certified-icon";
// import DlistIcon from "@/components/shared/bots/dlist-icon";
import BotDangerZone from "@/components/shared/bots/sections/panel/danger";
import BotDeveloper from "@/components/shared/bots/sections/panel/developer";
import BotSync from "@/components/shared/bots/sections/panel/sync";
// import BotWebhooks from "@/components/shared/bots/sections/panel/webhooks";
import ImageWithFallback from "@/components/shared/common/image-with-fallback";
import LoadingScreen from "@/components/shared/common/loading-screen";
import MD from "@/components/shared/common/md";
import TagButton from "@/components/shared/common/tag-button";
import Policy from "@/components/shared/policy";
import { Alert, AlertTitle } from "@/components/ui/alert";
import AnimatedNumber from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useBotQuery } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/use-session";
import { avatar, defaultInviteLink } from "@/lib/utils";
import {
	ChatBubbleLeftRightIcon,
	ChevronUpIcon,
	Cog6ToothIcon,
	InformationCircleIcon,
	PaperAirplaneIcon,
	PlusIcon,
	StarIcon,
	TagIcon,
	UsersIcon,
} from "@heroicons/react/20/solid";
import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import { notFound } from "next/navigation";

// {bot.importedFrom === "DISCORD_LIST" && <DlistIcon />} Is chiko really dumb?

export default function Page({ params }: { params: { id: string } }) {
	const { data: user } = useSession();
	const { data, loading, error } = useBotQuery({
		variables: {
			id: params.id,
		},
	});

	if (loading) return <LoadingScreen />;
	if (error) return notFound(); // if there is an error, bot will be null anyways so

	const bot = data?.getBot!;
	const isOwner = !!bot.owners.find((u) => u.id === user?.me.user.id);
	return (
		<>
			{bot.status !== "APPROVED" && <Alert className="bg-orange-500/10 border-orange-500 text-orange-500">
				<AlertTitle className="flex items-center gap-1"><InformationCircleIcon className="mr-1 w-6 h-6" /> This bot is actually <strong>{bot.status}</strong> and only you can view it.</AlertTitle>
			</Alert>}
			<div className="flex flex-col gap-5 mb-5">
				<div className="flex flex-col gap-3 md:flex-row w-full justify-between items-center py-5">
					<div className="flex flex-col md:flex-row gap-5 items-center">
						<ImageWithFallback
							src={avatar(bot.avatar, bot.id)}
							width={500}
							height={500}
							alt="avatar"
							className="w-24 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background"
						/>
						<div className="flex flex-col md:items-start items-center gap-1">
							<h1 className="mr-3 md:text-3xl lg:text-4xl text-2xl flex gap-2 items-center font-bold">
								{bot.name} {bot.certified && <CertifiedIcon className="w-7" />}
							</h1>
							<p className="text-muted-foreground text-sm md:text-start text-center break-all">
								{bot.shortDescription}
							</p>
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-2 w-full md:w-min">
						<Link
							target="_blank"
							href={bot.inviteLink ?? defaultInviteLink(bot.id)}
							className={buttonVariants({
								size: "lg",
								className: "w-full lg:w-min",
							})}
						>
							<PlusIcon className="w-5 h-5 mr-2" />
							Invite
						</Link>
						<Link
							href={`/bot/${bot.id}/vote`}
							className={buttonVariants({
								size: "lg",
								variant: "secondary",
								className: "w-full lg:w-min",
							})}
						>
							<ChevronUpIcon className="w-5 h-5 mr-2" />
							Vote
						</Link>
					</div>
				</div>
				<div className="w-full">
					<Tabs
						variant="underlined"
						className="w-full"
						defaultSelectedKey={"Overview"}
						classNames={{
							tabList:
								"gap-6 w-full relative rounded-none p-0 border-b border-divider",
							cursor: "w-full bg-primary",
							tab: "max-w-fit px-0 h-12",
							tabContent: "group-data-[selected=true]:text-primary",
							panel: "animate-in fade-in slide-in-from-left-5",
						}}
					>
						<Tab
							title={
								<div className="flex flex-row items-center gap-2">
									<InformationCircleIcon className="w-4 h-4" />
									Overview
								</div>
							}
						>
							<div className="w-full flex flex-col md:flex-row gap-24">
								<div className="w-full break-all">
									<MD content={bot.description!} />
								</div>
								<div className="lg:w-1/3 w-full flex flex-col justify-between py-5">
									<div className="flex flex-col gap-5 h-80 sticky">
										<div className="flex flex-col gap-2">
											<h1 className="text-3xl font-black flex items-center gap-2"><InformationCircleIcon className="w-7 h-7 text-primary" /> Information</h1>
											<div className="flex flex-row justify-between">
												<h1 className="text-base font-bold text-secondary-foreground">
													Prefix
												</h1>
												<h1 className="text-base font-normal text-muted-foreground">
													{bot.prefix ?? <Badge>Slash commands</Badge>}
												</h1>
											</div>
											<div className="flex flex-row justify-between">
												<h1 className="text-base font-bold text-secondary-foreground">
													Votes
												</h1>
												<h1 className="text-base font-normal text-muted-foreground">
													<AnimatedNumber value={bot.votes} />
												</h1>
											</div>
											<div className="flex flex-row justify-between">
												<h1 className="text-base font-bold text-secondary-foreground">
													Guilds
												</h1>
												<h1 className="text-base font-normal text-muted-foreground">
													<AnimatedNumber value={bot.guildCount ?? 0} />
												</h1>
											</div>
										</div>
										<div className="flex flex-col gap-2">
											<h1 className="text-3xl font-black flex items-center gap-2"><TagIcon className="w-7 h-7 text-primary" />Tags</h1>
											<div className="flex flex-wrap gap-1">
												{bot.tags.map((t) => (
													<TagButton key={t} tag={t} />
												))}
											</div>
										</div>
										<div className="flex flex-col gap-2">
											<h1 className="text-3xl font-black flex items-center gap-2"><UsersIcon className="w-7 h-7 text-primary" />Owners</h1>
											<div className="flex flex-col gap-1">
												{bot.owners.map((o) => (
													<Link href={`/user/${o.id}`}>
														<Button className="w-full justify-start h-10" variant={"ghost"}>
															<ImageWithFallback className="rounded-full mr-2 w-6 h-6" width={10} height={10} alt="owner avatar" src={avatar(o.avatar, o.id)} />
															{o.username}
														</Button>
													</Link>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</Tab>
						<Tab
							disabled
							isDisabled
							title={
								<div className="flex flex-row items-center gap-2">
									<ChatBubbleLeftRightIcon className="w-4 h-4" />
									Reviews
								</div>
							}
						>
							<div className="flex flex-col lg:flex-row gap-12">
								<div className="w-full md:w-1/2 flex flex-col p-6 animate-in fade-in slide-in-from-left-3">
									<h3 className="text-xl font-bold">
										Rating
										<span className="text-xs font-normal ml-1 text-muted-foreground">
											Based on 0 reviews
										</span>
									</h3>
									<div className="flex flex-col gap-3">
										{[...Array(5)]
											.map((_, i) => (
												<div key={i} className="flex items-center gap-2">
													<div className="flex items-center gap-2 text-lg">
														<p className="font-bold">{i + 1}</p>
														<StarIcon
															fill="currentColor"
															className="w-5 h-5 text-amber-500"
														/>
													</div>
													<Progress
														className="w-full h-2"
														value={Number(`${++i}0`)}
													/>
													<p className="text-muted-foreground text-sm font-medium w-12 text-right">
														{i++}0%
													</p>
												</div>
											))
											.reverse()}
									</div>
								</div>
								<div className="flex flex-col w-full h-full">
									<Policy policy={!!user?.me.user}>
										<div className="flex gap-6 w-full mt-5">
											<img
												src={avatar(user?.me.user.avatar, user?.me.user.id!)}
												alt=""
												className="w-14 h-14 rounded-full"
											/>
											<div className="flex flex-col justify-center w-full space-y-2">
												<div>
													<h3 className="text-lg font-semibold text-white">
														{user?.me.user.username}
													</h3>
												</div>
												<div className="relative ">
													<Textarea
														placeholder="Please be respectful"
														autoComplete="off"
														className="h-full w-full resize-none"
														rows={6}
														maxLength={1000}
													/>
													<div className="flex flex-col mt-2" />
												</div>
												<div className="flex gap-2 justify-between">
													<div className="flex gap-2">
														<p className="text-muted-foreground">0/1000</p>
													</div>
													<Button disabled aria-disabled>
														Send <PaperAirplaneIcon className="ml-2 w-5 h-5" />
													</Button>
												</div>
											</div>
										</div>
										<Separator className="my-5" />
									</Policy>
									<div className="h-36 w-full flex flex-col justify-center">
										<div className="flex flex-col gap-3 w-max mx-auto">
											<div className="flex w-min mx-auto items-center justify-center p-5 rounded-full bg-accent">
												<ChatBubbleLeftRightIcon className="text-accent-foreground w-6 h-6" />
											</div>
											<p className="text-muted-foreground">
												No reviews at the moment
											</p>
										</div>
									</div>
								</div>
							</div>
						</Tab>
						{isOwner && (
							<Tab
								title={
									<div className="flex flex-row items-center gap-2">
										<Cog6ToothIcon className="w-4 h-4" />
										Manage
									</div>
								}
								className="flex flex-col gap-4"
							>
								<BotDeveloper id={bot.id} />
								<BotSync id={bot.id} />
								{/* <BotWebhooks /> */}
								<BotDangerZone name={bot.name} id={bot.id} />
							</Tab>
						)}
					</Tabs>
				</div>
			</div>
		</>
	);
}
