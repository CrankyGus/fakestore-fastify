import { IProduct } from '../dtos/product.dto';
import { prisma } from '../plugins/prisma';

async function getAllProducts() {
  const products = await prisma.products.findMany();
  return products;
}

async function getProductById(id: number) {
  const product = await prisma.products.findUnique({
    where: {
      id: id
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
