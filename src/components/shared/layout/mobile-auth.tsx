import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCheckPermissionQuery, useRevokeTokenMutation } from "@/lib/apollo/types";
import { colorThemes } from "@/lib/constants";
import { avatar } from "@/lib/utils";
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import ImageWithFallback from "../common/image-with-fallback";
import Policy from "../policy";

interface MobileAuthProps {
    auth: boolean;
    avatarId?: string;
    id?: string,
    username?: string;
}

export default function MobileAuth({ auth, avatarId, id, username }: MobileAuthProps) {
    const { setTheme, resolvedTheme } = useTheme();
    const [color, setColor] = useLocalStorage<string>("main", "main");
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

    useEffect(() => {
        document
            .getElementById("html_element")
            ?.setAttribute("data-theme", color ?? "main");
    }, [color]);

    return <div className="md:hidden flex items-center">
        <Drawer>
            <DrawerTrigger asChild>
                {auth ? (
                    <ImageWithFallback
                        src={avatar(avatarId, id!)}
                        width={96}
                        height={96}
                        alt="avatar"
                        className="w-7 rounded-full"
                    />
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
                            <h3>User</h3>
                            <div className="flex flex-col gap-1">
                                <Button
                                    className="w-full justify-between"
                                    variant={"secondary"}
                                >
                                    {username}
                                    <UserIcon className="w-4 h-4" />
                                </Button>
                                <Button
                                    asChild
                                    className="w-full justify-between"
                                    variant={"secondary"}
                                >
                                    <Link href="/bot/add">
                                        Add bot
                                        <PlusCircleIcon className="w-4 h-4" />
                                    </Link>
                                </Button>
                                <Policy policy={isAdmin?.checkPermission ?? false}>
                                    <Button
                                        asChild
                                        className="w-full justify-between"
                                        variant={"secondary"}
                                    >
                                        <Link href="/secret">
                                            Admin panel
                                            <Cog6ToothIcon className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                </Policy>
                                <Button
                                    onClick={() => logout()}
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
                    <ScrollArea className="h-48 w-full">
                        <div className="flex flex-col gap-1">
                            {colorThemes.map((t, key) =>
                                <Button
                                    key={key}
                                    variant={"secondary"}
                                    className="w-full justify-between capitalize"
                                    onClick={(e) => setColor(e.currentTarget.value)}
                                    value={t}
                                >
                                    {t}
                                </Button>)}
                        </div>
                    </ScrollArea>
                </div>
            </DrawerContent>
        </Drawer>
    </div>
}