import * as React from "react"
import { styled } from "@mui/material/styles"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
class Fakedata {
  Name: string | undefined
  Description: string | undefined
  Picture: string | undefined
}
const post = [
  {
    name: "Hehe",
    img: "http://phralan.in.th/images/upload/images/201279(1).jpg",
    decription: "เหลืองรักพ่อ",
  },
  {
    name: "Hehe",
    img: "http://phralan.in.th/images/upload/images/201279(1).jpg",
    decription: "เหลืองรักพ่อ",
  },
  {
    name: "Hehe",
    img: "http://phralan.in.th/images/upload/images/201279(1).jpg",
    decription: "เหลืองรักพ่อ",
  },
]
export default async function RecipeReviewCard() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let { data: activities, error } = await supabase
    .from("activities")
    .select("*")

  if (error) return redirect("/")

  console.log(activities)

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
            <h2 className="font-bold text-4xl mb-4">Activities</h2>
            <div>
              <Link href='/create'>
                <button className="btn btn-active btn-accent">Create</button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 justify-start gap-4">
          <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <div>
              {activities?.map((Attri, index) => (
                <div
                  key={index}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <img className="rounded-t-lg" src={Attri.imgurl} alt="" />
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {Attri.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {Attri.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
