import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
);

// Upload file using standard upload
export async function uploadFile(file: File) {
  const { data, error } = await supabase.storage
    .from("product-photos")
    .upload(file.name, file);
  if (error) {
    // Handle error
    console.error(error);
  } else {
    // Handle success
    console.log(data);
  }
}
