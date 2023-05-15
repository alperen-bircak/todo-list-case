import Todo from "../Schemas/TodoSchema.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { Error } from "../Utilities/UtilityFunctions.js";

const GetTodos = async (req, res, next) => {
  try {
    const searchText = req.query?.search;
    const todoDocument = await Todo.findOne({ user_id: req.user.id }).select(
      "todo_list -_id"
    );
    let todo_list = todoDocument ? todoDocument["todo_list"] : [];
    if (searchText) {
      todo_list = todo_list.filter((item) => item.body.includes(searchText));
    }
    res.status(StatusCodes.OK).json(todo_list);
  } catch (err) {
    next(err);
  }
};

export default GetTodos;
