"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUser() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user)

    if (!user){
        return null
    }
    return user.email
}