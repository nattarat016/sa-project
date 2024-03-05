import * as React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import Stack from "@mui/material/Stack"
import Pagination from "@mui/material/Pagination"

export default async function RecipeReviewCard() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  

  let { data: activities, error } = await supabase
    .from("activities")
    .select("*")
    .range(0,3)
    .order("id", { ascending: false })

  if (error) return redirect("/")

  return (
    
    <div className="flex-1 w-full flex flex-col gap-20 items-center py-10">
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