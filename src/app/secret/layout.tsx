"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import { Button } from "@/components/ui/button";
import { useCheckPermissionQuery } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/use-session";
import { GlobeAltIcon, HomeModernIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function PanelLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: auth, loading } = useSession();
	const { data: isAdmin } = useCheckPermissionQuery({
		variables: {
			input: {
				permissions: 4096 // Admin
			}
		}
	})

	if (
		(!loading && !auth) ||
		(auth && !isAdmin?.checkPermission)
	)
		return notFound();
	return loading ? (
		<LoadingScreen />
	) : (
		<div className="flex lg:flex-row flex-col gap-5 h-full">
			<div className={"pb-12 w-1/4 bg-card h-full rounded-lg sticky top-24"}>
				<div className="space-y-4 py-4">
					<div className="px-3 py-2">
						<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
							General
						</h2>
						<div className="flex flex-col gap-1">
							<Button
								variant={"ghost"}
								asChild
								className="w-full justify-start"
							>
								<Link href="/secret">
									<HomeModernIcon className="w-4 h-4 mr-2" />
									Panel
								</Link>
							</Button>
							<Button
								variant={"ghost"}
								asChild
								className="w-full justify-start"
							>
								<Link href="/secret/bots">
									<GlobeAltIcon className="w-4 h-4 mr-2" />
									Bots
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full">{children}</div>
		</div>
	);
}
