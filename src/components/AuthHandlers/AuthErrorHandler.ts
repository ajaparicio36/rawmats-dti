import { AuthError } from "@supabase/supabase-js";

export const parseAuthError = (error: AuthError) => {
  if (error.code === "invalid_credentials") {
    return { error: "Invalid email or password" };
  }
  if (error.code === "email_not_confirmed") {
    return { error: "Email not confirmed" };
  }
  if (error.code === "user_not_found") {
    return { error: "User not found" };
  }
  if (error.code === "same_password") {
    return { error: "New password must be different from the old password" };
  }
  return { error: "An unexpected error occurred" };
};
