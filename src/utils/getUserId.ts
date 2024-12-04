"use server";

import { createClient } from "./supabase/server";

export const getUserId = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("User not found");
    }

    const { user } = data;
    return user.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
