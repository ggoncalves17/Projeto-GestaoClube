import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import "./MainLayout.css"

const MainLayout = () => {
  return (
    <div id="estrutura">
      <Navbar />
      <div id="conteudo"> 
        <Sidebar /> 
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
