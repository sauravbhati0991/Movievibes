"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

export default function MainSlider() {
  let [shows, setshows] = useState([]);
  let [btnState, setbtnState] = useState();
  let [hideLBTN, sethideLBTN] = useState(false);
  let [hideRBTN, sethideRBTN] = useState(false);
  let [data, setdata] = useState([]);
  let [genres, setgenres] = useState([]);
  let [movieGen, setmovieGen] = useState([]);
  let [ReleaseY, setReleaseY] = useState("");
  let [apiKey, setApiKey] = useState("");
  let [bgPoster, setBgPoster] = useState(false);
  let handleClick = (i, v) => {
    setbtnState(i);
    setdata(v);
    setBgPoster(true);
    setmovieGen(v?.genre_ids);
    let releaseYear = v?.release_date;
    let releasearray = releaseYear.split("-");
    setReleaseY(releasearray[0]);
  };
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
  let GetShows = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setshows(json.results));
    } catch (err) {
      console.log(err);
    }
  };
  let GetGenres = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setgenres(json.genres));
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
  useEffect(() => {
    if (apiKey) {
      GetShows(apiKey);
      GetGenres(apiKey);
    }
  }, [apiKey]);
  let ScrollLeft = () => {
    let Slider = document.getElementById("slider");
    Slider.scrollLeft += 80;
    if (Slider.scrollLeft <= -80) {
      sethideRBTN(true);
    } else {
      sethideRBTN(false);
    }
    if (Slider.scrollLeft >= Slider.scrollWidth - 80) {
      sethideLBTN(true);
    }
  };
  let ScrollRight = () => {
    let Slider = document.getElementById("slider");
    Slider.scrollLeft -= 80;
    if (Slider.scrollLeft <= 80) {
      sethideRBTN(true);
    }
    if (Slider.scrollLeft >= Slider.scrollWidth - 80) {
      sethideLBTN(false);
    }
  };
  return (
    <div className=" absolute w-full xsm:top-8 sm:top-0 xsm:h-screen/2 sm:h-screen/90 flex items-center flex-col z-[-1]">
      {bgPoster ? (
        <div className="backdrop-blur-sm rounded-lg absolute bg-transparent sm:bottom-[120px] sm:left-[100px] xsm:left-0 xsm:bottom-[12%]  text-wrap text-center flex flex-col justify-center items-center">
          <h1 className=" font-marker md:py-3 xsm:py-[5px] md:w-[250px] xsm:w-[180px] text-white text-shadow shadow-white/100 md:text-[25px] xsm:text-[14px]">
            {data?.title}
          </h1>
          <div className=" font-freeman md:my-3 xsm:my-[2px] flex">
            <p className=" text-white  xsm:p-1 md:p-2 xsm:text-[12px] md:text-[15px] pxtext-nowrap">
              Year : ({ReleaseY})
            </p>
            <p className=" text-white xsm:p-1 md:p-2 xsm:text-[12px] md:text-[15px] text-nowrap">
              Rating : {Math.round(data?.vote_average * 10) / 10}
            </p>
            <p className=" text-white mx-2 xsm:p-1 md:p-2 xsm:text-[12px] md:text-[15px] text-nowrap rounded-md bg-gray-500 bg-opacity-60">
              {data?.original_language}
            </p>
          </div>
          <p
            className={` p-2 text-white md:w-[250px] xsm:w-[150px] md:text-[17px] xsm:text-[10px] sm:h-[150px] xsm:hidden sm:block overflow-y-scroll no-scrollbar rounded-lg scroll-smooth`}
          >
            {data?.overview}
          </p>
          <div className="flex flex-wrap justify-center md:my-2 xsm:my-0 p-2 md:w-[300px] xsm:w-[200px]">
            {genres.map((v, i) => {
              return (
                <div key={i}>
                  {v?.id === movieGen[0] ? (
                    <p className="md:p-1 md:m-1 xsm:p-[2px] xsm:m-[2px] md:text-[15px] xsm:text-[12px] cursor-pointer text-white bg-red-500 bg-opacity-60 rounded-md hover:bg-red-600 hover:bg-opacity-70">
                      {v?.name}
                    </p>
                  ) : null}
                  {v?.id === movieGen[1] ? (
                    <p className="md:p-1 md:m-1 xsm:p-[2px] xsm:m-[2px] md:text-[15px] xsm:text-[12px] cursor-pointer text-white bg-red-500 bg-opacity-60 rounded-md hover:bg-red-600 hover:bg-opacity-70">
                      {v?.name}
                    </p>
                  ) : null}
                  {v?.id === movieGen[2] ? (
                    <p className="md:p-1 md:m-1 xsm:p-[2px] xsm:m-[2px] md:text-[15px] xsm:text-[12px] cursor-pointer text-white bg-red-500 bg-opacity-60 rounded-md hover:bg-red-600 hover:bg-opacity-70">
                      {v?.name}
                    </p>
                  ) : null}
                  {v?.id === movieGen[3] ? (
                    <p className="md:p-1 md:m-1 xsm:p-[2px] xsm:m-[2px] md:text-[15px] xsm:text-[12px] cursor-pointer text-white bg-red-500 bg-opacity-60 rounded-md hover:bg-red-600 hover:bg-opacity-70">
                      {v?.name}
                    </p>
                  ) : null}
                  {v?.id === movieGen[4] ? (
                    <p className="md:p-1 md:m-1 xsm:p-[2px] xsm:m-[2px] md:text-[15px] xsm:text-[12px] cursor-pointer text-white bg-red-500 bg-opacity-60 rounded-md hover:bg-red-600 hover:bg-opacity-70">
                      {v?.name}
                    </p>
                  ) : null}
                  {v?.id === movieGen[5] ? (
                    <p className="md:p-1 md:m-1 xsm:p-[2px] xsm:m-[2px] md:text-[15px] xsm:text-[10px] cursor-pointer text-white bg-red-500 bg-opacity-60 rounded-md hover:bg-red-600 hover:bg-opacity-70">
                      {v?.name}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className=" w-full flex justify-evenly md:pb-2 xsm:my-2">
            <button className=" bg-gray-600 md:px-3 md:py-2 xsm:px-1 xsm:py-[2px] rounded cursor-pointer md:text-lg xsm:text-sm hover:shadow-lg bg-opacity-90 hover:bg-opacity-100 hover:bg-gray-700 text-white">
              More Info <InfoOutlinedIcon />
            </button>
          </div>
        </div>
      ) : null}

      <div className=" absolute bg-transparent xsm:-bottom-[50px] xsm:mx-2 sm:w-[30%] sm:h-[20%] sm:right-10 sm:bottom-10 bg-[#121b3c]">
        <button
          onClick={ScrollRight}
          className={`absolute left-0  text-white h-full w-[50px] rounded-md hover:bg-gradient-to-r hover:from-slate-700 ${
            hideRBTN ? "hidden" : "block"
          }`}
        >
          <ArrowBackIosOutlinedIcon fontSize="large" />
        </button>
        <button
          onClick={ScrollLeft}
          className={`absolute right-0 text-white h-full w-[50px] rounded-md hover:bg-gradient-to-l hover:from-slate-700 ${
            hideLBTN ? "hidden" : null
          }`}
        >
          <ArrowForwardIosOutlinedIcon fontSize="large" />
        </button>
        <div
          id="slider"
          className=" w-full h-full flex items-center overflow-x-scroll scroll-smooth overflow-y-hidden gap-2 no-scrollbar pr-10"
        >
          {shows.map((v, i) => {
            return (
              <Image
                key={i}
                onClick={() => handleClick(i, v)}
                id={`poster-id-${i}`}
                className={`cursor-pointer rounded-md sm:w-[70px] sm:hover:w-[75px] xsm:w-[50px] xsm:hover:w-[55px] ${
                  btnState === i
                    ? "sm:w-[80px] sm:hover:w-[80px] xsm:w-[60px] xsm:hover:w-[60px]"
                    : null
                }`}
                src={`https://image.tmdb.org/t/p/w500${v?.poster_path}`}
                alt=""
              />
            );
          })}
        </div>
      </div>
      <div className=" absolute w-full h-full z-[-1] bg-[#070F2B] flex justify-center items-center">
        <Image
          className={`w-contain rounded-lg sm:[85%] xsm:w-full md:w-[75%] lg:w-[50%] shadow-[20px_20px_50px_15px_rgba(255,255,255,0.7)] ${
            bgPoster ? null : " aspect-[4/3]"
          }`}
          src={
            bgPoster
              ? `https://image.tmdb.org/t/p/w500${data?.backdrop_path}`
              : "/images/LogoMakerCa-1716099081526-removebg.png"
          }
          alt=""
        />
      </div>
    </div>
  );
}
