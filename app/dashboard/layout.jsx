"use client";
import React from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";
import Content from "../ui/dashboard/content/Content";
import { useAppContent } from "@/context/context";

const Layout = ({ children }) => {
  const { menulist } = useAppContent();
  return (
    <div className={styles.container}>
      <div className={menulist}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Content />
        {children}
      </div>
    </div>
  );
};

export default Layout;
