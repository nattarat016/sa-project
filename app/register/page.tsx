import AuthButton from "@/components/AuthButton";
import { register } from "../actions";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    console.log(email, password);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
      return redirect("/register?message=Could not authenticate user");
    }

    return redirect(
      "/register?message=Check email to continue sign in process"
    );
  };

  return (
    <div className="flex-1 w-full flex flex-col  gap-5 items-center mt-20">
      <div className=" flex-1 flex flex-col gap-5  max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6 ">
          <form action={signUp}>
            <div>
              <label className="text-md" htmlFor="fullname">
                username
              </label>
              <br />
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="fullname"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <br />
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <br />
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              // formAction={signUp}
              className="bg-red-700  text-white hover:bg-red-600 rounded-md px-4 py-2 text-foreground mb-2"
            >
              Sign Up
            </button>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center ">
                {searchParams.message}
              </p>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
