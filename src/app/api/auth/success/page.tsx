"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import { useSession } from "@/lib/hooks/useSession";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function Page() {
    const { data: auth, loading } = useSession()

    if (typeof window !== "undefined") setTimeout(() => {
        window.close()
        window.location.reload()
    }, 4_000)
    return loading ? <LoadingScreen /> : auth ? <div className="flex flex-col justify-center items-center h-[65vh]">
        <div className="flex flex-col gap-2 items-center">
            <CheckIcon className="w-12 h-12 text-green-400" />
            <h2 className="text-2xl font-semibold">Success</h2>
            <h2 className="text-xl font-normal">This window will close automatically</h2>
        </div>
    </div> : <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col gap-2 items-center">
            <XMarkIcon className="w-12 h-12 text-destructive" />
            <h2 className="text-2xl font-semibold">Something went wrong</h2>
            <h2 className="text-xl font-normal">This window will close automatically</h2>
        </div>
    </div>
}