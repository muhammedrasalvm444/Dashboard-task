"use client";
import Link from "next/link";
import React from "react";
import styles from "./menulink.module.css";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathname = usePathname();
  return (
    <Link
      href={item?.path}
      className={`${styles.container} ${
        pathname === item.path ? styles.active : ""
      }`}
    >
      <div style={{ fontSize: "25px" }}>{item?.icon}</div>
      {item?.title}
    </Link>
  );
};

export default MenuLink;
