import { IProduct } from '../dtos/product.dto';
import { prisma } from '../plugins/prisma';

interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  limit: number;
  data: any[]; // Replace 'any' with the appropriate data type for your items
}

async function getAllProducts(page: number, pageSize: number): Promise<IPagination> {
  const totalItems = await prisma.products.count();
  const totalPages = Math.ceil(totalItems / pageSize);

  const products = await prisma.products.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      product_category: true
    }
  });

  const result: IPagination = {
    currentPage: page,
    totalPages,
    totalItems,
    itemsPerPage: pageSize,
    limit: totalItems,
    data: products
  };

  return result;
}

async function getProductById(id: number) {
  if (!id)
    return await prisma.products.findMany({
      include: {
        product_category: true
      }
    });

  const product = await prisma.products.findUnique({
    where: {
      id: id
    },
    include: {
      product_category: true
    }
  });
  return product;
}

async function createProduct({
  productBrandId,
  productCategoryId,
  productDescription,
  productDicontinued,
  productImage,
  productPrice,
  productStock,
  productTitle
}: IProduct) {
  const product = await prisma.products.create({
    data: {
      product_title: productTitle,
      product_description: productDescription,
      price: productPrice,
      stock: productStock,
      product_image: productImage,
      product_brandId: productBrandId,
      discontinued: productDicontinued,
      product_category: {
        connect: {
          id: productCategoryId
        }
      }
    }
  });
  return product;
}

async function updateProduct(
  id: number,
  {
    productBrandId,
    productCategoryId,
    productDescription,
    productDicontinued,
    productImage,
    productPrice,
    productStock,
    productTitle
  }: IProduct
) {
  const product = await prisma.products.update({
    where: {
      id: id
    },
    data: {
      product_title: productTitle,
      product_description: productDescription,
      price: productPrice,
      stock: productStock,
      product_image: productImage,
      product_brandId: productBrandId,
      discontinued: productDicontinued,
      product_category: {
        connect: {
          id: productCategoryId
        }
      }
    }
  });
  return product;
}

async function deleteProduct(id: number) {
  const product = await prisma.products.delete({
    where: {
      id: id
    }
  });
  return product;
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
