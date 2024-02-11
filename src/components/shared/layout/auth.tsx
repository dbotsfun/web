"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { avatar } from "@/lib/utils";
import { Settings2Icon, UserCog2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Policy from "../policy";

interface AuthProps {
    username: string;
    id: string;
    avatarId?: string;
}

export default function Auth({ username, id, avatarId }: AuthProps) {
    const router = useRouter()
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="lg" variant={"ghost"} className="flex flex-row gap-3 items-center px-4">
                <Avatar>
                    <AvatarImage src={avatar(avatarId, id)} />
                    <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                <h3 className="text-md font-bold">{username}</h3>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>User</DropdownMenuLabel>
            <DropdownMenuItem>
                <UserCog2Icon className="w-4 mr-2" /> {username}
            </DropdownMenuItem>
            <Policy policy={id === "1076700780175831100"}>
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push("/secret")}>
                    <Settings2Icon className="w-4 mr-2" /> Secret panel
                </DropdownMenuItem>
            </Policy>
        </DropdownMenuContent>
    </DropdownMenu>
}