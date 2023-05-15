import express from "express";
import Auth from "./Authentication/AuthMiddleware.js";
import Login from "./Authentication/LoginController.js";
import Register from "./Authentication/RegisterController.js";
import AddTodo from "./Todo/AddTodoController.js";
import GetTodos from "./Todo/GetTodosController.js";
import DeleteTodo from "./Todo/DeleteTodoController.js";
import ModifyTodo from "./Todo/ModifyTodoController.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

router.post("/todo", Auth, AddTodo);
router.get("/todo", Auth, GetTodos);
router.delete("/todo", Auth, DeleteTodo);
router.put("/todo", ModifyTodo);

export default router;
