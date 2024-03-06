import * as React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import Stack from "@mui/material/Stack"
import Pagination from "@mui/material/Pagination"
import RecipeReviewCard from "@/components/activitiesMember"


export default async function Activities() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return (
          <div>
            <div className="flex justify-center pt-8 gap-4">
              <div className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
              <h2 className="font-bold text-4xl mb-4">Activities</h2>
              <div className=" gap-2">
              <Link href='/create'>
                <button className="btn bg-yellow-300 text-slate-900">Create</button>
              </Link>
              <Link href='/protected/editpost'>
                <button className="btn bg-red-600 text-white">Delete</button>
              </Link>
              </div>
              </div>
              </div>
            </div>
          <RecipeReviewCard/>
          </div>
  )
}
