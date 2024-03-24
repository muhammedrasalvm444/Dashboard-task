import { Content } from "next/font/google";
import React from "react";
import HeaderSection from "../ui/dashboard/content/HeaderSection";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%", // Ensure parent container has a defined height
      }}
    >
      {/* <HeaderSection /> */}
      <div style={{ textAlign: "center" }}>
        No data added now. Our team will create soon.
      </div>
    </div>
  );
};

export default Dashboard;
