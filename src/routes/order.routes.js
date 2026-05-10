const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const validate = require("../middlewares/validate");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const {
  createOrderSchema,
  orderIdParamSchema,
  userIdParamSchema,
} = require("../validators/order.validator");

router.get(
  "/my/:userId",
  authMiddleware,
  validate(userIdParamSchema, "params"),
  orderController.getMyOrders
);

router.get("/", authMiddleware, roleMiddleware("ADMIN"), orderController.getAll);

router.post("/", authMiddleware, validate(createOrderSchema), orderController.create);

router.patch(
  "/:id/cancel",
  authMiddleware,
  validate(orderIdParamSchema, "params"),
  orderController.cancel
);

module.exports = router;

