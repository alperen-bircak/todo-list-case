import Todo from "../Schemas/TodoSchema.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { Error } from "../Utilities/UtilityFunctions.js";
import mongoose from "mongoose";

const ModifyTodo = async (req, res, next) => {
  try {
    const { todo } = req.body;
    if (!todo) {
      throw Error(StatusCodes.BAD_REQUEST, "Todo is required");
    }

    const todoDoc = await Todo.findOne({ user_id: req.user._id });

    todoDoc.todo_list = todoDoc.todo_list.map((item) => {
      if (item._id == todo._id) {
        return todo;
      } else {
        return item;
      }
    });

    await todoDoc.save();
    res.status(StatusCodes.OK).json(todoDoc.todo_list);
  } catch (err) {
    next(err);
  }
};

export default ModifyTodo;
