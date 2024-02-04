"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWindowScroll } from "react-use";
import { buttonVariants } from "../ui/button";
import { Settings } from "./settings";

export default function Header() {
    const { y } = useWindowScroll()
    return <header className={cn("bg-card/90 top-0 z-50 fixed border-accent backdrop-blur flex items-center gap-8 w-full px-8 transition-all lg:px-28 py-4", y <= 5 ? "" : "border-b")}>
        <Link href="/" className="text-xl font-semibold cursor-pointer hover:opacity-70 duration-100">discord<span className="font-black text-primary">bots</span></Link>
        <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                    <Link className="text-muted-foreground" href="/">About</Link>
                </ul>
            </nav>
            <div className="flex items-center gap-2">
                <Link href="/bot/add" className={buttonVariants({ className: "hidden lg:flex" })}>Submit a bot</Link>
                <Settings />
            </div>
        </div>
    </header>
}