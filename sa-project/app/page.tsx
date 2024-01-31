
import AuthButton from "@/components/AuthButton";
import { register } from "./actions";

export default async function Index() {


  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className=" flex-1 flex flex-col gap-20  max-w-4xl px-3">
        <AuthButton/>
        <main className="flex-1 flex flex-col gap-6">
          <form action={register}>
          <div>
            <label className="text-md" htmlFor="fullname">
              Fullname
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
            Email
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
            Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          
          <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Register
        </button>
        </form>
        </main>
      </div>
    </div>
  );
}
