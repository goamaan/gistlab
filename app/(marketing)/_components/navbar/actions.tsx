import Link from "next/link"
import { Clapperboard } from "lucide-react"
import { SignInButton, UserButton, auth, currentUser } from "@clerk/nextjs"
import { clerkClient } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export const Actions = async () => {
    const { userId } = auth()

    if (!userId) {
        return (
            <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
                <SignInButton>
                    <Button size="sm" variant="outline">
                        Login
                    </Button>
                </SignInButton>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
            <div className="flex items-center gap-x-4">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}
