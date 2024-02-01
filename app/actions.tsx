"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function register(formdata: FormData) {
  const fullname = formdata.get("fullname");
  const email = formdata.get("email");
  const password = formdata.get("password");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("users")
    .insert([{
        fullname,
        email,
        password
    }])

    if (error){
        return console.log("error",error)
    }

    console.log("registed")
}