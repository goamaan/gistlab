"use client";

import { useTheme } from "next-themes";
import Editor from "@monaco-editor/react";
import { languageIdAliasMap } from "@/lib/coding_languages";

interface EditorProps {
    onChange: (value?: string) => void;
    initialContent?: string;
    editable?: boolean;
    languageId: number;
}

const CodeEditor = ({
    onChange,
    initialContent,
    editable,
    languageId,
}: EditorProps) => {
    const { resolvedTheme } = useTheme();

    return (
        <Editor
            defaultLanguage={languageIdAliasMap[languageId]}
            defaultValue={initialContent}
            className="h-full w-full"
            theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
            onChange={onChange}
        />
    );
};

export default CodeEditor;
