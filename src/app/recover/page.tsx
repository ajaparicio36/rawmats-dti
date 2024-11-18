import React from "react";
import DynamicScreen from "@/components/AuthComponents/DynamicScreen";
import ResetPasswordForm from "@/components/AuthComponents/ResetPasswordForm";

const ResetPasswordPage = () => {
  const header = "Reset Password";
  const message = "Recover your lost account";
  const body = <ResetPasswordForm />;
  return <DynamicScreen header={header} message={message} body={body} />;
};

export default ResetPasswordPage;
