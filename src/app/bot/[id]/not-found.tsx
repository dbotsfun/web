import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex h-[60vh] justify-center flex-col">
            <h1 className="text-7xl font-bold text-center">404</h1>
            <p className="text-xl font-normal text-center">Bot not found</p>
            <Link className={buttonVariants({ className: "w-min mx-auto my-5", variant: "secondary" })} href="/">
                <ArrowLeftIcon className="mr-2 w-5 h-5" />
                Go home
            </Link>
        </div>
    )
}