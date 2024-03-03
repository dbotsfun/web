import { HeroIcon } from "@/lib/types/props";
import { ChevronRightIcon, FaceFrownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import SkeletonCard from "../../cards/skeleton";
import BotsGrid from "../../grids/bots";

interface ListingProps {
	title: string;
	subtext?: string;
	Icon: HeroIcon;
	more?: string;
	loading?: boolean;
	list?: React.ReactNode;
}

// quick reminder: only display 4 bots per row (gql query)

export default function Listing({
	title,
	subtext,
	Icon,
	more,
	loading,
	list,
}: ListingProps) {
	return (
		<section className="flex flex-col gap-3 my-7">
			<div className="w-full justify-between flex items-center">
				<div className="flex flex-row gap-3 items-center">
					<div className="p-3 rounded-full bg-primary/15">
						<Icon className="text-primary w-6" />
					</div>
					<div className="flex flex-col gap-1 items-start">
						<h1 className="text-xl lg:text-3xl font-semibold">{title}</h1>
						{subtext && (
							<p className="lg:text-sm text-xs text-muted-foreground">
								{subtext}
							</p>
						)}
					</div>
				</div>
				{more && (
					<Link
						href={more}
						className="text-muted-foreground text-xs lg:text-sm hover:opacity-85 underline flex items-center"
					>
						See more <ChevronRightIcon className="ml-1 w-4" />
					</Link>
				)}
			</div>
			{loading ? (
				<BotsGrid>
					{[...Array(4)].map((_, key) => (
						<SkeletonCard key={key} />
					))}
				</BotsGrid>
			) : list ? (
				<BotsGrid>{list}</BotsGrid>
			) : (
				<div className="flex items-center justify-center h-32 font-bold text-red-500">
					<FaceFrownIcon className="w-5 mr-2" /> No bots found
				</div>
			)}
		</section>
	);
}
