"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export const updatePassword = async (newPassword: string) => {
  const supabase = createClient();

  const PasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const result = PasswordSchema.safeParse({ password: newPassword });

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    throw new Error(errorMessage);
  }

  const { password } = result.data;

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    redirect("/error");
  }

  redirect(
    `/done?header=${encodeURIComponent("Password Reset")}&message=${encodeURIComponent("Your password has been reset, log in again!")}&type=reset`,
  );
};
