import { Request, Response } from "express";
import { orderItemService } from "./orderItem.service";

const updateOrderItemStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { id } = req.params;
    const result = await orderItemService.updateOrderItemStatus(
      id as string,
      req.user?.id,
      req.body,
    );
    res.status(201).json({
      success: true,
      data: result,
      message: "Order created successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const orderItemController = {
  updateOrderItemStatus,
};
