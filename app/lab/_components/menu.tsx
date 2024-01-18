"use client"

import { useRouter } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import { toast } from "sonner"
import { MoreHorizontal, Trash } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface MenuProps {
    updatedAt?: Date
}

export const Menu = ({ updatedAt }: MenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                    Last updated at: {updatedAt?.toLocaleTimeString()}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeleton() {
    return <Skeleton className="h-10 w-10" />
}
