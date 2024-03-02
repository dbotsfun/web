import { cn } from "@/lib/utils";
import React from "react";

export interface BotsGridProps {
	children: React.ReactNode;
	columns?: {
		base?: number;
		sm?: number;
		md?: number;
		lg?: number;
		xl?: number;
		xxl?: number;
	};
	gap?: number;
}

export default function BotsGrid({
	children,
	columns = { base: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 },
	gap = 4,
}: BotsGridProps) {
	const colClasses = cn(
		"grid-cols-1",
		columns.sm && `sm:grid-cols-${columns.sm}`,
		columns.md && `md:grid-cols-${columns.md}`,
		columns.lg && `lg:grid-cols-${columns.lg}`,
		columns.xl && `xl:grid-cols-${columns.xl}`,
		columns.xxl && `2xl:grid-cols-${columns.xxl}`,
	);

	const gapClasses = cn(`gap-${gap}`);

	const gridClasses = cn("grid", colClasses, gapClasses);

	return <div className={gridClasses}>{children}</div>;
}
