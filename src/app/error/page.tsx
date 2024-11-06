import React from "react";

const ErrorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const message =
    (await searchParams).message || "An unexpected error occurred.";
  return <div>{message}</div>;
};

export default ErrorPage;
