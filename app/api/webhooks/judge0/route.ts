import { db } from "@/lib/db"

export async function PUT(req: Request) {
    const submission = await req.json()

    const {
        language_id,
        source_code,
        stdin,
        expected_output,
        stdout,
        status_id,
        created_at,
        finished_at,
        time,
        memory,
        stderr,
        token,
        number_of_runs,
        compile_output,
        exit_code,
        exit_signal,
        message,
        compiler_options,
        callback_url,
        additional_files,
        status,
        language,
    } = submission

    await db.codeSubmission.create({
        data: {
            language_id,
            source_code,
            additional_files,
            callback_url,
            compile_output,
            compiler_options,
            created_at,
            exit_code,
            exit_signal,
            expected_output,
            finished_at,
            language_name: language.name,
            status_description: status.description,
            memory,
            message,
            number_of_runs,
            status_id,
            stderr,
            stdin,
            stdout,
            time,
            token,
        },
    })

    return new Response("", { status: 200 })
}
