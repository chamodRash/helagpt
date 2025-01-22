"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { RegisterSchema } from "@/schemas";

export async function emailRegister(formData: z.infer<typeof RegisterSchema>) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
    options: {
      data: {
        full_name: formData.name as string,
        role: "USER",
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  console.log(error);
  if (error) {
    return { error: "Something went wrong!" };
  }

  return {
    success:
      "Account created successfully! Confirmation email has been sent to " +
      formData.email +
      ".",
  };
}
