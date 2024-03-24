"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    // This code will run only on the client side
    let token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/dashboard/upload");
    } else {
      router.push("/login");
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return <div>HomePage</div>;
};

export default Homepage;
