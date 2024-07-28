"use client";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast, Bounce, ToastContainer } from "react-toastify";
import Logo from "@/components/Logo";

function SignUp() {
  let [showPassP, setShowPassP] = useState(false);
  let [showPassPC, setShowPassPC] = useState(false);

  let handleShowP = () => {
    setShowPassP(!showPassP);
  };
  let handleShowPC = () => {
    setShowPassPC(!showPassPC);
  };

  let handleSignup = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    if (!email || !name || !password || !passwordConfirm) {
      toast.error("Fill all details", {
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
    } else if (password !== passwordConfirm) {
      toast.error("Both passwords are not same.", {
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
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/signup`,
          {
            name,
            email,
            password,
            passwordConfirm,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data.status === "success") {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          toast.success("Signed up successfully!", {
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
        } else if (res.data.data === "exists") {
          toast.error("Email already exists", {
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
        toast.error("Error! Try again later.");
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
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                required
                name="name"
                className=" px-2 py-1 w-full mb-3 mt-2 rounded-lg bg-[#334999] outline-none"
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                name="email"
                placeholder="you@example.com"
                className=" px-2 py-1 w-full mb-3 mt-2 rounded-lg bg-[#334999] outline-none"
              />
              <label htmlFor="password">Password</label>
              <div className=" relative">
                <input
                  type={`${!showPassP ? "password" : "text"}`}
                  id="password"
                  required
                  name="password"
                  minLength={8}
                  placeholder="••••••••"
                  className=" px-2 py-1 mb-3 w-full mt-2 rounded-lg bg-[#334999] outline-none"
                />
                <div
                  onClick={handleShowP}
                  className=" cursor-pointer absolute right-2 top-2"
                >
                  {!showPassP ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </div>
              <label htmlFor="password">Password Confirm</label>
              <div className=" relative">
                <input
                  type={`${!showPassPC ? "password" : "text"}`}
                  id="passwordConfirm"
                  name="password"
                  minLength={8}
                  required
                  placeholder="••••••••"
                  className=" px-2 py-1 mb-3 w-full mt-2 rounded-lg bg-[#334999] outline-none"
                />
                <div
                  onClick={handleShowPC}
                  className=" cursor-pointer absolute right-2 top-2"
                >
                  {!showPassPC ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </div>
            </div>
            <button
              onClick={(e) => handleSignup(e)}
              className=" mt-2 bg-[#283975] hover:bg-[#334999] hover:shadow-sm hover:shadow-white py-1 px-3 rounded-lg"
            >
              SignUp
            </button>
            <p className=" text-white py-3">
              Already have account{" "}
              <a
                href="/login"
                className=" text-nowrap text-[#334999] hover:underline"
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

export default SignUp;
