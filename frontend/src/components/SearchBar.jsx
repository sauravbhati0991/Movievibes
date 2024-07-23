"use client";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import slugify from "slugify";

export default function SearchBar() {
  let [apiKey, setApiKey] = useState("");
  let [search, setSearch] = useState(null);

  let GetApiKey = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/apikey`
      );
      const key = await response.json();
      setApiKey(key.ApiKey);
    } catch (err) {
      console.log(err);
    }
  };

  let handleSearch = async (e) => {
    console.log(e.target.value);
    try {
      await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${e.target.value}&language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setSearch(json.results));
      console.log(search);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await GetApiKey();
    };
    fetchData();
  });

  return (
    <div className=" z-[2] absolute flex flex-col  xsm:top-12 xsm:w-[70%] xsm:mx-[15%] sm:w-auto sm:mx-[0px] sm:right-5 sm:top-15 bg-slate-300 rounded-lg hover:bg-slate-100 ">
      <form className="flex items-center relative xsm:w-full">
        <input
          onChange={(e) => handleSearch(e)}
          type="text"
          placeholder="Search Movies,TV shows..."
          className="bg-transparent rounded-lg w-[80%] transition-all ease-in-out duration-500 py-1 ml-2 px-5 outline-none ssm:hover:w-[300px] placeholder:text-black placeholder:text-opacity-40 hover:placeholder:text-opacity-60 "
        />
      </form>
      {search != null ? (
        <div className=" flex flex-col items-start px-5 ">
          {search.map((v, i) => {
            return (
              <div>
                <hr />
                <a
                  href={`/${
                    v?.media_type === "movie"
                      ? "movies/"
                      : v?.media_type === "tv"
                      ? "tvshows/"
                      : "people/"
                  }${slugify(v?.original_title ? v?.original_title : v?.name, {
                    lower: true,
                  })}-${v?.id}`}
                >
                  <p className=" cursor-pointer xsm:w-full sm:w-[228.8px] overflow-scroll no-scrollbar">
                    {v?.original_title ? v?.original_title : v?.name} (
                    {v?.media_type})
                  </p>
                </a>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
