import React from "react";
import { SubmitButton } from "./submit-button";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { log } from "console";

export default function page() {
  const create = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;
    const supabase = createClient();
    const pathfile = uuidv4();
    let url: string | null;

    if (file.size != 0) {
      const { data: fileData, error: err } = await supabase.storage
        .from("attachments")
        .upload(pathfile, file, {
          contentType: "image/jpeg",
        });
      if (err) {
        log(123);
        return err;
      }
      const { data: urls } = supabase.storage
        .from("attachments")
        .getPublicUrl(pathfile);

      url = urls.publicUrl;
    } else {
      url = null;
    }

    const { data, error } = await supabase.from("activities").insert([
      {
        name,
        description,
        imgurl: url,
      },
    ]);
    if (error) {
      log(555);
      // return redirect("/user/novels/create?message=create error");
    }

    // return redirect("/user/novels");
  };

  return (
    <div>
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md gap-2">
        <form className="animate-in flex-1 flex flex-col w-full p-10 gap-2 text-foreground">
          <label className="text-md" htmlFor="name">
            Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="name"
            placeholder="yourname"
            required
          />
          <label className="text-md" htmlFor="description">
            Description
          </label>
          <textarea
            rows={4}
            cols={65}
            className="rounded-md px-4 py-2 bg-inherit border mb-6 w-fit"
            name="description"
            placeholder="description..."
            required
          />
          <label className="text-md" htmlFor="file">
            Main photo
          </label>
          <input
            type="file"
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="file"
            placeholder="yourname"
            required
          />
          <SubmitButton
            formAction={create}
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Creating..."
          >
            Create
          </SubmitButton>
          {/* {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )} */}
        </form>
      </div>
    </div>
  );
}
