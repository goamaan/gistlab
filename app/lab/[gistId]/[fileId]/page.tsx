import { GistEditor } from "@/app/lab/[gistId]/[fileId]/_components/gist-editor"
import { Spinner } from "@/components/spinner"
import { languageIdExtensionMap } from "@/lib/coding_languages"
import { db } from "@/lib/db"
import { Suspense } from "react"

interface GistIdPageProps {
    params: {
        gistId: string
        fileId: string
    }
}

const GistIdPage = async ({ params }: GistIdPageProps) => {
    const gist = await db.gist.findUnique({
        where: {
            id: params.gistId,
        },
        include: {
            files: true,
        },
    })

    if (!gist) {
        throw new Error("Gist not found")
    }

    return (
        <Suspense
            fallback={
                <div className="flex items-center mx-auto justify-center">
                    <Spinner />
                </div>
            }
        >
            <GistEditor gist={gist} />
        </Suspense>
    )
}

export default GistIdPage
