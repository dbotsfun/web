import { Button } from "@/components/ui/button";
import { HashIcon } from "lucide-react";

interface TagsProps {
    tags: string[];
}

export default function Tags({ tags }: TagsProps) {
    return <div className="flex flex-wrap gap-2">
        {tags.map((tag, key) => <Button key={key} variant={"secondary"} size={"xs"}>
            <HashIcon className="mr-2 w-4 text-primary" />{tag}
        </Button>)}
    </div>
}