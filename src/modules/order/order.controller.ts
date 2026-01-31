import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { items } = req.body;
    const result = await orderService.createOrder(items, req.user?.id);
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

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrder(req.user?.id as string);
    res.status(200).json({
      success: true,
      data: result,
      message: "Order fetched successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const result = await orderService.getOrderById(
      id as string,
      userId as string,
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "Order fetched successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getSellerOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getSellerOrders(req.user?.id as string);
    res.status(200).json({
      success: true,
      data: result,
      message: "Order fetched successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const orderController = {
  createOrder,
  getOrder,
  getOrderById,
  getSellerOrders,
};
