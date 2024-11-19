import express from "express";
import { createUser } from "../controllers/userControl";
const router = express.Router();

// Define routes here
router.post("/create", createUser);

export default router;
