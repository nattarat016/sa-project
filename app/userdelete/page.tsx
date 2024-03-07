import * as React from "react"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import RecipeReviewCard from "@/components/activitiesMember"
import { redirect } from "next/navigation"

export default async function Useredit({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const _delete = async (FormData: FormData) => {
        "use server"
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const postName = FormData.get("postName") as string
        const { error } = await supabase
            .from("useractivities")
            .delete()
            .eq("name", postName)
        console.log(error)
    }
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }
    return (
        <div>
            <form action={_delete}>
                <label className="text-md" htmlFor="fullname">
                    Fill post Name to Delete
                </label>
                <br />
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="postName"
                    placeholder="Name of post"
                    required
                />
                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
                <button className="bg-red-700  text-white hover:bg-red-600 rounded-md px-4 py-2 text-foreground mb-2">
                    Delete Post
                </button>
            </form>
        </div>

    )
}
