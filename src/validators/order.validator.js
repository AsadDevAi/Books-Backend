const { z } = require("zod");
const mongoose = require("mongoose");

const objectId = z
  .string({ required_error: "ID kiritilishi shart" })
  .refine((v) => mongoose.Types.ObjectId.isValid(v), {
    message: "Noto'g'ri ID format",
  });

const createOrderSchema = z.object({
  bookId: objectId,
  quantity: z
    .number({ required_error: "Miqdor kiritilishi shart" })
    .int("Miqdor butun son bo'lishi kerak")
    .positive("Miqdor musbat son bo'lishi kerak"),
});

const orderIdParamSchema = z.object({
  id: objectId,
});

const userIdParamSchema = z.object({
  userId: objectId,
});

module.exports = {
  createOrderSchema,
  orderIdParamSchema,
  userIdParamSchema,
};
