import React from "react";
import DynamicScreen from "@/components/AuthComponents/DynamicScreen";
import SignUpForm from "@/components/AuthComponents/SignUpForm";

const BuyerSignUp = () => {
  const header = "Sign Up";
  const message = "Join the community!";
  const body = <SignUpForm />;
  return <DynamicScreen header={header} message={message} body={body} />;
};

export default BuyerSignUp;
