// import prisma from "./prisma/client";

// const productPreviewData = {
//   id: true,
//   name: true,
//   description: true,
//   price: true,
//   supplier: {
//     select: {
//       businessName: true,
//     },
//   },
// };

// export const newArrivals = async () => {
//   try {
//     const newArrivals = await prisma.product.findMany({
//       select: productPreviewData,
//       orderBy: {
//         dateAdded: "desc",
//       },
//       take: 20,
//     });
//     return newArrivals;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const topProducts = async () => {
//   try {
//     const topProducts = await prisma.product.findMany({
//       select: productPreviewData,
//       // orderBy: { ** Need an amount of favorites field ** }
//       //     favorites: "desc",
//       // },
//       take: 5,
//     });
//     return topProducts;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const topRatedSuppliers = async () => {
//   try {
//     const topSuppliers = await prisma.supplier.findMany({
//       // orderBy: { ** Need a rating system **
//       //     rating: "desc";
//       // },
//       take: 20,
//     });
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };
