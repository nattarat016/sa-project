import React from "react"
import { SubmitButton } from "./submit-button"
import { createClient } from "@/utils/supabase/client"
import { v4 as uuidv4 } from "uuid"
import { log } from "console"
import { redirect } from "next/navigation"
import Activities from "../protected/activities/page"

export default function page({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    const create = async (formData: FormData) => {
        "use server"
        const name = formData.get("name") as string
        const description = formData.get("description") as string
        const activityunit = formData.get("activityunit") as unknown as number
        const file = formData.get("file") as File
        const supabase = createClient()
        const pathfile = uuidv4()
        let url: string | null

        if (file.size != 0) {
            const { data: fileData, error: err } = await supabase.storage
                .from("attachments")
                .upload(pathfile, file, {
                    contentType: "image/jpeg",
                })
            if (err) {
                return err
            }
            const { data: urls } = supabase.storage
                .from("attachments")
                .getPublicUrl(pathfile)

            url = urls.publicUrl
        } else {
            url = null
        }

        const { data, error } = await supabase.from("useractivities").insert([
            {
                name,
                description,
                activityunit,
                imgurl: url,
            },
        ])
        if (error) {
            log(error)
            return redirect("/usercreate?message=Create fail")
        }

        return redirect("/usercreate?message=Create success")
    }

    return (
        <div>
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md gap-2">
                <form className="animate-in flex-1 flex flex-col w-full p-10 gap-2 text-foreground">
                    <label className="text-md" htmlFor="name">
                        Title
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="name"
                        placeholder="Title"
                        required
                    />
                    <label className="text-md" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        rows={4}
                        cols={65}
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 w-fit"
                        name="description"
                        placeholder="description..."
                        required
                    />
                    <label className="text-md" htmlFor="activityunit">
                        Activity Unit
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="activityunit"
                        placeholder="Activity unit"
                        required
                    />
                    <label className="text-md" htmlFor="file">
                        Main photo
                    </label>
                    <input
                        type="file"
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="file"
                        placeholder="yourname"
                        required
                    />
                    <SubmitButton
                        formAction={create}
                        className="bg-yellow-500 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-yellow-700 text-slate-800"
                        pendingText="Creating..."
                    >
                        Create
                    </SubmitButton>
                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}
