import { Product, Supplier, User } from "@prisma/client";

export interface ProductWithSupplier extends Product {
  supplier: Supplier;
}

export interface Products {
  products: ProductWithSupplier[];
  userId: string;
}

export interface ProductPreview {
  userId: string;
  id: string;
  name: string;
  price: number;
  image: string;
  supplier: {
    businessName: string;
    businessLocation: string;
  };
}

export interface SupplierWithUser extends Supplier {
  user: User;
}

export interface SupplierDashboardProps {
  children: React.ReactNode;
  adminRole: boolean;
  initialProducts: ProductWithSupplier[];
  supplier: SupplierWithUser;
  children: React.ReactNode;
}

export interface ProductsPageProps {
  products: ProductWithSupplier[];
  supplierId: string;
  supplierName: string;
}

export interface ManageProductsPageProps {
  products: ProductWithSupplier[];
  supplierName: string;
}

export interface NotificationsPageProps {
  supplierName: string;
}
