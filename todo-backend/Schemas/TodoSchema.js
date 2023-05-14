import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  todo_list: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      checked: {
        type: Boolean,
        required: true,
      },
    },
  ],
});
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
