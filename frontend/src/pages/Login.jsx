"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Logo from "@/components/Logo";

function Login() {
  let [showPass, setShowpass] = useState(false);

  let handleShow = () => {
    setShowpass(!showPass);
  };

  let handleLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!email || !password) {
      toast.error("Enter both email and password.");
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`,
          {
            email,
            password,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data.status === "success") {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          toast.success("Logged in successfully!", {
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
            location.assign("/");
          }, 500);
        } else {
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
        }
      } catch (err) {
        console.log(err);
        toast.error("Error! Please again later. ", {
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
      }
    }
  };

  return (
    <>
      <Logo />
      <div className=" flex justify-center items-center h-screen">
        <div className=" shadow-box xsm:w-[85%] sm:w-[400px] sm:text-[18px] px-2 py-5 bg-[#121b3c] rounded-lg">
          <form className="flex flex-col text-white justify-center items-center px-3">
            <div className=" flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className=" px-2 py-1 w-full mb-3 mt-2 rounded-lg bg-[#334999] outline-none"
              />
              <label htmlFor="password">Password</label>
              <div className=" relative">
                <input
                  type={`${!showPass ? "password" : "text"}`}
                  id="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  minLength={8}
                  className=" px-2 py-1 mb-3 w-full mt-2 rounded-lg bg-[#334999] outline-none"
                />
                <div
                  onClick={handleShow}
                  className=" cursor-pointer absolute right-2 top-2"
                >
                  {!showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={(e) => handleLogin(e)}
              className=" mt-2 bg-[#283975] hover:bg-[#334999] hover:shadow-sm hover:shadow-white py-1 px-3 rounded-lg"
            >
              Login
            </button>
            <p className=" text-white py-2">
              Create aew account{" "}
              <a
                href="/signup"
                className=" text-[#334999] hover:underline text-nowrap"
              >
                click here
              </a>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
