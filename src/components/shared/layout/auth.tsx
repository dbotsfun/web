"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCheckPermissionQuery, useRevokeTokenMutation } from "@/lib/apollo/types";
import { avatar } from "@/lib/utils";
import {
	ArrowLeftStartOnRectangleIcon,
	Cog6ToothIcon,
	PlusCircleIcon,
	UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ImageWithFallback from "../common/image-with-fallback";
import Policy from "../policy";

interface AuthProps {
	username: string;
	id: string;
	avatarId?: string;
}

export default function Auth({ username, id, avatarId }: AuthProps) {
	const router = useRouter();
	const [logout, logoutResult] = useRevokeTokenMutation();
	const { data: isAdmin } = useCheckPermissionQuery({
		variables: {
			input: {
				permissions: 4096 // Admin
			}
		}
	})

	useEffect(() => {
		if (logoutResult.called) {
			router.push("/");
			location.reload();
		}
	}, [logoutResult.called, logoutResult.loading]);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-60 duration-150 ml-3">
					<ImageWithFallback
						src={avatar(avatarId, id)}
						width={96}
						height={96}
						alt="avatar"
						className="w-7 rounded-full"
					/>
					<h3 className="text-xs font-bold hidden md:flex tracking-normal">{username}</h3>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64" align="end">
				<DropdownMenuLabel>User</DropdownMenuLabel>
				<Link href={`/user/${id}`}>
					<DropdownMenuItem>
						<UserIcon className="w-4 mr-2" /> {username}
					</DropdownMenuItem>
				</Link>
				<Link href={"/bot/add"}>
					<DropdownMenuItem>
						<PlusCircleIcon className="w-4 mr-2" /> Add bot
					</DropdownMenuItem>
				</Link>
				<Policy policy={isAdmin?.checkPermission ?? false}>
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
	);
}
