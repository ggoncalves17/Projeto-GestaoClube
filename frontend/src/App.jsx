import { Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";
import Login from "./pages/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/*",
      element: <PaginaNaoEncontrada />,
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App
