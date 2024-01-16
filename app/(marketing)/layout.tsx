import { Navbar } from "@/app/(marketing)/_components/navbar"

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-full pt-10">{children}</main>
    </div>
  )
}

export default MarketingLayout
