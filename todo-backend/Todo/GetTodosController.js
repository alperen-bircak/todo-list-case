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
    const todoDocument = await Todo.findOne({ user_id: req.user.id });
    let todo_list = todoDocument?.todo_list ? todoDocument.todo_list : [];
    let done_list = todoDocument?.done_list ? todoDocument.done_list : [];
    if (searchText) {
      todo_list = todo_list.filter((item) => item.body.includes(searchText));
      done_list = done_list.filter((item) => item.body.includes(searchText));
    }
    res.status(StatusCodes.OK).json({ todo_list, done_list });
  } catch (err) {
    next(err);
  }
};

export default GetTodos;
