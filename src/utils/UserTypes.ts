import { User, Supplier } from "@prisma/client";

export interface SupplierUser extends User {
  supplier: Supplier;
}
