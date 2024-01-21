"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { languageMap } from "@/lib/coding_languages"
import { SubmitButton } from "@/components/submit-button"
import { useTransition } from "react"
import { createGist } from "@/actions/gist"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

const formSchema = z.object({
    // languageId: z.string({ required_error: "Language selection is required" }),
    // filename: z.string().min(2, {
    //     message: "Filename excluding extension must be at least 3 characters",
    // }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters",
    }),
})

export function CreateGistForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const { userId } = useAuth()

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         // languageId: "94",
    //     },
    // })

    function onSubmit() {
        startTransition(() => {
            const promise = createGist({
                description: "Gist Description",
                userId: userId || null,
            }).then((gist) => router.push(`/lab/${gist.id}`))

            toast.promise(promise, {
                loading: "Creating a new gist...",
                success: "New gist created!",
                error: "Failed to create a new gist.",
            })
        })
    }

    return (
        // <Form {...form}>
        //     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        //         <FormField
        //             control={form.control}
        //             name="filename"
        //             render={({ field }) => (
        //                 <FormItem>
        //                     <FormLabel>Filename (without extension)</FormLabel>
        //                     <FormControl>
        //                         <Input placeholder="binarySearch" {...field} />
        //                     </FormControl>
        //                     <FormDescription>Name of gist file</FormDescription>
        //                     <FormMessage />
        //                 </FormItem>
        //             )}
        //         />
        //         <FormField
        //             control={form.control}
        //             name="description"
        //             render={({ field }) => (
        //                 <FormItem>
        //                     <FormLabel>Gist Description</FormLabel>
        //                     <FormControl>
        //                         <Textarea
        //                             placeholder="Code snippet to implement Binary search in Typescript"
        //                             {...field}
        //                         />
        //                     </FormControl>
        //                     <FormDescription>
        //                         A short description of your gist
        //                     </FormDescription>
        //                     <FormMessage />
        //                 </FormItem>
        //             )}
        //         />
        //         <FormField
        //             control={form.control}
        //             name="languageId"
        //             render={({ field }) => (
        //                 <FormItem>
        //                     <FormLabel>Language</FormLabel>
        //                     <FormControl>
        //                         <Select {...field}>
        //                             <SelectTrigger>
        //                                 <SelectValue placeholder="Select a language" />
        //                             </SelectTrigger>
        //                             <SelectContent>
        //                                 <SelectGroup>
        //                                     <SelectLabel>
        //                                         Coding Language
        //                                     </SelectLabel>
        //                                     {Object.entries(languageMap).map(
        //                                         ([key, value]) => (
        //                                             <SelectItem
        //                                                 key={key}
        //                                                 value={value.toString()}
        //                                             >
        //                                                 {key}
        //                                             </SelectItem>
        //                                         )
        //                                     )}
        //                                 </SelectGroup>
        //                             </SelectContent>
        //                         </Select>
        //                     </FormControl>
        //                     <FormDescription>
        //                         The language that your code is executed as
        //                     </FormDescription>
        //                     <FormMessage />
        //                 </FormItem>
        //             )}
        //         />
        //         <SubmitButton
        //             variant={"default"}
        //             isPending={isPending}
        //             className="self-center mt-4"
        //             label="Create"
        //         />
        //     </form>
        // </Form>
        <SubmitButton
            onClick={onSubmit}
            isPending={isPending}
            variant={"default"}
        >
            <PlusCircle className="h-4 w-4 mr-2" /> Create a gist
        </SubmitButton>
    )
}
