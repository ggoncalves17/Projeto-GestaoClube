import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Layouts/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
import Dashboard, { estatisticasLoader } from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import RecuperarPassword from "./pages/Login/RecuperarPassword";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada/PaginaNaoEncontrada";
import Staff from "./pages/Utilizadores/Staff/Staff";
import UtilizadoresGerais from "./pages/Utilizadores/UtilizadoresGerais/UtilizadoresGerais";
import { UtilizadorProvider } from "./context/UtilizadorContext";
import Jogadores from "./pages/Utilizadores/Jogadores/Jogadores";
import DetalhesJogadores, { jogadorLoader } from "./pages/Utilizadores/Jogadores/DetalhesJogadores";
import Perfil from "./pages/Perfil/Perfil";
import Modalidades from "./pages/Modalidades/Modalidades";
import DetalhesModalidades, { modalidadeLoader } from "./pages/Modalidades/DetalhesModalidades";
import Equipas from "./pages/Modalidades/Equipas/Equipas";
import Epocas from "./pages/Modalidades/Epocas/Epocas";
import DetalhesEquipaLayout, { equipaLoader } from "./pages/Equipas/DetalhesEquipaLayout";
import Plantel from "./pages/Equipas/Plantel/plantel";
import Competicoes from "./pages/Equipas/Competicoes";
import Jogos from "./pages/Equipas/Jogos";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Dashboard />, loader: estatisticasLoader },
        {
          path: "dashboard",
          element: <Dashboard />,
          loader: estatisticasLoader,
        },
        { path: "/perfil", element: <Perfil /> },
      ],
    },
    {
      path: "/utilizadores",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <UtilizadoresGerais /> },
        { path: "gerais", element: <UtilizadoresGerais /> },
        { path: "staff", element: <Staff /> },
        { path: "jogadores", element: <Jogadores /> },
        { path: "jogadores/:id",element: <DetalhesJogadores />, loader: jogadorLoader },
      ],
    },
    {
      path: "/modalidades",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Modalidades /> },
        {
          path: ":id",
          element: <DetalhesModalidades />,
          loader: modalidadeLoader,
          children: [
            { index: true, element: <Navigate to="equipas" /> },
            { path: "equipas", element: <Equipas /> },
            { path: "epocas", element: <Epocas /> },
          ],
        },
        {
          path: ":id/equipas/:id_equipa",
          element: <DetalhesEquipaLayout />,
          loader: equipaLoader,
          children: [
            { index: true, element: <Navigate to="plantel" /> },
            { path: "plantel", element: <Plantel /> },
            { path: "jogos", element: <Jogos /> },
            { path: "competicoes", element: <Competicoes /> },
          ],
        },
      ],
    },
    
    { path: "/login", element: <Login /> },
    { path: "/login/recuperar-password", element: <RecuperarPassword /> },
    { path: "/*", element: <PaginaNaoEncontrada /> },
  ]);

  return (
    <UtilizadorProvider>
      <RouterProvider router={router} />
    </UtilizadorProvider>
  );
}

export default App;
