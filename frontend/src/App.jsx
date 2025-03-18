import { Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada/PaginaNaoEncontrada";
import Login from "./pages/Login/Login";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const[isAutenticado, setIsAutenticado] = useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/verificaAutenticacao/", { withCredentials: true })
      .then((res) => {
        setIsAutenticado(true);
      })
      .catch((err) => {
        setIsAutenticado(false);
      })
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
      children: [
        {index: true, element: <Dashboard /> }, 
        {path: "/dashboard", element: <Dashboard/>,},
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/*",
      element: <PaginaNaoEncontrada />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
