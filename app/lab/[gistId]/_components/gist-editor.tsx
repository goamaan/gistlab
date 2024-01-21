"use client"

import { runFile, updateFileContent } from "@/actions/gist"
import { Menu } from "@/app/lab/_components/menu"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    languageIdAliasMap,
    languageIdExtensionMap,
} from "@/lib/coding_languages"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { File, Gist } from "@prisma/client"
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

export const GistEditor = ({ gist }: { gist: Gist & { files: File[] } }) => {
    const Editor = useMemo(
        () => dynamic(() => import("@/components/code-editor"), { ssr: false }),
        []
    )

    const [fileId, setFileId] = useState(gist.files[0].id)
    const [fileContent, setFileContent] = useState<{
        [fileId: string]: string
    }>(
        gist.files.reduce(
            (prev, curr) => ({
                ...prev,
                [curr.id]: curr.content,
            }),
            {}
        )
    )

    const saveCodeForm = useForm<z.infer<typeof saveFormSchema>>({
        resolver: zodResolver(saveFormSchema),
        defaultValues: {
            content: fileContent[fileId],
        },
    })

    const runCodeForm = useForm<z.infer<typeof runFormSchema>>({
        resolver: zodResolver(runFormSchema),
        defaultValues: {
            content: fileContent[fileId],
        },
    })

    const [isPendingSave, startSaveTransition] = useTransition()
    const [isPendingRun, startRunTransition] = useTransition()

    const file = gist.files.find((f) => f.id === fileId)

    if (!file) {
        throw new Error("Selected file not found in gist")
    }

    const onChange = (content?: string) => {
        if (!content) {
            return
        }

        setFileContent((f) => ({ ...f, [fileId]: content }))
    }

    const onRunCode = () => {
        startRunTransition(() => {
            // call to judge0
            const promise = runFile({
                language_id: file.languageId,
                source_code: fileContent[fileId],
                fileId,
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
            const promise = updateFileContent({
                content: fileContent[fileId],
                fileId: fileId,
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
            <nav className="pl-14 bg-primary/10 dark:bg-secondary/40 px-3 py-2 w-full flex items-center gap-x-4">
                <div className="flex items-center justify-between w-full">
                    <h1>{`${file.filename}.${
                        languageIdExtensionMap[file.languageId]
                    }`}</h1>
                    <div className="flex items-center gap-x-2">
                        <Link href={`/lab/${file.id}/submissions`}>
                            <Button variant={"secondary"}>
                                View submissions
                            </Button>
                        </Link>
                        <form onSubmit={saveCodeForm.handleSubmit(onSaveCode)}>
                            <SubmitButton
                                variant={"ghost"}
                                isPending={isPendingSave}
                            >
                                Save Code
                            </SubmitButton>
                        </form>
                        <form onSubmit={runCodeForm.handleSubmit(onRunCode)}>
                            <SubmitButton
                                variant={"default"}
                                isPending={isPendingRun}
                                className=""
                            >
                                Run Code
                            </SubmitButton>
                        </form>
                        <Menu updatedAt={file.updatedAt} />
                    </div>
                </div>
            </nav>
            <Tabs
                className="h-full w-full mx-auto"
                onValueChange={(id) => setFileId(id)}
                defaultValue={fileId}
            >
                <TabsList>
                    {gist.files.map((f) => (
                        <TabsTrigger key={f.id} value={f.id}>
                            {f.filename}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {gist.files.map((f) => (
                    <TabsContent
                        className="h-full w-full mx-auto"
                        key={f.id}
                        value={f.id}
                    >
                        <div className="h-full w-full mx-auto">
                            <Editor
                                file={{
                                    language:
                                        languageIdAliasMap[file.languageId],
                                    id: fileId,
                                    value: fileContent[fileId],
                                }}
                                onChange={onChange}
                            />
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
