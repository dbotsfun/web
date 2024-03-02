"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useSession } from "@/lib/hooks/use-session";
import { avatar, cn } from "@/lib/utils";
import {
	ArrowLeftStartOnRectangleIcon,
	Cog6ToothIcon,
	MoonIcon,
	SunIcon,
	UserIcon,
} from "@heroicons/react/16/solid";
import {
	HomeIcon,
	MagnifyingGlassIcon,
	PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { Loader2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import LoginButton from "../common/login-button";
import Policy from "../policy";
import Auth from "./auth";
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
		label: "Submit",
		icon: <PlusCircleIcon className="w-4 h-4" />,
		href: "/bot/add",
	},
];

export default function Header() {
	const { data: auth, loading } = useSession();
	const pathname = usePathname();
	const { setTheme, resolvedTheme } = useTheme();
	const [color, setColor] = useLocalStorage<string>("main", "main");

	useEffect(() => {
		document
			.getElementById("html_element")
			?.setAttribute("data-theme", color ?? "main");
	}, [color]);

	if (pathname === "/api/auth/success") return null;
	return (
		<header
			className={cn(
				"bg-card/90 top-0 z-50 fixed border-accent backdrop-blur flex items-center gap-8 w-full px-8 transition-all lg:px-28 py-4 border-b",
			)}
		>
			<div className="flex flex-1 items-center justify-between">
				<div className="flex items-center gap-10">
					<Link
						href="/"
						className="text-xl font-semibold cursor-pointer hover:opacity-70 duration-100 animate-in fade-in slide-in-from-left-2"
					>
						discord<span className="font-black text-primary">bots</span>
					</Link>
					<div className="items-center gap-6 text-sm hidden md:flex">
						{navLinks.map((n, key) => (
							<Link
								key={key}
								className="text-muted-foreground animate-in fade-in slide-in-from-bottom hover:text-primary text-xs flex items-center gap-1"
								href={n.href}
							>
								{n.icon}
								{n.label}
							</Link>
						))}
					</div>
				</div>
				<div className="md:hidden flex items-center">
					<Drawer>
						<DrawerTrigger asChild>
							{auth ? (
								<Avatar>
									<AvatarImage
										src={avatar(
											auth.me.user.avatar ?? undefined,
											auth.me.user.id,
										)}
									/>
									<AvatarFallback>
										{auth.me.user.username.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							) : (
								<Button size={"icon"}>
									<Cog6ToothIcon className="w-4 h-4" />
								</Button>
							)}
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Menu</DrawerTitle>
							</DrawerHeader>
							<div className="flex flex-col gap-2 p-4">
								{auth && (
									<>
										<h3>Auth</h3>
										<div className="flex flex-col gap-1">
											<Button
												className="w-full justify-between"
												variant={"secondary"}
											>
												{auth?.me.user.username}
												<UserIcon className="w-4 h-4" />
											</Button>
											<Button
												className="w-full justify-between"
												variant={"secondary"}
											>
												Logout
												<ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
											</Button>
										</div>
									</>
								)}
								<h3>Theme</h3>
								<div className="flex flex-col gap-1">
									<Button
										variant={"secondary"}
										className="w-full justify-between"
										onClick={() =>
											setTheme(resolvedTheme === "light" ? "dark" : "light")
										}
									>
										{resolvedTheme === "light" ? "Dark theme" : "Light theme"}
										<SunIcon className="w-4 mr-2 dark:flex hidden" />
										<MoonIcon className="w-4 mr-2 flex dark:hidden" />
									</Button>
								</div>
								<h3>Color theme</h3>
								<div className="flex flex-col gap-1">
									<Button
										variant={"secondary"}
										className="w-full justify-between"
										onClick={(e) => setColor(e.currentTarget.value)}
										value={"main"}
									>
										Default
									</Button>
									<Button
										variant={"secondary"}
										className="w-full justify-between"
										onClick={(e) => setColor(e.currentTarget.value)}
										value="pine"
									>
										Pine
									</Button>
									<Button
										variant={"secondary"}
										className="w-full justify-between"
										onClick={(e) => setColor(e.currentTarget.value)}
										value="coral"
									>
										Coral
									</Button>
								</div>
							</div>
						</DrawerContent>
					</Drawer>
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
