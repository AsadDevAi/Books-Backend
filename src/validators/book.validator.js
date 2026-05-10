const { z } = require("zod");
const mongoose = require("mongoose");

const objectId = z
  .string({ required_error: "ID kiritilishi shart" })
  .refine((v) => mongoose.Types.ObjectId.isValid(v), {
    message: "Noto'g'ri ID format",
  });

const createBookSchema = z.object({
  title: z.string().trim().min(1, "Sarlavha kiritilishi shart").max(200),
  author: z.string().trim().min(1, "Muallif kiritilishi shart").max(100),
  description: z.string().max(2000).optional().default(""),
  price: z
    .number({ required_error: "Narx kiritilishi shart" })
    .positive("Narx musbat son bo'lishi kerak"),
  stock: z
    .number()
    .int("Stock butun son bo'lishi kerak")
    .min(0, "Stock manfiy bo'lmasin")
    .optional()
    .default(0),
  category: z.string().trim().min(1, "Kategoriya kiritilishi shart").max(100),
});

const updateBookSchema = createBookSchema.partial();

const bookIdParamSchema = z.object({
  id: objectId,
});

module.exports = { createBookSchema, updateBookSchema, bookIdParamSchema };
