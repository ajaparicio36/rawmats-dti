"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { updatePassword } from "../AuthHandlers/ChangePasswordHandler";

const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await updatePassword(data.password);
    setIsLoading(false);
  };

  return (
    <div className="w-full mx-auto flex flex-col justify-center p-6 space-y-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-rawmats-text-700">
          Change Password
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <Label
            htmlFor="password"
            className="text-body font-semibold text-rawmats-text-700"
          >
            New Password
          </Label>
          <Input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Enter new password"
            className="mt-1 w-full rounded-lg border-rawmats-neutral-700 shadow-sm focus:border-rawmats-accent-300 focus:ring-rawmats-accent-300 bg-white text-rawmats-text-700"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-rawmats-feedback-error">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="confirmPassword"
            className="text-body font-semibold text-rawmats-text-700"
          >
            Confirm New Password
          </Label>
          <Input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            placeholder="Confirm new password"
            className="mt-1 w-full rounded-lg border-rawmats-neutral-700 shadow-sm focus:border-rawmats-accent-300 focus:ring-rawmats-accent-300 bg-white text-rawmats-text-700"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-rawmats-feedback-error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-rawmats-primary-700 text-white rounded-lg hover:bg-rawmats-primary-300 active:bg-rawmats-primary-700 transition-colors"
          >
            {isLoading ? "Changing password..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
