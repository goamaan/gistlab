"use server";

import { db } from "@/lib/db";

export const createGist = async ({
    languageId,
    filename,
    description,
}: {
    languageId: string;
    filename: string;
    description: string;
}) => {
    const gist = await db.gist.create({
        data: {
            content: "",
            languageId: parseInt(languageId),
            description,
            filename,
        },
    });

    return gist;
};
