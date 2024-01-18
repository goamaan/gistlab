"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createGist = async ({
    languageId,
    filename,
    description,
    userId,
}: {
    languageId: string;
    filename: string;
    description: string;
    userId: string | null;
}) => {
    if (!userId) {
        throw new Error("User Id not provided when creating Gist");
    }

    const user = await db.user.findUnique({
        where: { externalUserId: userId },
    });

    if (!user) {
        throw new Error("User with given ID not found");
    }

    const gist = await db.gist.create({
        data: {
            content: "",
            languageId: parseInt(languageId),
            description,
            filename,
            userId: user.id,
        },
    });

    revalidatePath("/lab");

    return gist;
};
