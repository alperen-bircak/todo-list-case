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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    loader: ({ request }) => {
      const url = new URL(request.url);
      if (url.pathname === "/") {
        return redirect("/todo");
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
