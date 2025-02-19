import type React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingModal from "../Loading/LoadingModal";
import type { User, Supplier } from "@prisma/client";
import type { ProductWithSupplier } from "@/utils/Products";

const HomeScreen = dynamic(() => import("@/components/Screens/HomeScreen"), {
  loading: () => <LoadingModal message="Loading..." />,
  ssr: true,
});

interface DynamicHomeScreenProps {
  user: User;
  supplier: Supplier | null;
  dailyDiscoverProducts: ProductWithSupplier[];
  newArrivalsProducts: ProductWithSupplier[];
  paginatedProducts: ProductWithSupplier[];
  page: number;
  totalPages: number;
  searchQuery: string;
}

const DynamicHomeScreen: React.FC<DynamicHomeScreenProps> = (props) => {
  return (
    <Suspense fallback={<LoadingModal />}>
      <HomeScreen {...props} />
    </Suspense>
  );
};

export default DynamicHomeScreen;
