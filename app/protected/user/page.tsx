import AuthButton from "@/app/components/AuthButton"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center py-10">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <h2 className="font-bold text-4xl mb-4">Profile</h2>
            <AuthButton />
          </div>
        </nav>
      </div>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 justify-start gap-4">
          <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 border-slate-600 border-2 rounded-md">
            picture
            ______________________________________________

            name :
            ______________________________________________
            like :
          </div>
        </div>
        <div className="col-span-2 ...">
          <h4 className="font-bold text-4xl mb-4">Post</h4>
        </div>
        <div className="row-span-2 col-span-2 ...">
          <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 border-slate-600 border-2 rounded-md">
            post1
            ______________________________________________

            post2
            ______________________________________________
            post3
          </div>
        </div>
      </div>
    </div>
  )
}
