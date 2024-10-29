"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";

const SignoutButton = () => {
  const signOut = async () => {
    await logout();
  };
  return <Button onClick={signOut}>Sign out</Button>;
};

export default SignoutButton;
