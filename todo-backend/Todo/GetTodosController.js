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
    let todos = todoDocument ? todoDocument["todo_list"] : [];
    if (searchText) {
      todos = todos.filter((item) => item.body.includes(searchText));
    }
    res.status(StatusCodes.OK).json(todos);
  } catch (err) {
    next(err);
  }
};

export default GetTodos;
