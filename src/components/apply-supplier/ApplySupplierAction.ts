"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import prisma from "@/utils/prisma/client";
import { User } from "@supabase/supabase-js";

const SupplierApplicationSchema = z.object({
  businessName: z.string(),
  businessAddress: z.string(),
});

export async function ApplySupplier(formData: FormData, user: User) {
  try {
    const result = SupplierApplicationSchema.safeParse({
      businessName: formData.get("businessName"),
      businessAddress: formData.get("businessAddress"),
    });

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      throw new Error(errorMessage);
    }

    const { businessName, businessAddress } = result.data;
    console.log(result.data);

    await prisma.supplier.create({
      data: {
        userId: user.id,
        businessName: businessName,
        businessLocation: businessAddress,
        businessDocuments: "",
        verified: false,
      },
    });

    // const supabase = createClient();

    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: {
    //       display_name: name,
    //       phone: phone,
    //     },
    //   },
    // });

    // if (error) {
    //   console.log(error);
    //   redirect(`/error?message=${encodeURIComponent(error.message)}`);
    // }

    // redirect(
    //   `/done?header=${encodeURIComponent("Email confirmation sent")}&message=${encodeURIComponent("Check your email to proceed!")}`,
    // );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      redirect(`/error?message=${encodeURIComponent(error.message)}`);
    } else {
      redirect("/error?message=An unexpected error occurred");
    }
  }
}
