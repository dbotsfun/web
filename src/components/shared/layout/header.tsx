"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/lib/hooks/use-session";
import { cn, convertRange } from "@/lib/utils";
import {
	HomeIcon,
	MagnifyingGlassIcon,
	PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import LoginButton from "../common/login-button";
import Policy from "../policy";
import Auth from "./auth";
import MobileAuth from "./mobile-auth";
import { Settings } from "./settings";

const navLinks = [
	{
		label: "Home",
		icon: <HomeIcon className="w-4 h-4" />,
		href: "/",
	},
	{
		label: "Explore",
		icon: <MagnifyingGlassIcon className="w-4 h-4" />,
		href: "/explore",
	},
	{
		label: "Add bot",
		icon: <PlusCircleIcon className="w-4 h-4" />,
		href: "/bot/add",
	},
];

export default function Header() {
	const pathname = usePathname()
	const [windowScroll, setWindowScroll] = useState<number>(0)
	const { data: auth, loading } = useSession();
	const { y } = useWindowScroll()
	const scroll = convertRange(windowScroll)

	useEffect(() => {
		setWindowScroll(y)
	}, [y])

	if (pathname === "/api/auth/success") return null;
	return (
		<header
			style={{
				backgroundColor: `hsl(var(--card) / ${scroll})`
			}}
			className={cn(
				"top-0 z-50 fixed group flex items-center gap-8 w-full px-8 transition-all lg:px-28 py-4",
				scroll >= 0.7 ? "backdrop-blur" : ""
			)}
		>
			<div className="flex flex-1 items-center justify-between">
				<div className="flex items-center gap-6">
					<Link
						href="/"
						className="text-xl font-semibold cursor-pointer hover:opacity-70 duration-100 flex items-center animate-in fade-in slide-in-from-left-2"
					>
						discord<span className="font-black text-primary">bots</span> <Badge className="ml-2 cursor-help">BETA</Badge>
					</Link>
					<Separator orientation="vertical" className="bg-secondary h-8 duration-150 group-hover:-rotate-12 rotate-12 hidden md:flex" />
					<div className="items-center gap-6 text-sm hidden md:flex">
						{navLinks.map((n, key) => (
							<Link
								key={key}
								className="text-muted-foreground text-center animate-in fade-in slide-in-from-bottom hover:text-primary text-xs flex items-center gap-1"
								href={n.href}
							>
								{n.icon}
								{n.label}
							</Link>
						))}
					</div>
				</div>
				<div className="md:hidden flex items-center">
					<MobileAuth auth={!!auth} id={auth?.me.user.id} avatarId={auth?.me.user.avatar as string | undefined} username={auth?.me.user.username} />
				</div>
				<div className="hidden md:flex items-center gap-2">
					<Settings />
					{loading ? (
						<Loader2Icon className="w-5 h-5 animate-spin" />
					) : (
						<Policy fallback={<LoginButton>Login</LoginButton>} policy={!!auth}>
							<Auth
								username={auth?.me.user.username!}
								avatarId={auth?.me.user.avatar ?? undefined}
								id={auth?.me.user.id!}
							/>
						</Policy>
					)}
				</div>
			</div>
		</header>
	);
}
