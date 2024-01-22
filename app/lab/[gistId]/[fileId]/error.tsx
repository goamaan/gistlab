"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col gap-4 h-full justify-center items-center">
            <h2 className="text-lg font-bold">Something went wrong!</h2>
            <div className="flex gap-2">
                <Button
                    variant={"secondary"}
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </Button>
                <Button onClick={() => router.push("/lab")}>
                    Back to home
                </Button>
            </div>
        </div>
    );
}
