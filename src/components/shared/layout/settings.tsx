"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrushIcon, MoonIcon, SunIcon } from "lucide-react";
import { useLocalStorage } from "react-use";

export function Settings() {
    const { setTheme, resolvedTheme } = useTheme();
    const [color, setColor] = useLocalStorage<string>("main", "main")

    React.useEffect(() => {
        document.getElementById("html_element")?.setAttribute("data-theme", color ?? "main")
    }, [color])
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
                <BrushIcon className="w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            >
                <SunIcon className="w-4 mr-2 dark:flex hidden" />
                <MoonIcon className="w-4 mr-2 flex dark:hidden" />
                {resolvedTheme === "light" ? "Dark theme" : "Light theme"}
            </DropdownMenuItem>
            <DropdownMenuLabel>Color theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={color} onValueChange={setColor}>
                <DropdownMenuRadioItem value="df">Default</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="discord_old">Discord</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pine">Pine</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="berry">Berry</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="valentine">Valentine</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="unruly">Unruly</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}