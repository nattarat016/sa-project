import * as React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import Stack from "@mui/material/Stack"
import Pagination from "@mui/material/Pagination"

export default async function RecipeReviewCard() {
  "use server"
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  

  let { data: activities, error } = await supabase
    .from("activities")
    .select("*")
    .order("id", { ascending: false })

  if (error) return redirect("/")

  return (
    
    <div className="flex gap-2 py-10 grid grid-cols-3 grid-flow-row">
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
      <p className="card-text">หน่วยกิต : {Attri.activityunit} หน่วย</p>
      </div>
      </div>
      </div>
              ))}
    </div>
    
  )
}