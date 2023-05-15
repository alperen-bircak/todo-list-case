import Todo from "../Schemas/TodoSchema.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { Error } from "../Utilities/UtilityFunctions.js";
import mongoose from "mongoose";

const AddTodo = async (req, res, next) => {
  try {
    const { todo } = req.body;
    if (!todo) {
      throw Error(StatusCodes.BAD_REQUEST, "Todo is required");
    }

    const todoDoc = await Todo.findOneAndUpdate(
      { user_id: req.user._id },
      {
        $push: {
          todo_list: {
            $each: [
              {
                _id: new mongoose.Types.ObjectId(),
                checked: false,
                ...todo,
              },
            ],
            $position: 0,
          },
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(StatusCodes.OK).json(todoDoc.todo_list);
  } catch (err) {
    next(err);
  }
};

export default AddTodo;
