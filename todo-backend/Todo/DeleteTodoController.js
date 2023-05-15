import Todo from "../Schemas/TodoSchema.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { Error } from "../Utilities/UtilityFunctions.js";
import mongoose from "mongoose";

const DeleteTodo = async (req, res, next) => {
  try {
    const { todo_id } = req.body;
    if (!todo_id) {
      throw Error(StatusCodes.BAD_REQUEST, "Todo id is required");
    }

    const todo = await Todo.findOneAndUpdate(
      { user_id: req.user._id },
      {
        $pull: {
          _id: new mongoose.Types.ObjectId(),
        },
      },
      {
        new: true,
      }
    );

    res.status(StatusCodes.OK).json(todo);
  } catch (err) {
    next(err);
  }
};

export default DeleteTodo;
