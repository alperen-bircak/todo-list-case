import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox } from "antd";
import React, { useState } from "react";
import "./TodoView.scss";
import { axios } from "axios";
import ClickAwayListener from "react-click-away-listener";
import TodoForm from "../TodoForm/TodoForm";
const TodoView = ({ todo, instance, checked, onError }) => {
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
      onError: onError,
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
      onError: onError,
    }
  );

  const checkItem = useMutation(
    async () => {
      return await instance.put("/todo/check", {
        todo_id: todo._id,
        check: !checked,
      });
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData(["todos"], data.data);
      },
      onError: onError,
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
        <div className="check">
          <Checkbox onChange={checkItem.mutate} checked={checked} />
        </div>
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
