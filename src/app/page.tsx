"use server";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignoutButton from "@/components/AuthComponents/SignoutButton";
import prisma from "@/utils/prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Home = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const products = await prisma.product.findMany({
    include: {
      supplier: true,
    },
  });

  const suppliers = await prisma.supplier.findMany({
    include: {
      user: true,
    },
  });

  if (error || !data.user) {
    redirect("/login");
  }
  return (
    <div>
      Hello {data.user.email}, Click here to <SignoutButton />
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[300px]">Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.supplier.businessName}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${
                      product.verified
                        ? "bg-rawmats-feedback-success text-green-800"
                        : "bg-rawmats-feedback-warning text-gray-800"
                    }`}
                  >
                    {product.verified ? "Verified" : "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[300px]">Location</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">
                  {supplier.businessName}
                </TableCell>
                <TableCell>{supplier.businessLocation}</TableCell>
                <TableCell>{supplier.user.displayName}</TableCell>
                <TableCell>
                  <Badge
                    variant={supplier.verified ? "default" : "destructive"}
                    className={`${
                      supplier.verified
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {supplier.verified ? "Verified" : "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
