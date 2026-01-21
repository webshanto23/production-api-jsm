import { z } from "zod";

export const userIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a valid number")
    .transform(Number)
    .refine(val => val > 0, "ID must be a positive number"),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(2).max(255).trim().optional(),
    email: z.email().max(255).toLowerCase().trim().optional(),
    role: z.enum(["user", "admin"]).optional(),
  })
  .refine(
    data => {
      // Ensure at least one field is provided for update
      return Object.keys(data).length > 0;
    },
    {
      message: "At least one field must be provided for update",
    }
  );

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(255, "Name must not exceed 255 characters")
    .trim(),

  email: z
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password must not exceed 255 characters"),

  role: z.enum(["user", "admin"]).optional().default("user"),
});
