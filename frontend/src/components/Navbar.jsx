"use client";
import React, { useEffect, useState } from "react";
import { items } from "./NavbarItems";

export default function Navbar() {
  let [hover, sethover] = useState(0);
  let [active, setactive] = useState(0);
  let [fade, setfade] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    if (path[path.length - 1] === "") {
      document.getElementById(`navigator-1`).click();
    } else if (path.includes("myprofile")) {
      document.getElementById(`navigator-0`).click();
    } else if (path.includes("movies")) {
      document.getElementById("navigator-3").click();
    } else if (path.includes("tvshows")) {
      document.getElementById("navigator-2").click();
    } else if (path.includes("people")) {
      document.getElementById("navigator-4").click();
    }
  }, []);

  return (
    <div
      className={`xsm:fixed sm:h-screen xsm:w-screen sm:w-fit xsm:bottom-0 flex items-center justify-center sm:flex-col xsm:flex-row sm:pl-[30px] sm:bg-transparent rounded-lg xsm:backdrop-blur-sm sm:backdrop-blur-none xsm:z-10 sm:z-[1]`}
    >
      <div
        className={` h-full bg-transparent absolute left-0  blur-sm bg-gradient-to-r from-slate-600 w-[150px] z-[1] xsm:hidden sm:block ${
          fade ? "sm:block" : "sm:hidden "
        }`}
      ></div>
      {items.map((v, i) => {
        return (
          <div
            key={i}
            id={`navigator-${i}`}
            className="xsm:py-[8px] sm:py-[25px] xsm:m-auto sm:m-0 xsm:px-2 sm:px-0 z-[2] "
            onClick={() => setactive(i + 1)}
            onMouseEnter={() => {
              sethover(i + 1);
              setfade(true);
            }}
            onMouseLeave={() => {
              sethover(0);
              setfade(false);
            }}
          >
            {active === v.id ? (
              hover === v.id ? (
                <div className="flex relative cursor-pointer">
                  <a href={v.route}>
                    <h1 className="text-shadow-lg select-none shadow-white/100 text-white xsm:w-[13.3%] mr-3 xsm:hidden sm:block sm:w-[70px] text-[20px] text-nowrap font-mono font-bold">
                      {v.title}
                    </h1>
                  </a>
                  <a href={v.route}>{v.onhover}</a>
                </div>
              ) : (
                <div className="xsm:w-[13.3%] sm:w-[70px] flex relative cursor-pointer">
                  <a href={v.route}>{v.onhover}</a>
                </div>
              )
            ) : hover === v.id ? (
              <div className="flex relative cursor-pointer">
                <a href={v.route}>
                  <h1 className=" text-shadow-lg select-none shadow-white/100 text-white mr-3 xsm:w-[13.3%] sm:w-[70px] text-lg text-nowrap xsm:hidden sm:block font-mono font-bold">
                    {v.title}
                  </h1>
                </a>
                <a href={v.route}>{v.onhover}</a>
              </div>
            ) : (
              <div className="xsm:w-[13.3%] sm:w-[70px]">
                <a href={v.route}>{v.nohover}</a>
              </div>
            )}
            {}
          </div>
        );
      })}
    </div>
  );
}
