"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DoneButton = () => {
  const router = useRouter();
  const onButtonClick = () => {
    router.push("/login");
  };

  return (
    <Button
      onClick={onButtonClick}
      className="bg-rawmats-primary-700 active:bg-rawmats-primary-300"
    >
      Back to Login
    </Button>
  );
};

export default DoneButton;
