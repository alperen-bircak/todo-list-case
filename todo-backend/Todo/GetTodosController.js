import Todo from "../Schemas/TodoSchema.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { Error } from "../Utilities/UtilityFunctions.js";
import mongoose from "mongoose";

const GetTodos = async (req, res, next) => {
  try {
    const todos = (
      await Todo.findOne({ user_id: req.user.id }).select("todo_list -_id")
    )["todo_list"];
    res.status(StatusCodes.OK).json(todos);
  } catch (err) {
    next(err);
  }
};

export default GetTodos;
