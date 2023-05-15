import Todo from "../Schemas/TodoSchema.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { Error } from "../Utilities/UtilityFunctions.js";
import mongoose from "mongoose";

const ReorderTodo = async (req, res, next) => {
  try {
    const { todo_id_list } = req.body;
    if (!todo_id_list) {
      throw Error(StatusCodes.BAD_REQUEST, "Todo id list is required");
    }

    const todoDoc = await Todo.findOne({ user_id: req.user._id });

    todoDoc.todo_list = todo_id_list.map((todo_id) => {
      return todoDoc.todo_list.find((item) => item._id == todo_id);
    });
    await todoDoc.save();
    res.status(StatusCodes.OK).json(todoDoc);
  } catch (err) {
    next(err);
  }
};

export default ReorderTodo;
