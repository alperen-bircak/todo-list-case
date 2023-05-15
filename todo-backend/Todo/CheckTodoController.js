import Todo from "../Schemas/TodoSchema.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { Error } from "../Utilities/UtilityFunctions.js";
import mongoose from "mongoose";

const CheckTodo = async (req, res, next) => {
  try {
    const { todo_id, check } = req.query;
    if (!todo) {
      throw Error(StatusCodes.BAD_REQUEST, "Todo is required");
    }

    const todoDoc = await Todo.findOne({ user_id: req.user._id });

    if (check) {
      const todo = todoDoc.todo_list.find((item) => item._id == todo_id);
      todoDoc.todo_list = todoDoc.todo_list.filter(
        (item) => item._id != todo_id
      );
      todoDoc.done_list.unshift(todo);
    } else if (!check) {
      const todo = todoDoc.done_list.find((item) => item._id == todo_id);
      todoDoc.done_list = todoDoc.done_list.filter(
        (item) => item._id != todo_id
      );
      todoDoc.todo_list.unshift(todo);
    }

    await todoDoc.save();
    res.status(StatusCodes.OK).json(todoDoc);
  } catch (err) {
    next(err);
  }
};

export default CheckTodo;
