import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { orderItemController } from "./orderItem.controller";

const router = Router();
router.patch(
  "/:id",
  auth(UserRole.SELLER),
  orderItemController.updateOrderItemStatus,
);

export const orderItemRouter = router;
