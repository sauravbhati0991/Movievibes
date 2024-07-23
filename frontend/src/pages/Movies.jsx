"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import DetailsSection from "@/components/DetailsSec";
import LogOut from "@/components/LogOut";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

function Movies() {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Your are not logged!", {
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
        window.setTimeout(() => {
          location.assign("/login");
        }, 700);
        return;
      }
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/movies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.status === "error") {
          toast.error(res.data.message, {
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
          window.setTimeout(() => {
            location.assign("/login");
          }, 700);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Logo />
      <Navbar />
      <LogOut />
      <DetailsSection data={"Movies"} />
      <ToastContainer />
    </div>
  );
}

export default Movies;
