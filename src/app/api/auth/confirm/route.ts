import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (token_hash && type) {
    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      if (type === "recovery") {
        redirect("/recover/update");
      } else if (type === "signup" || type == "email") {
        redirect(
          "/done?header=Email_confirmed&message=Your_email_has_been_confirmed&type=email",
        );
      }
    }
  }

  redirect("/error");
};
