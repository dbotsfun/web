import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCog2Icon } from "lucide-react";

interface AuthProps {
    username: string;
    id: string;
}

export default function Auth({ username, id }: AuthProps) {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="default">
                {username}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>User</DropdownMenuLabel>
            <DropdownMenuItem
            >
                <UserCog2Icon className="w-4 mr-2" /> {username}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}