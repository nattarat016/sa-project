import * as React from "react";
import { styled } from "@mui/material/styles";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
class Fakedata {
  Name: string | undefined;
  Description: string | undefined;
  Picture: string | undefined;
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
];
export default async function RecipeReviewCard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: activities, error } = await supabase
    .from("activities")
    .select("*");

  if (error) return redirect("/");

  console.log(activities);

  return (
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
  );
}
