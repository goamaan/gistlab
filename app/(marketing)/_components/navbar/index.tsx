import { cn } from "@/lib/utils"

import { Logo } from "@/app/(marketing)/_components/logo"
import { Actions } from "@/app/(marketing)/_components/navbar/actions"
import { ThemeToggle } from "@/components/theme-toggle"

export const Navbar = () => {
    return (
        <div
            className={cn(
                "z-50 bg-background fixed top-0 flex items-center w-full p-6 opacity-95"
            )}
        >
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                <Actions />
                <ThemeToggle />
            </div>
        </div>
    )
}
