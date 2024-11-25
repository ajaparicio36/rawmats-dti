import React from "react";

const ErrorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const code = `${(await searchParams).code}` || "Error Code 500";
  const message =
    `${(await searchParams).message}` || "An unexpected error occurred.";
  const parsedCode = decodeURIComponent(code);
  const parsedMessage = decodeURIComponent(message);
  return (
    <div>
      Error Code {parsedCode}: {parsedMessage}
    </div>
  );
};

export default ErrorPage;
