import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const result = await medicineService.createMedicine(req.body, req.user?.id);
    res.status(201).json({
      success: true,
      data: result,
      message: "Medicine created successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMedicine = async (req: Request, res: Response) => {
  try {
    const result = await medicineService.getMedicine();
    res.status(200).json({
      success: true,
      data: result,
      message: "Retrived medicine successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMedicineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await medicineService.getMedicineById(id as string);
    res.status(200).json({
      success: true,
      data: result,
      message: "Retrived medicine successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await medicineService.updateMedicine(
      req.user?.id as string,
      id as string,
      req.body,
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "Medicine update successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await medicineService.deleteMedicine(
      req.user?.id as string,
      id as string,
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "Medicine deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const medicineController = {
  createMedicine,
  getMedicine,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
