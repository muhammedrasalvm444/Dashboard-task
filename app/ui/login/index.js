"use client";
import React, { useEffect, useState } from "react";
import ImageSection from "./ImageSection";
import FormSection from "./FormSection";
import styles from "./login.module.css";
import Link from "next/link";

const LoginSection = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className={styles?.loginpage}>
      {isMobile ? (
        <div className={styles?.mobile}>
          <Link href={"/"}>
            <img
              src={"/vector.png"}
              style={{
                width: "50px", // Make sure image fills the container
                height: "50px", // Make sure image fills the container
                objectFit: "contain",
                backgroundColor: "white", // Cover the entire container with the image
                borderRadius: "50%",
              }}
            />
          </Link>
          <h3 style={{ fontSize: "20px", fontWeight: "600", color: "white" }}>
            Base
          </h3>
        </div>
      ) : (
        <ImageSection />
      )}
      <FormSection />
    </div>
  );
};

export default LoginSection;
