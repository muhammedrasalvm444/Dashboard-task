"use client";
import React, { useEffect, useState } from "react";
import { MdDashboard, MdOutlinePayments } from "react-icons/md";
import { IoCloseCircle, IoSettings } from "react-icons/io5";
import { FaCalendarAlt, FaFileInvoice } from "react-icons/fa";
import { IoIosNotifications, IoMdClose } from "react-icons/io";
import { RiContactsBookUploadFill } from "react-icons/ri";
import styles from "./sidebar.module.css";
import MenuLink from "./menulink/menulink"; // Assuming MenuLink component is defined elsewhere
import Image from "next/image";
import Link from "next/link";
import { useAppContent, useAuthContent } from "@/context/context";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashbaord",
      path: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "Uploads",
      path: "/dashboard/upload",
      icon: <RiContactsBookUploadFill />,
    },
    {
      title: "Invoice",
      path: "/dashboard/invoice",
      icon: <MdOutlinePayments />,
    },
    {
      title: "Schedule",
      path: "/dashboard/schedule",
      icon: <FaFileInvoice />,
    },
    {
      title: "Calander",
      path: "/dashboard/calender",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Notifications",
      path: "/dashboard/notifications",
      icon: <IoIosNotifications />,
    },
    {
      title: "Settings",
      path: "/dashboard/settings",
      icon: <IoSettings />,
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const { sidebarOpen, setSidebarOpen, menulist, setMenuList } =
    useAppContent(); // State to manage sidebar visibility
  useEffect(() => {
    const setWindowSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    if (typeof window !== "undefined") {
      setWindowSize();
      window.addEventListener("resize", setWindowSize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", setWindowSize);
      }
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setMenuList(menulist == "menu" ? "menuhide" : "menu");

    // Toggle sidebar visibility
  };

  return (
    <>
      {
        <div className={styles.container}>
          {!isMobile ? ( // Render logo and heading for larger screens
            <div className={styles.logo}>
              <Link href="/">
                {" "}
                <Image
                  width={35}
                  height={35}
                  src={"/Subtract.png"}
                  alt="logo"
                />
              </Link>
              <div>
                <h3 className={styles.heading}>Base</h3>
              </div>
            </div>
          ) : (
            sidebarOpen && (
              <div className={styles.smalllogo}>
                <Image
                  width={35}
                  height={35}
                  src={"/Subtract.png"}
                  alt="logo"
                />
                {/* Mobile header content (if needed) */}
                <IoMdClose
                  style={{ fontSize: "25px" }}
                  onClick={toggleSidebar}
                />
                {/* Close icon for mobile */}
              </div>
            )
          )}

          {sidebarOpen && ( // Render sidebar menu conditionally
            <ul>
              {menuItems.map((item, index) => (
                <MenuLink key={index} item={item} />
              ))}
            </ul>
          )}
        </div>
      }
    </>
  );
};

export default Sidebar;
