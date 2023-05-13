import express from "express";
import Register from "./Authentication/RegisterController.js";
const router = express.Router();

router.post("/register", Register)
export default router;