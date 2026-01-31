import { prisma } from "../../lib/prisma";
import { createCategoryData } from "../../types/types";

const createCategory = async (data: createCategoryData) => {
  const result = await prisma.category.create({
    data: {
      ...data,
    },
  });
  return result;
};

const getCategory = async () => {
  const result = await prisma.category.findMany();
  return result;
};

export const categoryService = {
  createCategory,
  getCategory,
};
