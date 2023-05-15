import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import React, { useState } from "react";
import "./TodoView.scss";
import { axios } from "axios";
import ClickAwayListener from "react-click-away-listener";
import TodoForm from "../TodoForm/TodoForm";
const TodoView = ({ todo, instance }) => {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);

  const deleteItem = useMutation(
    async () => {
      return instance.delete("/todo", { params: { todo_id: todo._id } });
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData(["todos"], data);
      },
    }
  );

  if (edit) {
    return (
      <ClickAwayListener onClickAway={() => setEdit(false)}>
        <div className="todo-view">
          <TodoForm />
        </div>
      </ClickAwayListener>
    );
  }
  if (todo) {
    return (
      <div className="todo-view">
        <div className="todo-body">{todo.body}</div>
        <div className="buttons">
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => setEdit(true)}
          />
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => deleteItem.mutate()}
          />
        </div>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};

export default TodoView;
