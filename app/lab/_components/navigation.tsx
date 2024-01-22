"use client"

import {
    ChevronsLeft,
    Home,
    MenuIcon,
    PlusCircleIcon,
    Settings,
} from "lucide-react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { ElementRef, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/utils"
import { UserItem } from "@/app/lab/_components/user-item"
import { useSettings } from "@/hooks/use-settings"
import { Item } from "@/app/lab/_components/item"
import { GistList } from "@/app/lab/_components/gist-list"
import { File, Gist } from "@prisma/client"
import { createGist } from "@/actions/gist"
import { toast } from "sonner"

export const Navigation = ({
    userId,
    gists,
}: {
    userId: string
    gists: (Gist & { files: File[] })[]
}) => {
    const router = useRouter()
    const settings = useSettings()

    const params = useParams()
    const pathname = usePathname()
    const isMobile = useMediaQuery("(max-width: 768px)")

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)
    const [isResetting, setIsResetting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            resetWidth()
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            collapse()
        }
    }, [pathname, isMobile])

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return
        let newWidth = event.clientX

        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`
            navbarRef.current.style.setProperty("left", `${newWidth}px`)
            navbarRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`
            )
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? "100%" : "240px"
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)"
            )
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            )
            setTimeout(() => setIsResetting(false), 300)
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = "0"
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0")
            setTimeout(() => setIsResetting(false), 300)
        }
    }

    const handleCreate = () => {
        const promise = createGist({
            userId,
        }).then((gist) => router.push(`/lab/${gist.id}/${gist.files[0].id}`))

        toast.promise(promise, {
            loading: "Creating a new gist...",
            success: "New gist created!",
            error: "Failed to create a new gist.",
        })
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full bg-secondary/60 overflow-y-auto relative flex w-60 flex-col",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserItem />
                    <Item
                        label="Home"
                        icon={Home}
                        onClick={() => router.push("/lab")}
                    />
                    <Item
                        label="Settings"
                        icon={Settings}
                        onClick={settings.onOpen}
                    />
                </div>
                <div className="mt-8">
                    <Item
                        label="Create new Gist"
                        icon={PlusCircleIcon}
                        onClick={handleCreate}
                    />
                </div>
                <div className="mt-2">
                    <GistList gists={gists} />
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                {/* {!!params.gistId ? (
                    <div className="h-[10%]">
                        <Navbar
                            isCollapsed={isCollapsed}
                            onResetWidth={resetWidth}
                            title={
                                gists.find((g) => g.id === params.gistId)
                                    ?.filename || ""
                            }
                        />
                    </div>
                ) : ( */}
                <nav className="flex bg-transparent px-3 py-3 w-full">
                    {isCollapsed && (
                        <MenuIcon
                            onClick={resetWidth}
                            role="button"
                            className="h-6 w-6 text-muted-foreground"
                        />
                    )}
                </nav>
                {/* )} */}
            </div>
        </>
    )
}
