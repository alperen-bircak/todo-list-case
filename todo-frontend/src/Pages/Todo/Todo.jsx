import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getAPIUrl } from "../../Utilities/UtilityFunctions";
import axios from "axios";
import "./Todo.scss";
import TodoView from "../../Components/TodoView/TodoView";
import TodoForm from "../../Components/TodoForm/TodoForm";

const Todo = () => {
  const [cookies] = useCookies(["jwt-token"]);
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      return await axios.get(getAPIUrl() + "/todo", {
        headers: { Authorization: "Bearer " + cookies.jwt_token },
      });
    },
  });

  useEffect(() => {
    if (!cookies.jwt_token) {
      navigate("/login");
    }
  }, [cookies]);

  return (
    <div className="todo-page">
      <TodoForm />
      <div className="todo-container">
        {data?.data?.map((item) => (
          <TodoView todo={item} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
