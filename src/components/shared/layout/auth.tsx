"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRevokeTokenMutation } from "@/lib/apollo/types";
import { avatar } from "@/lib/utils";
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Policy from "../policy";

interface AuthProps {
    username: string;
    id: string;
    avatarId?: string;
}

export default function Auth({ username, id, avatarId }: AuthProps) {
    const router = useRouter()
    const [logout, logoutResult] = useRevokeTokenMutation()

    useEffect(() => {
        if (logoutResult.called) {
            router.push("/")
            location.reload()
        }
    })
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-60 duration-150 ml-3">
                <Avatar>
                    <AvatarImage src={avatar(avatarId, id)} />
                    <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h3 className="text-xs font-bold hidden md:flex">{username}</h3>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>User</DropdownMenuLabel>
            <Link href={`/user/${id}`}>
                <DropdownMenuItem>
                    <UserIcon className="w-4 mr-2" /> {username}
                </DropdownMenuItem>
            </Link>
            <Policy policy={id === "1076700780175831100"}>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <Link href={"/secret"}>
                    <DropdownMenuItem>
                        <Cog6ToothIcon className="w-4 mr-2" /> Secret panel
                    </DropdownMenuItem>
                </Link>
            </Policy>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Danger</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => logout()}>
                <ArrowLeftStartOnRectangleIcon className="w-4 mr-2" /> Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}