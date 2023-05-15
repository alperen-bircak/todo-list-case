import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAPIUrl } from "../../Utilities/UtilityFunctions";
import axios from "axios";
import "./Todo.scss";
import TodoView from "../../Components/TodoView/TodoView";
import TodoForm from "../../Components/TodoForm/TodoForm";
import { Input } from "antd";
import SearchBar from "../../Components/SearchBar/SearchBar";

const Todo = () => {
  const [cookies] = useCookies(["jwt-token"]);
  const axiosAuth = useRef(axios);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      return await axios.get(getAPIUrl() + "/todo", {
        headers: { Authorization: "Bearer " + cookies.jwt_token },
      });
    },
  });

  const addTodo = useMutation(
    async (todo) => {
      return await axiosAuth.current.post("/todo", todo);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  const search = useMutation(
    async (searchText) => {
      return await axiosAuth.current.get("/todo", {
        params: { search: searchText },
      });
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData(["todos"], data);
      },
    }
  );

  useEffect(() => {
    if (!cookies.jwt_token) {
      navigate("/login");
    } else {
      axiosAuth.current = axios.create({
        baseURL: getAPIUrl(),
        headers: { Authorization: "Bearer " + cookies.jwt_token },
      });
    }
  }, [cookies]);

  return (
    <div className="todo-page">
      <div className="center-box">
        <SearchBar onSearch={(text) => search.mutate(text)} timeout={100} />
        <TodoForm
          onFinish={(data) => addTodo.mutate({ todo_body: data.body })}
        />

        <div className="todo-container">
          {data?.data?.map((item) => (
            <TodoView key={item._id} todo={item} instance={axiosAuth.current} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
