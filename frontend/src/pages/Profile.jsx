"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import LogOut from "@/components/LogOut";
import User from "@/components/User";
import UserPage from "@/components/UserPage";
import { fetchAccess } from "@/utilites/getClient";
import { Bounce, ToastContainer, toast } from "react-toastify";

function Profile() {
  let [access, setAccess] = useState(true);
  let [notificationShown, setNotificationShown] = useState(false);

  const getData = useCallback(async () => {
    const result = await fetchAccess();
    if (result === "error") {
      setAccess(false);
    }
  }, []);

  const notify = useCallback(() => {
    if (!access && !notificationShown) {
      toast.error("You are not logged in!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setNotificationShown(true);
      window.setTimeout(() => {
        location.assign("/login");
      }, 1000);
    }
  }, [access, notificationShown]);

  useEffect(() => {
    getData();
    notify();
  }, [getData, notify]);

  return (
    <div>
      <Logo />
      <User />
      <Navbar />
      <LogOut />
      <UserPage />
      <ToastContainer />
    </div>
  );
}

export default Profile;
