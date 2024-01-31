
import AuthButton from "@/components/AuthButton";
import { register } from "../actions";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function Index() {

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">

      <Link
        href="/"
        className=" bg-yellow-700  hover:bg-yellow-600 absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <div className=" flex-1 flex flex-col gap-20  max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6 py-28" >
          <form action={register}>
          <div>
            <label className="text-md" htmlFor="fullname">
              username :
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="fullname"
              placeholder="Fullname"
              required
            />
          </div>
          <div>
            <label className="text-md" htmlFor="email">
            Email       :
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label className="text-md" htmlFor="password">
            Password : 
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          
          <button
          formAction={signUp} 
          className="bg-yellow-700  hover:bg-yellow-600 rounded-md px-4 py-2 text-foreground mb-2">
          Register
        </button>
        </form>
        </main>
      </div>
    </div>
  );
}