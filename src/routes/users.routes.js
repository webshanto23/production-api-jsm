import express from "express";
import {
  fetchAllUsers,
  fetchUserById,
  updateUserById,
  deleteUserById,
  createUserHandler,
} from "#controllers/users.controller";
import { authenticateToken, requireRole } from "#middlewares/auth.middleware";

const router = express.Router();

// GET /users - Get all users (admin only)
router.get("/", authenticateToken, fetchAllUsers);

// GET /users/:id - Get user by ID (authenticated users only)
router.get("/:id", authenticateToken, fetchUserById);

// PUT /users/:id - Update user by ID (authenticated users can update own profile, admin can update any)
router.put("/:id", authenticateToken, updateUserById);

// DELETE /users/:id - Delete user by ID (admin only)
router.delete(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  deleteUserById,
);

// POST /users - Create a new user
router.post("/", createUserHandler);

export default router;
