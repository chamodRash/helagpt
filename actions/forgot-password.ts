"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { ForgotPasswordSchema } from "@/schemas";

export async function ForgotPassword(
  formData: z.infer<typeof ForgotPasswordSchema>
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.email as string,
    {
      redirectTo: `${process.env.SITE_URL}/reset-password`,
    }
  );

  if (error) {
    return { error };
  }

  return {
    success: `Password reset email has been sent to ${formData.email} successfully!`,
  };
}
