"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Homepage = () => {
  const router = useRouter();
  let token = localStorage?.getItem("accessToken");
  if (token) {
    router?.push("/dashboard/upload");
  } else {
    router?.push("/login");
  }
  return <div></div>;
};

export default Homepage;
