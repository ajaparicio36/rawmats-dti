import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
);

const generateRandomBit = () => {
  return crypto.randomBytes(16).toString("hex");
};

export async function uploadSupplierImage(
  file: File,
  fileName: string,
): Promise<string> {
  try {
    const randomBit = generateRandomBit();

    const { data, error } = await supabase.storage
      .from("photos")
      .upload(`users/${fileName}-${randomBit}`, file);

    if (error || !data) {
      throw new Error(error?.message || "Error uploading image");
    }

    const { data: image } = await supabase.storage
      .from("photos")
      .getPublicUrl(data.path);

    if (!image || !image.publicUrl) {
      throw new Error("Error getting public URL");
    }

    return image.publicUrl;
  } catch (error) {
    console.error("Error uploading product image:", error);
    throw error;
  }
}
