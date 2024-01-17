"use client";

import { useTheme } from "next-themes";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

interface EditorProps {
    onChange: (value?: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const CodeEditor = ({ onChange, initialContent, editable }: EditorProps) => {
    const { resolvedTheme } = useTheme();

    return (
        <Editor
            defaultLanguage="javascript"
            defaultValue={initialContent}
            className="h-full w-full"
            theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
            onChange={onChange}
        />
    );
};

export default CodeEditor;
