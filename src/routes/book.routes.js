const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");
const validate = require("../middlewares/validate");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const {
  createBookSchema,
  updateBookSchema,
  bookIdParamSchema,
} = require("../validators/book.validator");

router.get("/", bookController.getAll);
router.get("/:id", validate(bookIdParamSchema, "params"), bookController.getOne);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createBookSchema),
  bookController.create
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(bookIdParamSchema, "params"),
  validate(updateBookSchema),
  bookController.update
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(bookIdParamSchema, "params"),
  bookController.remove
);

module.exports = router;

