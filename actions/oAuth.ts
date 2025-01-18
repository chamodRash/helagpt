"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signInWith = async ({
  provider,
}: {
  provider: "google" | "facebook";
}) => {
  const supabase = await createClient();
  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  console.log(data, error);

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};
