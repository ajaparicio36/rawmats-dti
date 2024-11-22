import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function uploadProductImage(file: File) {
  try {
    const { data, error } = await supabase.storage
      .from("photos") 
      .upload(`products/${Date.now()}-${file.name}`, file);

    if (error) {
      throw new Error(error.message);
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
  } catch (error) {
    console.error("Error uploading product image:", error);
    throw error;
  }
}


