"use client";
import App from "next/app";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AuthProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menulist, setMenuList] = useState("menu");

  return (
    <AppContext.Provider
      value={{ sidebarOpen, setSidebarOpen, menulist, setMenuList }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContent = () => {
  return useContext(AppContext);
};

export { AuthProvider };
