"use client";

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useLocalStorage } from "react-use";

export default function BetaBanner() {
    const [betaBanner, setBetaBanner] = useLocalStorage("beta-banner", 0)
    return <AlertDialog open={betaBanner === 0}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <ExclamationTriangleIcon className="w-8 h-8 text-primary" />
                <AlertDialogTitle>Note before entering discordbots!</AlertDialogTitle>
                <AlertDialogDescription>
                    discordbots is currently in beta so you might face some bugs, if you see something wrong please notify us asap.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => setBetaBanner(1)}>It's ok</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}