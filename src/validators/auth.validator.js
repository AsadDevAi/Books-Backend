const { z } = require("zod");

const registerSchema = z.object({
  fullName: z
    .string({ required_error: "To'liq ism kiritilishi shart" })
    .trim()
    .min(2, "Ism kamida 2 belgidan iborat bo'lsin")
    .max(100, "Ism juda uzun"),
  email: z
    .string({ required_error: "Email kiritilishi shart" })
    .trim()
    .toLowerCase()
    .email("Email noto'g'ri formatda"),
  password: z
    .string({ required_error: "Parol kiritilishi shart" })
    .min(6, "Parol kamida 6 belgidan iborat bo'lsin")
    .max(100, "Parol juda uzun"),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email kiritilishi shart" })
    .trim()
    .toLowerCase()
    .email("Email noto'g'ri formatda"),
  password: z
    .string({ required_error: "Parol kiritilishi shart" })
    .min(1, "Parol kiritilishi shart"),
});

module.exports = { registerSchema, loginSchema };
