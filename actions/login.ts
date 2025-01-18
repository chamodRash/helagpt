"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LoginSchema } from "@/schemas";

export async function emailLogin(formData: z.infer<typeof LoginSchema>) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: "Something went wrong!" };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
