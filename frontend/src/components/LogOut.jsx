"use client";
import React from "react";

export default function LogOut() {
  let handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.setTimeout(() => {
      location.assign("/login");
    }, 500);
  };
  return (
    <div
      onClick={handleLogout}
      className="cursor-pointer z-[10] absolute right-2 bg-[#182450] rounded-lg px-2 py-1 top-2"
    >
      <h1 className=" text-white  font-freeman text-[18px] text-nowrap">
        Logout
      </h1>
    </div>
  );
}
