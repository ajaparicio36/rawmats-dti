"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

// Define the schema for login data
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function login(formData: FormData) {
  try {
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
      throw error;
    }

    // If login is successful, revalidate and redirect
    revalidatePath("/", "layout");
    redirect("/");
  } catch (error) {
    // Handle any errors that were thrown
    if (error instanceof Error) {
      // If it's a standard Error object, use its message
      redirect(`/error?message=${encodeURIComponent(error.message)}`);
    } else {
      // If it's an unknown error type, use a generic message
      redirect("/error?message=An unexpected error occurred");
    }
  }
}
