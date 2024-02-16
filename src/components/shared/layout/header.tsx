"use client";

import { useSession } from "@/lib/hooks/useSession";
import { cn } from "@/lib/utils";
import { HomeIcon, Loader2Icon, PlusCircleIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginButton from "../common/login-button";
import Policy from "../policy";
import Auth from "./auth";
import { Settings } from "./settings";

export default function Header() {
    const { data: auth, loading } = useSession()
    const pathname = usePathname();

    if (pathname === "/api/auth/success") return <></>
    return <header className={cn("bg-card/90 top-0 z-50 fixed border-accent backdrop-blur flex items-center gap-8 w-full px-8 transition-all lg:px-28 py-4 border-b")}>
        <div className="flex flex-1 items-center justify-end md:justify-between">
            <div className="flex items-center gap-10">
                <Link href="/" className="text-xl font-semibold cursor-pointer hover:opacity-70 duration-100">discord<span className="font-black text-primary">bots</span></Link>
                <div className="flex items-center gap-6 text-sm">
                    <Link className="text-muted-foreground hover:text-primary text-xs flex items-center gap-1" href="/">
                        <HomeIcon className="w-4 h-4" />
                        Home
                    </Link>
                    <Link className="text-muted-foreground hover:text-primary text-xs flex items-center gap-1" href="/explore">
                        <SearchIcon className="w-4 h-4" />
                        Explore
                    </Link>
                    <Link className="text-muted-foreground hover:text-primary text-xs flex items-center gap-1" href="/bot/add">
                        <PlusCircleIcon className="w-4 h-4" />
                        Add a bot
                    </Link>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Settings />
                {loading ?
                    <Loader2Icon className="w-5 h-5 animate-spin" /> :
                    <Policy fallback={<LoginButton>Login</LoginButton>} policy={!!auth?.me.user}>
                        <Auth username={auth?.me.user.username!} avatarId={auth?.me.user.avatar ?? undefined} id={auth?.me.user.id!} />
                    </Policy>}
            </div>
        </div>
    </header>
}