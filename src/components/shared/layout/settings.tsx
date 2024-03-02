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
import { MoonIcon, PaintBrushIcon, SunIcon } from "@heroicons/react/20/solid";
import { useLocalStorage } from "react-use";

export function Settings() {
    const { setTheme, resolvedTheme } = useTheme();
    const [color, setColor] = useLocalStorage<string>("main", "main")

    React.useEffect(() => {
        document.getElementById("html_element")?.setAttribute("data-theme", color ?? "main")
    }, [color])
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
                <PaintBrushIcon className="w-4" />
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
                <DropdownMenuRadioItem value="pine">Pine</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="coral">Coral</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="chill">Chill</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}