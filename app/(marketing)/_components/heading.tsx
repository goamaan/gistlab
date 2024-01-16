import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SignInButton, auth } from "@clerk/nextjs"

export const Heading = () => {
  const { userId } = auth()

  const HeadingContent = (
    <>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Run Code Gists online. Welcome to{" "}
        <span className="underline">GistLab</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        GistLab is an online code runner for your code gists, including a code
        editing environment.
      </h3>
    </>
  )

  if (!userId) {
    return (
      <div className="max-w-3xl space-y-4">
        {HeadingContent}
        <SignInButton mode="modal">
          <Button>
            Get GistLab free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-4">
      {HeadingContent}
      <Button asChild>
        <Link href="/lab">
          Enter your Lab
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    </div>
  )
}
