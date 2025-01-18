"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { ResetPasswordSchema } from "@/schemas";

export async function ReserPassword(
  formData: z.infer<typeof ResetPasswordSchema>
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    return { error };
  }

  return { success: "Password has been reset successfully!" };
}
