import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const result = await adminService.getAllUsers();
    res.status(200).json({
      success: true,
      data: result,
      message: "Retrived users successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await adminService.updateUser(
      req.user?.id as string,
      req.body,
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "Retrived users successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const adminController = {
  getAllUsers,
  updateUser,
};
