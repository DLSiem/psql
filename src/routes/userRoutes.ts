import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  getUserById,
} from "../controllers/userControllers";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/create", createUser);
router.delete("/delete/:userId", deleteUser);

export default router;
