"use client"

import { runGist, updateGistContent } from "@/actions/gist"
import { Menu } from "@/app/lab/_components/menu"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { languageIdExtensionMap } from "@/lib/coding_languages"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Gist } from "@prisma/client"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const saveFormSchema = z.object({
    content: z.string(),
})

const runFormSchema = z.object({
    content: z.string(),
})

export const GistEditor = ({ gist }: { gist: Gist }) => {
    const Editor = useMemo(
        () => dynamic(() => import("@/components/code-editor"), { ssr: false }),
        []
    )

    const saveCodeForm = useForm<z.infer<typeof saveFormSchema>>({
        resolver: zodResolver(saveFormSchema),
        defaultValues: {
            content: gist.content,
        },
    })

    const runCodeForm = useForm<z.infer<typeof saveFormSchema>>({
        resolver: zodResolver(saveFormSchema),
        defaultValues: {
            content: gist.content,
        },
    })

    const [isPendingSave, startSaveTransition] = useTransition()
    const [isPendingRun, startRunTransition] = useTransition()

    const { userId } = useAuth()

    const [code, setCode] = useState(gist.content)

    const onChange = (content?: string) => {
        if (!content) {
            return
        }

        setCode(content)
    }

    const onRunCode = () => {
        startRunTransition(() => {
            // call to judge0
            const promise = runGist({
                language_id: gist.languageId,
                source_code: code,
                gistId: gist.id,
            })

            toast.promise(promise, {
                loading: "Queuing code submission...",
                success:
                    "Code submission queued. Check submissions tab to see result",
                error: "Failed to queue code submission.",
            })
        })
    }

    const onSaveCode = () => {
        startSaveTransition(() => {
            const promise = updateGistContent({
                content: code,
                userId: userId || null,
                gistId: gist.id,
            })

            toast.promise(promise, {
                loading: "Updating gist...",
                success: "Gist updated!",
                error: "Failed to update gist.",
            })
        })
    }

    return (
        <div className="flex flex-col h-full w-full">
            <nav className="pl-14 bg-primary/5 dark:bg-secondary/40 px-3 py-2 w-full flex items-center gap-x-4">
                <div className="flex items-center justify-between w-full">
                    <h1>{`${gist.filename}.${
                        languageIdExtensionMap[gist.languageId]
                    }`}</h1>
                    <div className="flex items-center gap-x-2">
                        <Link href={`/lab/${gist.id}/submissions`}>
                            <Button variant={"secondary"}>
                                View submissions
                            </Button>
                        </Link>
                        <form onSubmit={saveCodeForm.handleSubmit(onSaveCode)}>
                            <SubmitButton
                                variant={"ghost"}
                                isPending={isPendingSave}
                                className=""
                                label="Save Code"
                            />
                        </form>
                        <form onSubmit={runCodeForm.handleSubmit(onRunCode)}>
                            <SubmitButton
                                variant={"default"}
                                isPending={isPendingRun}
                                className=""
                                label="Run Code"
                            />
                        </form>
                        <Menu updatedAt={gist.updatedAt} />
                    </div>
                </div>
            </nav>
            <div className="h-full w-full mx-auto">
                <Editor
                    languageId={gist.languageId}
                    onChange={onChange}
                    initialContent={code}
                />
            </div>
        </div>
    )
}
