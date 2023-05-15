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
    const { todo_body } = req.body;
    if (!todo_body) {
      throw Error(StatusCodes.BAD_REQUEST, "Todo body is required");
    }

    const todo = await Todo.findOneAndUpdate(
      { user_id: req.user._id },
      {
        $push: {
          todo_list: {
            $each: [
              {
                _id: new mongoose.Types.ObjectId(),
                checked: false,
                body: todo_body,
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

    res.status(StatusCodes.OK).json(todo);
  } catch (err) {
    next(err);
  }
};

export default AddTodo;
