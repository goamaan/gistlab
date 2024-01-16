"use client"

import { useParams } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Menu } from "@/app/lab/_components/menu"

interface NavbarProps {
  isCollapsed: boolean
  onResetWidth: () => void
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams()

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <h1>Gist</h1>
          <div className="flex items-center gap-x-2">
            <Button>Run Code</Button>
            <Menu />
          </div>
        </div>
      </nav>
      {/* {document.isArchived && <Banner documentId={document._id} />} */}
    </>
  )
}
