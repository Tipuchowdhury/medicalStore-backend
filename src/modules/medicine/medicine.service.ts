import { prisma } from "../../lib/prisma";
import { createMedicineData } from "../../types/types";

const createMedicine = async (data: createMedicineData, sellerId: string) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      sellerId,
    },
  });
  return result;
};

const getMedicine = async () => {
  const result = await prisma.medicine.findMany({
    include: {
      category: true,
    },
  });
  return result;
};

const getMedicineById = async (id: string) => {
  const result = await prisma.medicine.findFirst({
    where: {
      id: id,
    },
  });
  return result;
};

export const medicineService = {
  createMedicine,
  getMedicine,
  getMedicineById,
};
