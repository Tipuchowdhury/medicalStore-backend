import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: "Category created successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getCategory();
    res.status(200).json({
      success: true,
      data: result,
      message: "Category retrived successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const categoryController = {
  createCategory,
  getCategory,
};
