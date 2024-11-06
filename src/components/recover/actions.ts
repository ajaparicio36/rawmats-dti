"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const sendResetPassword = async (email: string) => {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    redirect("/error");
  }

  redirect(
    "/done?header=Check_your_email&message=Password_reset_email_sent_to_your_inbox&type=email",
  );
};
