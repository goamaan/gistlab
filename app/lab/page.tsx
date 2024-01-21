import { PlusCircle } from "lucide-react"
import Image from "next/image"

import { CreateGistForm } from "@/app/lab/createGist"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function DocumentsPage() {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.png"
                height="300"
                width="300"
                alt="Empty"
                className="dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                height="300"
                width="300"
                alt="Empty"
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">Welcome to your Lab</h2>
            {/* <Dialog>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a Gist</DialogTitle>
                        <DialogDescription>
                            Create a gist or import one from Github
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog> */}
            <CreateGistForm />
        </div>
    )
}
