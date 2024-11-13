import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AuthScreenProps } from "@/utils/AuthScreenProps";

const DesktopAuthScreen = dynamic(
  () => import("@/components/Screens/DesktopAuthScreen"),
  {
    loading: () => <p>Loading desktop login...</p>,
    ssr: true,
  },
);

const MobileAuthScreen = dynamic(
  () => import("@/components/Screens/MobileAuthScreen"),
  {
    loading: () => <p>Loading mobile login...</p>,
    ssr: true,
  },
);

const DynamicScreen: React.FC<AuthScreenProps> = ({
  header,
  message,
  body,
  mobileBody,
  mobileHeader,
  mobileMessage,
}) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden md:flex w-full h-screen items-center justify-center">
          <DesktopAuthScreen header={header} message={message} body={body} />
        </div>
        <div className="md:hidden w-full h-screen">
          {mobileBody && !mobileHeader && !mobileMessage ? (
            <MobileAuthScreen
              header={header}
              message={message}
              body={mobileBody}
            />
          ) : mobileBody && mobileHeader && mobileMessage ? (
            <MobileAuthScreen
              header={""}
              message={""}
              body={mobileBody}
              mobileHeader={mobileHeader}
              mobileMessage={mobileMessage}
            />
          ) : (
            <MobileAuthScreen header={header} message={message} body={body} />
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default DynamicScreen;
