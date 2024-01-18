"use client";

import { useParams, useRouter } from "next/navigation";
import { FileIcon } from "lucide-react";

import { Item } from "./item";
import { Gist } from "@prisma/client";

interface GistListProps {
    gists: Gist[];
}

export const DocumentList = ({ gists }: GistListProps) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            {gists.map((gist) => (
                <div key={gist.id}>
                    <Item
                        id={gist.id}
                        onClick={() => router.push(`/lab/${gist.id}`)}
                        label={gist.filename}
                        icon={FileIcon}
                        active={params.gistId === gist.id}
                        updatedAt={gist.updatedAt}
                    />
                </div>
            ))}
        </>
    );
};
