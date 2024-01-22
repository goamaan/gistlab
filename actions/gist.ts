"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createGist = async ({ userId }: { userId: string | null }) => {
    if (!userId) {
        throw new Error("User Id not provided when creating Gist")
    }

    const user = await db.user.findUnique({
        where: { externalUserId: userId },
    })

    if (!user) {
        throw new Error("User with given ID not found")
    }

    const gist = await db.gist.create({
        data: {
            description: "Untitled Gist",
            userId: user.id,
            files: {
                create: {
                    content: "",
                    filename: "Untitled.ts",
                    languageId: 94,
                },
            },
        },
        include: { files: true },
    })

    revalidatePath("/lab", "layout")

    return gist
}

export const createFileForGist = async ({
    languageId,
    filename,
    gistId,
}: {
    languageId: number
    filename: string
    gistId: string
}) => {
    const file = await db.file.create({
        data: {
            languageId: languageId,
            filename,
            content: "",
            gistId,
        },
    })

    revalidatePath("/lab", "layout")
    revalidatePath(`/lab/${gistId}`, "page")

    return file
}

export const updateFileContent = async ({
    content,
    fileId,
}: {
    content: string
    fileId: string
}) => {
    const file = await db.file.update({
        where: {
            id: fileId,
        },
        data: {
            content,
        },
    })

    revalidatePath(`/lab/${file.id}`)

    return file
}

export const runFile = async ({
    language_id,
    source_code,
    fileId,
}: {
    language_id: number
    source_code: string
    fileId: string
}) => {
    const host = process.env.JUDGE0_HOST
    const key = process.env.JUDGE0_KEY
    const encoded_source_code = Buffer.from(source_code).toString("base64")

    if (!host || !key) {
        throw new Error("Judge0 host and/or key is not set in env vars")
    }

    const callbackUrlBase = process.env.JUDGE0_CALLBACK_URL_BASE
    if (!callbackUrlBase) {
        throw new Error("Judge0 callback url not provided")
    }
    const callbackUrl = `${callbackUrlBase}/api/webhooks/judge0`
    const url = `https://${host}/submissions?base64_encoded=true&fields=*&callback_url=${callbackUrl}`

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": host,
        },
        body: JSON.stringify({
            language_id,
            source_code: encoded_source_code,
        }),
    }

    const res = await fetch(url, options)

    const { token } = await res.json()

    await db.codeSubmission.create({
        data: { source_code, language_id, fileId, token },
    })
}
