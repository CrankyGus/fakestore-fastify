import { IBrand } from '../dtos/brand.dto';
import { prisma } from '../plugins/prisma';

async function getAllBrand(opts: boolean) {
  try {
    const brand = await prisma.brand.findMany({
      include: {
        products: opts
      }
    });
    return brand;
  } catch (err) {
    return err;
  }
}

async function getBrandById(id: number, opts: boolean) {
  try {
    const brand = await prisma.brand.findUnique({
      where: {
        id: id
      },
      include: {
        products: opts
      }
    });

    return brand;
  } catch (err) {
    return err;
  }
}

async function createBrand({ brandTitle }: IBrand) {
  try {
    const brand = await prisma.brand.create({
      data: {
        brand_title: brandTitle
      }
    });

    return brand;
  } catch (err) {
    return err;
  }
}

async function updateBrand(id: number, { brandTitle }: IBrand) {
  try {
    const brand = await prisma.brand.update({
      where: {
        id: id
      },
      data: {
        brand_title: brandTitle
      }
    });
    return brand;
  } catch (err) {
    return err;
  }
}

async function deleteBrand(id: number) {
  try {
    const brand = await prisma.brand.delete({
      where: {
        id: id
      }
    });
    return brand;
  } catch (err) {
    return err;
  }
}

export { getAllBrand, getBrandById, createBrand, updateBrand, deleteBrand };
