"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

// Define the schema for login data
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function login(formData: FormData) {
  // Parse and validate the form data
  const result = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If validation fails, throw an error
  if (!result.success) {
    const errorMessage = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    throw new Error(errorMessage);
  }

  // If validation succeeds, proceed with login
  const { email, password } = result.data;

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // If Supabase returns an error, throw it
  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  // If login is successful, revalidate and redirect
  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  // If Supabase returns an error, throw it
  if (error) {
    throw error;
  }

  // If logout is successful, revalidate and redirect
  revalidatePath("/", "layout");
  redirect("/login");
}
