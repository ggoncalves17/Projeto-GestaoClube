import { Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
    },
    {
      path: "/*",
      element: <PaginaNaoEncontrada />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
