"use client";

import { Gist } from "@prisma/client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export const GistEditor = ({ gist }: { gist: Gist }) => {
    const Editor = useMemo(
        () => dynamic(() => import("@/components/code-editor"), { ssr: false }),
        []
    );

    const onChange = (content?: string) => {};

    return (
        <div className="h-full pb-10 w-full">
            <div className="h-full w-full mx-auto">
                {/* <Toolbar initialData={document} /> */}
                <Editor
                    onChange={onChange}
                    initialContent={`console.log("yo")`}
                />
            </div>
        </div>
    );
};
