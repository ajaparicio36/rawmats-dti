import React from "react";
import DynamicScreen from "@/components/AuthComponents/DynamicScreen";
import ChangePasswordForm from "@/components/AuthComponents/ChangePasswordForm";

const ResetPasswordPage = () => {
  const header = "Change Password";
  const message = "Recover your lost account";
  const body = <ChangePasswordForm />;
  return <DynamicScreen header={header} message={message} body={body} />;
};

export default ResetPasswordPage;
