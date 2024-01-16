import Link from "next/link"
import { Clapperboard } from "lucide-react"
import { SignInButton, UserButton, auth, currentUser } from "@clerk/nextjs"

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

  const user = await currentUser()

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      <div className="flex items-center gap-x-4">
        <Button
          size="sm"
          variant="ghost"
          className="text-muted-foreground hover:text-primary"
          asChild
        >
          <Link href={`/u/${user?.username}`}>
            <Clapperboard className="h-5 w-5 lg:mr-2" />
            <span className="hidden lg:block">Dashboard</span>
          </Link>
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
