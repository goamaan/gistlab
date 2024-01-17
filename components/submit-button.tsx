"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";

export function SubmitButton({
    label,
    isPending,
    className,
}: {
    label: string;
    isPending: boolean;
    className?: string;
}) {
    return (
        <Button type="submit" aria-disabled={isPending} className={className}>
            {isPending ? <Spinner /> : label}
        </Button>
    );
}
