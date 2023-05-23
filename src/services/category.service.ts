import { ICategory } from '../dtos/category.dto';
import { prisma } from '../plugins/prisma';

async function findCategory(opts:boolean) {

  const categories= await prisma.categories.findMany({
    include:{
      products:opts
    }
  });
  return  categories;
}

async function findCategoryById(id: number, opts: boolean) {
  const categories = await prisma.categories.findUnique({
    where: { id },
    include: {
      products: opts
    }
  });
  return categories;
}

async function createCategory({ categoryTitle, categoryDescription }: ICategory) {
  return await prisma.categories.create({
    data: {
      category_title: categoryTitle,
      category_description: categoryDescription,
    }
  });
}

async function updateCategory(id: number, { categoryTitle, categoryDescription }: ICategory) {
  return await prisma.categories.update({
    where: { id },
    data: {
      category_title: categoryTitle,
      category_description: categoryDescription
    }
  });
}

async function deleteCategory(id: number) {
  return await prisma.categories.delete({
    where: { id }
  });
}

export { findCategory, findCategoryById, createCategory, updateCategory, deleteCategory };
