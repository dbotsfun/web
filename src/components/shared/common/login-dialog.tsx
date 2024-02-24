"use client";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeftEndOnRectangleIcon, HomeIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function LoginDialog() {
    const router = useRouter()
    return <AlertDialog open>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>You need to login to access this page!</AlertDialogTitle>
                <AlertDialogDescription>
                    Please login with Discord to grant access to this part of the website or go back to home.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <Button onClick={() => router.push("/")} variant={"secondary"} className="w-full"><HomeIcon className="mr-2 w-5 h-5" /> Return to homepage</Button>
                <Button onClick={() => router.push("/api/auth/login")} className="w-full"><ArrowLeftEndOnRectangleIcon className="mr-2 w-5 h-5" /> Login with Discord</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}