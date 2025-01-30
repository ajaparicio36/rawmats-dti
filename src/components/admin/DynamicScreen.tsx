import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingModal from "../Loading/LoadingModal";

const AdminScreen = dynamic(() => import("@/components/Screens/AdminScreen"), {
  loading: () => <LoadingModal message="Loading..." />,
  ssr: true,
});

const DynamicScreen: React.FC = () => {
  return (
    <Suspense fallback={<LoadingModal />}>
      <AdminScreen />
    </Suspense>
  );
};

export default DynamicScreen;
