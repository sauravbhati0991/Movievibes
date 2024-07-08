import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <div className=" z-[2] absolute flex items-center xsm:top-12 xsm:w-[70%] xsm:mx-[15%] sm:w-auto sm:mx-[0px] sm:right-5 sm:top-5 bg-slate-300 rounded-[50px] hover:bg-slate-100 ">
      <form action="" className="flex items-center xsm:w-full">
        <input
          type="text"
          placeholder="Search Movies,TV shows..."
          className="bg-transparent rounded-[50px] w-[80%] transition-all ease-in-out duration-500 py-1 ml-2 px-5 outline-none ssm:hover:w-[300px] placeholder:text-black placeholder:text-opacity-40 hover:placeholder:text-opacity-60 "
        />
        <button className=" mx-2 p-1 rounded-[50px] transition ease-in-out duration-300  hover:bg-slate-400 ">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
