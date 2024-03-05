import * as React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import RecipeReviewCard from "@/components/activitiesMember";
import { redirect } from "next/navigation";

export default async function edit({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const _delete = async (FormData: FormData) => {
    "use server";

    const postId = FormData.get("postId") as unknown as number;
    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", postId);
    console.log(error);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/login");
    }
  };
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
            <h2 className="font-bold text-4xl mb-4">Activities</h2>
            <div className=" gap-2">
              <Link href="/create">
                <button className="btn bg-yellow-300 text-slate-900">
                  Create
                </button>
              </Link>
              <Link href="#">
                <button className="btn bg-red-600 text-white">Delete</button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div>
        <div>
          <form action={_delete}>
            <label className="text-md" htmlFor="fullname">
              Fill post ID to Delete
            </label>
            <br />
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="postId"
              placeholder="ID of post"
              required
            />
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
            <button
              // formAction={signUp}
              className="bg-red-700  text-white hover:bg-red-600 rounded-md px-4 py-2 text-foreground mb-2"
            >
              Delete Post
            </button>
          </form>
        </div>
        <RecipeReviewCard />
      </div>
    </div>
  );
}
