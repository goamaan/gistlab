"use client"

import { Spinner } from "@/components/spinner"
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"

export function SubmitButton({
    label,
    isPending,
    className,
    variant,
}: {
    label: string
    isPending: boolean
    className?: string
    variant: VariantProps<typeof buttonVariants>["variant"]
}) {
    return (
        <Button
            variant={variant}
            type="submit"
            aria-disabled={isPending}
            className={className}
        >
            {isPending ? <Spinner /> : label}
        </Button>
    )
}
