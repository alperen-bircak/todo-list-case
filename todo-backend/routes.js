import express from "express";
import Auth from "./Authentication/AuthMiddleware.js";
import Login from "./Authentication/LoginController.js";
import Register from "./Authentication/RegisterController.js";
import HelloWorld from "./Test/TestController.js";
import AddNote from "./Todo/AddNoteController.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

router.post("/todo", Auth, AddNote);

router.get("/test", Auth, HelloWorld);
export default router;
