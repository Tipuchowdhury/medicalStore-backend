import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const updateUser = async (id: string, data: string) => {
  const result = await prisma.user.update({
    where: { id },
    data,
  });

  return result;
};
export const adminService = {
  getAllUsers,
  updateUser,
};
