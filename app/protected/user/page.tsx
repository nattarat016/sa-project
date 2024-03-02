import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
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
          <div className='cursor-pointer m-1 rounded-2xl flex flex-col justify-start items-center w-96 border-8 border-gradient-to-l from-white via-white to-white bg-gradient-to-tr h-3/4'>
            <div className=" text-black justify-between">
              <div className='flex justify-center items-center py-4'>
                <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser%2BAvatar&psig=AOvVaw2_PtIwL1B-9hZDIPyJTpJ0&ust=1709436723955000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjso5TS1IQDFQAAAAAdAAAAABAq' alt="" width="90" height="90" className='rounded-lg sepia '/>
              </div>
                <h1 className='text-neutral-700 font-bold text-2xl text-center'>Gmail : {user.email}!</h1>
                <br />
                <h3 className='font-semibold text-slate-900 uppercase text-center py-2'>หน่วยกิต</h3>
                <br />
              <p className=" text-center">หน่วยกิตทั้งหมด : 100/100</p>
              <p className=" text-center">หน่วยกิตบัจจุบัน : 23/100</p>
            </div>     
          </div>
        </div>
        <div className="col-span-2  justify-between">
          <h4 className="font-bold text-4xl mb-4">Activities</h4>
          <Link href="/create">
            <button className="btn bg-yellow-300 text-slate-900">Add</button>
          </Link>
          <Link href="#">
            <button className="btn bg-red-600 text-white">Delete</button>
          </Link>
        </div>
        <div className="row-span-2 col-span-2 ...">
        <div className='cursor-pointer m-1 rounded-2xl flex flex-col justify-start items-center w-96 border-8 border-gradient-to-l from-white via-white to-white bg-gradient-to-tr h-3/4'>
          <div>
              <h1 className='text-neutral-700 font-bold text-3xl text-center'>Post</h1>
              <h3 className='font-semibold text-md uppercase text-center py-2 text-black'>About</h3>
              <p className='text-sm text-neutral-600 text-center mx-10'>แสดงโพสทั้งหมดที่ทำมา</p>
              <p className='text-sm text-neutral-600 text-center mx-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iusto itaque adipisci magni? Veniam cumque natus in porro pariatur autem soluta tempora, iure, rerum odio facere quis laudantium, esse consequuntur?</p>
              <div className='flex justify-center items-center gap-6 py-6'>
              <button className='text-white uppercase bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg w-11/12 '>PDF Dowload</button>
              </div>
             </div>      
    </div>
        </div>
      </div>
    </div>
  );
}
