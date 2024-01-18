"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createGist = async ({
    languageId,
    filename,
    description,
    userId,
}: {
    languageId: string
    filename: string
    description: string
    userId: string | null
}) => {
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
            content: "",
            languageId: parseInt(languageId),
            description,
            filename,
            userId: user.id,
        },
    })

    revalidatePath("/lab")

    return gist
}

export const updateGistContent = async ({
    content,
    gistId,
    userId,
}: {
    content: string
    gistId: string
    userId: string | null
}) => {
    if (!userId) {
        throw new Error("User Id not provided when creating Gist")
    }

    const user = await db.user.findUnique({
        where: { externalUserId: userId },
    })

    if (!user) {
        throw new Error("User with given ID not found")
    }

    const gist = await db.gist.update({
        where: {
            id: gistId,
        },
        data: {
            content,
            userId: user.id,
        },
    })

    revalidatePath(`/lab/${gist.id}`)

    return gist
}

export const runGist = async ({
    language_id,
    source_code,
}: {
    language_id: number
    source_code: string
}) => {
    const host = process.env.JUDGE0_HOST
    const key = process.env.JUDGE0_KEY
    source_code = Buffer.from(source_code).toString("base64")

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
            source_code,
        }),
    }

    await fetch(url, options)
}
