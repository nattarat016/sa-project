import * as React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import Stack from "@mui/material/Stack"
import Pagination from "@mui/material/Pagination"

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
    .range(0,3)
    .order("id", { ascending: false })

  if (error) return redirect("/")


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
            <div className=" gap-2">
              <Link href='/create'>
                <button className="btn bg-yellow-300 text-slate-900">Create</button>
              </Link>
              <Link href='#'>
                <button className="btn bg-red-600 text-white">Delete</button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      
      {activities?.map((Attri, index) => (
                <div
                  key={index}
                  className=" w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
      <div className="card mb-3">
      <img className="card-img-top" src={Attri.imgurl} alt="Card image cap"/>
      <div className="card-body">
      <h5 className="card-title">{Attri.name}</h5>
      <p className="card-text">{Attri.description}</p>
      </div>
      </div>
      </div>
              ))}
      <div className="  text-white ">
     <Stack spacing={3}>
     <Pagination count={10} shape="rounded" />
    </Stack>
    </div>
    </div>
    
  )
}
