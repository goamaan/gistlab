import type { Metadata } from "next"
import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import { dark } from "@clerk/themes"
import { cn } from "@/lib/utils"
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Spinner } from "@/components/spinner"
import { ModalProvider } from "@/providers/modal-provider"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: "GistLab | Code runner",
    description: "The online code runner sandbox for your Github gists",
    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: light)",
                url: "/logo.svg",
                href: "/logo.svg",
            },
            {
                media: "(prefers-color-scheme: dark)",
                url: "/logo-dark.svg",
                href: "/logo-dark.svg",
            },
        ],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                        storageKey="gistlab-theme"
                    >
                        {children}
                        <Toaster closeButton={true} richColors={true} />
                        <ModalProvider />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
