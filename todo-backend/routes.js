import express from "express";
import Login from "./Authentication/LoginController.js";
import Register from "./Authentication/RegisterController.js";
const router = express.Router();

router.post("/register", Register)
router.post("/login", Login)

export default router;