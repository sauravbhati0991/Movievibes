"use client";
import React, { useState } from "react";
import { items } from "./NavbarItems";

export default function Navbar() {
  let [hover, sethover] = useState(0);
  let [active, setactive] = useState(0);
  let [fade, setfade] = useState(false);
  return (
    <div className="fixed sm:h-screen xsm:w-screen sm:w-fit xsm:bottom-0 flex items-center justify-center sm:flex-col xsm:flex-row pl-[30px] bg-transparent ">
      <div
        className={` h-full bg-transparent absolute left-0  blur-sm bg-gradient-to-r from-slate-600 w-[150px] z-[-1] xsm:hidden sm:block ${
          fade ? "sm:block" : "sm:hidden "
        }`}
      ></div>
      {items.map((v, i) => {
        return (
          <div
            key={i}
            className="py-[25px] xsm:w-full"
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
                  <h1 className="text-shadow-lg select-none shadow-white/100 text-white xsm:w-[13.3%] mr-5 xsm:hidden sm:block sm:w-[70px] text-[20px] text-nowrap font-mono font-bold">
                    {v.title}
                  </h1>
                  {v.onhover}
                </div>
              ) : (
                <div className="xsm:w-[13.3%] sm:w-[70px] flex relative cursor-pointer">
                  {v.onhover}
                </div>
              )
            ) : hover === v.id ? (
              <div className="flex relative cursor-pointer">
                <h1 className=" text-shadow-lg select-none shadow-white/100 text-white mr-5 xsm:w-[13.3%] sm:w-[70px] text-lg text-nowrap xsm:hidden sm:block font-mono font-bold">
                  {v.title}
                </h1>
                {v.onhover}
              </div>
            ) : (
              <div className="xsm:w-[13.3%] sm:w-[70px]">{v.nohover}</div>
            )}
            {}
          </div>
        );
      })}
    </div>
  );
}
