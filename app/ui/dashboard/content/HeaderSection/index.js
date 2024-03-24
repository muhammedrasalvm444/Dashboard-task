"use client";
import React, { useEffect, useState } from "react";
import styles from "./headerSection.module.css";
import { IoIosMenu, IoIosNotifications } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppContent } from "@/context/context";
import { Tooltip } from "@mui/material";
import { toast } from "sonner";

const HeaderSection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { sidebarOpen, setSidebarOpen, menulist, setMenuList } =
    useAppContent();
  useEffect(() => {
    const setWindowSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check if window is defined before accessing it
    if (typeof window !== "undefined") {
      setWindowSize(); // Set initial window size
      window.addEventListener("resize", setWindowSize); // Add event listener for window resize
    }

    // Clean up event listener on component unmount
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", setWindowSize);
      }
    };
  }, []);

  const handlechangeSidebar = () => {
    setSidebarOpen(true);
    setMenuList(menulist == "menu" ? "hidemenu" : "menu");
  };
  const handleLogout = () => {
    localStorage?.removeItem("accessToken");
    router?.push("/login");
    toast.error("Logged out successfully");
  };

  return (
    <>
      {isMobile ? (
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!sidebarOpen && (
              <IoIosMenu fontSize={"35px"} onClick={handlechangeSidebar} />
            )}
            <Link href={"/"}>
              <Image width={30} height={30} src={"/Subtract.png"} alt="logoś" />
            </Link>
          </div>

          <div
            className={styles?.right}
            style={{ display: "flex", gap: "20px" }}
          >
            <IoIosNotifications style={{ fontSize: "35px" }} />

            <a href="#" onClick={handleLogout}>
              <Tooltip title="Logout">
                <img
                  src="/avatar.png"
                  alt="avatar"
                  style={{ width: "32px", height: "32px", cursor: "pointer" }}
                />
              </Tooltip>
            </a>
          </div>
        </nav>
      ) : (
        <div className={styles.HeaderSection}>
          <h1>
            {pathname == "/dashboard"
              ? "Dashboard"
              : pathname == "/dashboard/upload"
              ? "Upload CSV"
              : pathname == "/dashboard/invoice"
              ? "Invoice"
              : pathname == "/dashboard/schedule"
              ? "Schedules"
              : pathname == "/dashboard/calender"
              ? "Calander"
              : pathname == "/dashboard/notifications"
              ? "Notifications"
              : pathname == "/dashboard/settings"
              ? "Settings"
              : ""}
          </h1>
          <div className={styles?.right}>
            <IoIosNotifications style={{ fontSize: "24px" }} />
            <a href="#" onClick={handleLogout}>
              <Tooltip title="Logout">
                <img
                  src="/avatar.png"
                  alt="avatar"
                  style={{ width: "22px", height: "22px" }}
                />
              </Tooltip>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSection;
