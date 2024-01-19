import { Heading } from "@/app/(marketing)/_components/heading"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { ReactElement } from "react"

const upcomingFeatures: {
    icon: ReactElement<any, any>
    title: string
    description: string
}[] = [
    {
        icon: <span className="text-2xl">🔗</span>,
        title: "Github Gist Integration",
        description:
            "Easily import your own gists or copy using the Github URL",
    },
    {
        icon: <span className="text-2xl">💎</span>,
        title: "Premium subscription for more daily code submissions",
        description: "Unlock exclusive benefits for power users",
    },
    {
        icon: <span className="text-2xl">🚀</span>,
        title: "Chrome extension for inline code execution on Github",
        description:
            "Seamlessly run code within your browser without leaving the Github tab",
    },
    {
        icon: <span className="text-2xl">🎮</span>,
        title: "Live coding environment",
        description:
            "Invite and Collaborate with other users and queue code submissions simultaneously",
    },
]

export default async function MarketingPage() {
    return (
        <div className="min-h-full justify-start flex flex-col gap-10 dark:bg-background">
            <div className="flex flex-col items-center justify-center md:justify-start text-center px-6">
                <Heading />
            </div>
            <h2 className="font-light text-3xl text-center">
                Upcoming Features
            </h2>
            <div className="flex flex-col items-center gap-4 mb-4">
                {upcomingFeatures.map((f) => (
                    <div className="w-full max-w-2xl" key={f.title}>
                        <Card className="items-center flex justify-start hover:shadow-lg transition-all dark:hover:bg-slate-800">
                            <div className="ml-10">{f.icon}</div>
                            <CardHeader>
                                <CardTitle>{f.title}</CardTitle>
                                <CardDescription>
                                    {f.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}
