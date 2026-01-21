import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2).max(255).trim(),
  email: z.email().max(255).toLowerCase().trim(),
  password: z.string().min(6).max(128),
  role: z.enum(["user", "admin"]).default("user"),
});

export const signInSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(1),
});

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.string().optional(),
});
