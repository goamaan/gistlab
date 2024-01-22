import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"

export default async function GistSubmissions({
    params,
    searchParams,
}: {
    params: { gistId: string; fileId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const submissions = await db.codeSubmission.findMany({
        where: { fileId: params.fileId },
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {submissions.map((s, i) => (
                <Card key={s.id} className="group overflow-hidden">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <CodeIcon className="w-8 h-8" />
                        <div className="grid gap-1">
                            <CardTitle>
                                Submission #{submissions.length - i}
                            </CardTitle>
                            <CardDescription>
                                Language: {s.language_name}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="relative bg-black text-white p-4 rounded">
                        <pre className="overflow-x-auto max-h-[100px] min-h-[80px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                            <code>{s.source_code.substring(0, 50)}</code>
                        </pre>
                        <div className="absolute inset-0 bg-black bg-opacity-90 group-hover:opacity-0 transition-opacity">
                            <div className="p-4 space-y-2">
                                <div className="font-semibold font-mono">{`Stdout: ${s.stdout}`}</div>
                                <div className="font-semibold font-mono">{`Stderr: ${s.stderr}`}</div>
                                <div className="font-semibold font-mono">{`Compile output: ${s.compile_output}`}</div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-6">
                        <Button className="w-full" variant="outline">
                            View Details
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

function CodeIcon({ className }: { className: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    )
}
