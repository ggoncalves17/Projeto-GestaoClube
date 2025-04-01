import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import ProtectedRoute from "./Layouts/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
import Dashboard, { estatisticasLoader } from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import RecuperarPassword from "./pages/Login/RecuperarPassword";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada/PaginaNaoEncontrada";
import Staff from "./pages/Utilizadores/Staff/Staff";
import UtilizadoresGerais from "./pages/Utilizadores/UtilizadoresGerais/UtilizadoresGerais";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
      children: [
        {index: true, element: <Dashboard />, loader: estatisticasLoader,}, 
        {path: "dashboard", element: <Dashboard/>, loader: estatisticasLoader,},
      ]
    },
    {
      path: "/utilizadores",
      element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
      children: [
        {index: true, element: <UtilizadoresGerais />}, 
        {path: "gerais", element: <UtilizadoresGerais/>},
        {path: "staff", element: <Staff/>},
      ]
    },
    {path: "/login",element: <Login />},
    {path: "/login/recuperar-password",element: <RecuperarPassword />},
    {path: "/*",element: <PaginaNaoEncontrada />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
