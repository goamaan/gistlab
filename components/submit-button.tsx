"use client"

import { Spinner } from "@/components/spinner"
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"
import React from "react"

export function SubmitButton({
    isPending,
    className,
    variant,
    children,
    ...props
}: React.ComponentPropsWithoutRef<"button"> & {
    isPending: boolean
    className?: string
    variant: VariantProps<typeof buttonVariants>["variant"]
    children: React.ReactNode
}) {
    return (
        <Button
            {...props}
            variant={variant}
            type="submit"
            aria-disabled={isPending}
            className={className}
        >
            {isPending ? <Spinner /> : children}
        </Button>
    )
}
