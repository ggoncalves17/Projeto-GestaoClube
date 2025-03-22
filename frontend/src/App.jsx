import { Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada/PaginaNaoEncontrada";
import Login from "./pages/Login/Login";
import MainLayout from "./Layouts/MainLayout";
import Dashboard, { estatisticasLoader } from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
      children: [
        {index: true, element: <Dashboard />, loader: estatisticasLoader,}, 
        {path: "/dashboard", element: <Dashboard/>, loader: estatisticasLoader,},
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
