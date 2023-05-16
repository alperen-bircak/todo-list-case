import { DragDropContext } from "@hello-pangea/dnd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Cookies, CookiesProvider } from "react-cookie";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./App.scss";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Todo from "./Pages/Todo/Todo";
import { useState } from "react";
import React from "react";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    loader: ({ request }) => {
      const url = new URL(request.url);
      if (url.pathname === "/") {
        return redirect("/login");
      }
    },
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
]);

export const UserContext = React.createContext();

function App() {
  const usernameState = useState("");
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <UserContext.Provider value={usernameState}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
