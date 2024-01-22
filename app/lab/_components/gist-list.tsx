"use client"

import { useParams, useRouter } from "next/navigation"
import {
    CodeIcon,
    FileIcon,
    FileText,
    MoreHorizontal,
    PlusCircleIcon,
    Trash,
} from "lucide-react"

import { Item } from "./item"
import { File, Gist } from "@prisma/client"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createFileForGist } from "@/actions/gist"
import { toast } from "sonner"

interface GistListProps {
    gists: (Gist & { files: File[] })[]
}

export const GistList = ({ gists }: GistListProps) => {
    const params = useParams()
    const router = useRouter()

    const handleCreate = (gistId: string) => {
        const promise = createFileForGist({
            filename: "Untitled.ts",
            gistId,
            languageId: 94,
        }).then((file) => router.push(`/lab/${gistId}/${file.id}`))

        toast.promise(promise, {
            loading: "Creating a new file...",
            success: "New file created!",
            error: "Failed to create a new file.",
        })
    }

    return (
        <>
            {gists.map((gist) => (
                <div key={gist.id} className="border-b mb-2">
                    <div
                        onClick={() =>
                            router.push(`/lab/${gist.id}/${gist.files[0].id}`)
                        }
                        role="button"
                        className={cn(
                            "group pl-4 min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
                        )}
                    >
                        <FileText className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
                        <span className="truncatprimary">
                            {gist.description}
                        </span>
                        <div className="ml-auto flex items-center gap-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div
                                        role="button"
                                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                                    >
                                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-60"
                                    align="start"
                                    side="right"
                                    forceMount
                                >
                                    <DropdownMenuItem onClick={() => {}}>
                                        <Trash className="h-4 w-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <div className="text-xs text-muted-foreground p-2">
                                        Last edited:{" "}
                                        {gist.updatedAt.toLocaleTimeString()}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    {gist.files.map((f) => (
                        <div
                            key={f.id}
                            onClick={() =>
                                router.push(`/lab/${gist.id}/${f.id}`)
                            }
                            role="button"
                            className={cn(
                                "group pl-4 min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                                f.id === params.fileId &&
                                    "bg-primary/10 text-primary/100",
                                "pl-8"
                            )}
                        >
                            <CodeIcon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
                            <span className="truncatprimary">{f.filename}</span>
                            <div className="ml-auto flex items-center gap-x-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div
                                            role="button"
                                            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                                        >
                                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-60"
                                        align="start"
                                        side="right"
                                        forceMount
                                    >
                                        <DropdownMenuItem onClick={() => {}}>
                                            <Trash className="h-4 w-4 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <div className="text-xs text-muted-foreground p-2">
                                            Last edited:{" "}
                                            {f.updatedAt.toLocaleTimeString()}
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                    <div
                        onClick={() => handleCreate(gist.id)}
                        role="button"
                        className={cn(
                            "group pl-4 min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
                        )}
                    >
                        <PlusCircleIcon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
                        <span className="truncatprimary">Add a file</span>
                    </div>
                </div>
            ))}
        </>
    )
}
