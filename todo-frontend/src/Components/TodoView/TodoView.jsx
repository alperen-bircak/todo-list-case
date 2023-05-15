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
      return await instance.delete("/todo", { params: { todo_id: todo._id } });
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData(["todos"], data.data);
      },
    }
  );

  const modifyItem = useMutation(
    async (todoData) => {
      return await instance.put("/todo", { todo: { ...todo, ...todoData } });
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData(["todos"], data.data);
        setEdit(false);
      },
    }
  );

  if (edit) {
    return (
      <ClickAwayListener onClickAway={() => setEdit(false)}>
        <div className="todo-view">
          <TodoForm
            onFinish={(data) => modifyItem.mutate(data)}
            initialValues={todo}
          />
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
