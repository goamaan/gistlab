import { UserButton } from "@clerk/nextjs"

export default function MarketingPage() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
