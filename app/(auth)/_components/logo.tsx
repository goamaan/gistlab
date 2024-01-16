import Image from "next/image"
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export const Logo = () => {
  return (
    <div className="flex flex-col mt-10 items-center gap-y-4">
      <Image
        src="/logo.svg"
        alt="GistLab"
        className="dark:hidden p-4"
        height="64"
        width="64"
      />
      <Image
        src="/logo-dark.svg"
        alt="GistLab"
        className="dark:block"
        height="64"
        width="64"
      />
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className="text-xl font-semibold">GistLab</p>
        <p className="text-sm text-muted-foreground">Run your Gists</p>
      </div>
    </div>
  )
}
