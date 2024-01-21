import { redirect } from "next/navigation"

import { Navigation } from "./_components/navigation"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth()
    if (!userId) {
        throw new Error("Not authenticated")
    }

    const user = await db.user.findUnique({
        where: { externalUserId: userId },
    })

    if (!user) {
        throw new Error("User with ID not found")
    }

    const gists = await db.gist.findMany({
        where: { userId: user.id },
        include: { files: true },
    })

    return (
        <div className="h-full flex items-end">
            <Navigation gists={gists} />
            <main className="flex-1 h-full overflow-y-auto">{children}</main>
        </div>
    )
}

export default MainLayout
