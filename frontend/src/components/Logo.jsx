import React from "react";

export default function Logo() {
  return (
    <div className=" absolute sm:m-6 z-[10] xsm:w-screen sm:w-fit flex justify-center items-center xsm:top-10">
      <a href="/">
        <h1 className="cursor-pointer font-freeman text-[25px] text-shadow-lg text-white shadow-white/100 text-nowrap">
          Movie Vibes
        </h1>
      </a>
    </div>
  );
}
