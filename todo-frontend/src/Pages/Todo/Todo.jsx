import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAPIUrl, reorder } from "../../Utilities/UtilityFunctions";
import axios from "axios";
import "./Todo.scss";
import TodoView from "../../Components/TodoView/TodoView";
import TodoForm from "../../Components/TodoForm/TodoForm";
import { Input, notification } from "antd";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const Todo = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);
  const axiosAuth = useRef(axios);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleError = (error) => {
    if (error.response?.status == 401) {
      navigate("/login");
      notification.error({
        message: "Please login again.",
      });
      removeCookie("jwt-token", {
        path: "/",
      });
    } else {
      notification.error({
        message: error.message,
      });
    }
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get(getAPIUrl() + "/todo", {
        headers: { Authorization: "Bearer " + cookies.jwt_token },
      });
      return res.data;
    },
    retry: (failureCount, error) => {
      if (error.response.status == 401) {
        handleError(error);
      } else if (failureCount > 3) {
        throw error;
      }
    },
  });

  const addTodo = useMutation(
    async (todo) => {
      return await axiosAuth.current.post("/todo", { todo: todo });
    },
    {
      onSuccess: (data, variables, context) => {
        console.log(data.data);
        queryClient.setQueryData(["todos"], data.data);
      },
      onError: handleError,
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
        queryClient.setQueryData(["todos"], data.data);
      },

      onError: handleError,
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

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    queryClient.setQueryData(["todos"], {
      ...data,
      todo_list: reorder(
        data.todo_list,
        result.source.index,
        result.destination.index
      ),
    });
  };

  return (
    <div className="todo-page">
      <div className="center-box">
        <SearchBar onSearch={(text) => search.mutate(text)} timeout={100} />
        <TodoForm onFinish={(data) => addTodo.mutate(data)} />

        <DragDropContext enableDefaultSensors={true} onDragEnd={onDragEnd}>
          <Droppable droppableId="todo">
            {(provided, snapshot) => (
              <div
                className="todo-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data?.todo_list?.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={item._id}
                        >
                          <TodoView
                            todo={item}
                            instance={axiosAuth.current}
                            checked={false}
                            onError={handleError}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="done-container">
          {data?.done_list?.map((item) => (
            <TodoView
              key={item._id}
              todo={item}
              instance={axiosAuth.current}
              checked={true}
              onError={handleError}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
