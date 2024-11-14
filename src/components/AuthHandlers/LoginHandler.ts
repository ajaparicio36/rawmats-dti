"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { parseAuthError } from "./AuthErrorHandler";

// Define the schema for login data
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function login(formData: FormData) {
  try {
    const result = LoginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      throw new Error(errorMessage);
    }

    const { email, password } = result.data;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return parseAuthError(error);
    }

    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/error?message=${encodeURIComponent(error.message)}`);
    } else {
      redirect(
        `/error?message=${encodeURIComponent("An unexpected error occurred")}`,
      );
    }
  }
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
