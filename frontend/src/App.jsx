import { Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PaginaNaoEncontrada />,
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App
