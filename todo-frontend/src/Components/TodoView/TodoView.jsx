import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import React from "react";
import "./TodoView.scss";
import { axios } from "axios";
const TodoView = ({ todo, instance }) => {
  const queryClient = useQueryClient();

  const deleteItem = useMutation(
    async () => {
      return instance.delete("/todo", { params: { todo_id: todo._id } });
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  if (todo) {
    return (
      <div className="todo-view">
        <div className="todo-body">{todo.body}</div>
        <div className="buttons">
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
