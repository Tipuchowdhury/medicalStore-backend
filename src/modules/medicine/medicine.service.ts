import { prisma } from "../../lib/prisma";
import { createMedicineData, updateMedicineType } from "../../types/types";

const createMedicine = async (data: createMedicineData, sellerId: string) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      sellerId,
    },
  });
  return result;
};

const getMedicine = async ({
  search,
  category,
  price_range,
}: {
  search?: string;
  category?: string | undefined;
  price_range?: string | undefined;
}) => {
  const whereCondition: any = {};
  if (search) {
    whereCondition.name = {
      contains: search,
      mode: "insensitive",
    };
  }
  if (category) {
    whereCondition.category = {
      name: category,
    };
  }
  if (price_range) {
    const [min, max] = price_range.split("-").map(Number);
    whereCondition.price = {
      gte: min,
      lte: max,
    };
  }
  const result = await prisma.medicine.findMany({
    where: whereCondition,
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

const updateMedicine = async (
  sellerId: string,
  medicineId: string,
  data: updateMedicineType,
) => {
  const medicine = await prisma.medicine.findUnique({
    where: {
      id: medicineId,
    },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }
  if (medicine.sellerId != sellerId) {
    throw new Error("Unauthorized!!!");
  }
  const result = await prisma.medicine.update({
    where: {
      id: medicineId,
    },
    data,
  });

  return result;
};

const deleteMedicine = async (sellerId: string, medicineId: string) => {
  const medicine = await prisma.medicine.findFirst({
    where: {
      id: medicineId,
    },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }
  if (medicine.sellerId != sellerId) {
    throw new Error("Unauthorized!!!");
  }
  const result = await prisma.medicine.delete({
    where: {
      id: medicineId,
    },
  });

  return result;
};
export const medicineService = {
  createMedicine,
  getMedicine,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
