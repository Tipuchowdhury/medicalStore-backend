import { Request, Response } from "express";

const getMe = async (req: Request, res: Response) => {
  try {
    res.status(201).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const authController = {
  getMe,
};
