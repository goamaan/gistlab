import { Navbar } from "@/app/(marketing)/_components/navbar"

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full gap-4 bg-background">
            <Navbar />
            <main className="h-full pt-40">{children}</main>
        </div>
    )
}

export default MarketingLayout
