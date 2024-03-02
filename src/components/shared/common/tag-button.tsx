import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface TagButtonProps {
	tag: string;
	count?: string;
}

export default function TagButton({ tag, count }: TagButtonProps) {
	return (
		<Link
			href={`/explore?tag=${tag}`}
			className={buttonVariants({ size: "xs", variant: "secondary" })}
		>
			{tag}{" "}
			{count && <span className="text-muted-foreground/40 ml-3">{count}</span>}
		</Link>
	);
}
