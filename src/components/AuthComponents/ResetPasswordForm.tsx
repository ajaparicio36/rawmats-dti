"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { sendResetPassword } from "../AuthHandlers/SendRecoveryHandler";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormData = z.infer<typeof schema>;

const ResetPasswordForm = () => {
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
    await sendResetPassword(data.email);
    setIsLoading(false);
  };

  return (
    <div className="w-full mx-auto flex flex-col justify-center p-6 space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <Label
            htmlFor="email"
            className="text-body font-semibold text-rawmats-text-700"
          >
            Enter your email address
          </Label>
          <Input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Email"
            className="mt-1 w-full rounded-lg border-rawmats-neutral-700 shadow-sm focus:border-rawmats-accent-300 focus:ring-rawmats-accent-300 bg-white text-rawmats-text-700"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-rawmats-feedback-error">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col space-y-1 text-sm text-rawmats-text-500">
            <a href="/login" className="hover:text-rawmats-accent-300">
              Go back to login
            </a>
            <a href="/signup" className="hover:text-rawmats-accent-300">
              {"Don't have an account?"}
            </a>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-rawmats-primary-700 text-white rounded-lg hover:bg-rawmats-primary-300 active:bg-rawmats-primary-700 transition-colors"
          >
            {isLoading ? "Sending email..." : "Send Reset Link"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
