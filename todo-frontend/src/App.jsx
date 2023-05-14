import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import "./App.scss";
import Login from "./Pages/Login/Login";
const router = createBrowserRouter([
  {
    path: "/",
    loader: ({request}) => {
      const url = new URL(request.url)
      if(url.pathname === '/')
      {
        return redirect("/login")
      }
    }
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
