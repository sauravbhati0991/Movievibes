"use client";
import React, { useState, useEffect } from "react";

export default function LogOut() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.setTimeout(() => {
      location.assign("/login");
    }, 500);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      setIsLoggedIn(!!accessToken && !!refreshToken);
    }
  }, []);

  return (
    <div
      onClick={handleLogout}
      className="cursor-pointer z-[10] absolute right-2 bg-[#182450] rounded-lg px-2 py-1 top-2"
    >
      <h1 className=" text-white  font-freeman xsm:text-[15px] sm:text-[18px] text-nowrap">
        {isLoggedIn ? "Log Out" : "Log In"}
      </h1>
    </div>
  );
}
