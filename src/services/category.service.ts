import { ICategory } from '../dtos/category.dto';
import { prisma } from '../plugins/prisma';

async function findCategory(opts: boolean) {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        products: opts
      }
    });
    return categories;
  } catch (err) {
    return err;
  }
}

async function findCategoryById(id: number, opts: boolean) {
  try {
    const categories = await prisma.categories.findUnique({
      where: { id },
      include: {
        products: opts
      }
    });
    return categories;
  } catch (err) {
    return err;
  }
}

async function createCategory({ categoryTitle, categoryDescription }: ICategory) {
  try {
    const categories = await prisma.categories.create({
      data: {
        category_title: categoryTitle,
        category_description: categoryDescription
      }
    });
    return categories;
  } catch (err) {
    return err;
  }
}

async function updateCategory(id: number, { categoryTitle, categoryDescription }: ICategory) {
  try {
    const categories = await prisma.categories.update({
      where: { id },
      data: {
        category_title: categoryTitle,
        category_description: categoryDescription
      }
    });
    return categories;
  } catch (err) {
    return err;
  }
}
async function deleteCategory(id: number) {
  try {
    const categories = await prisma.categories.delete({
      where: { id }
    });
    return categories;
  } catch (err) {
    return err;
  }
}

export { findCategory, findCategoryById, createCategory, updateCategory, deleteCategory };
