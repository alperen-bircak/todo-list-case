import React from "react";
import "./TodoView.scss";
const TodoView = ({ todo }) => {
  if (todo) {
    return (
      <div className="todo-view">
        <div className="todo-body">{todo.body}</div>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};

export default TodoView;
