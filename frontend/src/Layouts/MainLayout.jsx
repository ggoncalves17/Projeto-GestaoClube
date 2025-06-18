import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from '../components/Sidebar/Sidebar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./MainLayout.css"

const MainLayout = () => {
  return (
    <div id="estrutura">
      <Navbar />
      <div id="conteudo"> 
        <Sidebar /> 
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
};

export default MainLayout;
