import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { orderController } from "./order.controller";

const router = Router();
router.get(
  "/",
  auth(UserRole.CUSTOMER, UserRole.ADMIN),
  orderController.getOrder,
);
router.get(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.ADMIN),
  orderController.getOrderById,
);
router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder);

export const orderRouter = router;
