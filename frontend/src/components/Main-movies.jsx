"use client";
import React, { useEffect, useState } from "react";
import Slider from "./Slider";

export default function Mainmovies() {
  let [apiKey, setApiKey] = useState("");
  let [popMovie, setPopMovie] = useState([]);
  let [rateMovie, setRateMovie] = useState([]);
  let [upcoming, setUpComingMovie] = useState([]);
  let [running, setRunningMovies] = useState([]);
  let [popTV, setPopTV] = useState([]);
  let [rateTV, setRateTV] = useState([]);
  let [upcomingTV, setUpcomingTV] = useState([]);
  let [runningTV, setRunningTV] = useState([]);
  let [popPerson1, setPopperson1] = useState([]);
  let [popPerson2, setPopperson2] = useState([]);

  let GetApiKey = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/movies`
      );
      const key = await response.json();
      setApiKey(key.ApiKey);
    } catch (err) {
      console.log(err);
    }
  };
  let GetPopularMovie = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setPopMovie(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  let GetTopRatedMovie = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setRateMovie(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  let GetUpComingMovie = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setUpComingMovie(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  let GetRunningMovie = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setRunningMovies(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  let GetPopTV = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setPopTV(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  let GetTopRateTV = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setRateTV(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  let GetUpcomingTV = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setUpcomingTV(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  let GetTodayTv = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setRunningTV(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  let GetPopPerson1 = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/person/popular?language=en-US&page=1&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setPopperson1(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  let GetPopPerson2 = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/person/popular?language=en-US&page=2&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setPopperson2(json.results));
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
      GetPopularMovie(apiKey);
      GetTopRatedMovie(apiKey);
      GetUpComingMovie(apiKey);
      GetRunningMovie(apiKey);
      GetPopTV(apiKey);
      GetTopRateTV(apiKey);
      GetUpcomingTV(apiKey);
      GetTodayTv(apiKey);
      GetPopPerson1(apiKey);
      GetPopPerson2(apiKey);
    }
  });

  return (
    <div className="absolute top-[58vh] sm:top-[85vh] w-full text-white z-[-1] flex flex-col justify-center items-center">
      <div className=" w-[95%] bg-[#121b3c] rounded-lg mb-16">
        <h1 className=" xsm:text-[15px] sm:text-[20px] my-2 mx-5 font-freeman text-center underline text-shadow shadow-white/100">
          Movies Section
        </h1>
        <div className=" flex justify-center my-2">
          <div className=" w-[95%] bg-[#182450] rounded-lg">
            <h1 className="  xsm:text-[15px] sm:text-[18px] my-1 mx-5 font-freeman text-start bg-[#121b3c] rounded-lg py-1 px-3">
              Popular Movies
            </h1>
            <div>
              <Slider data={popMovie} field={"pop"} />
            </div>
            <hr />
            <h1 className="  xsm:text-[15px] sm:text-[18px] my-1 mx-5 font-freeman text-start bg-[#121b3c] rounded-lg py-1 px-3">
              Top Rated Movies
            </h1>
            <div>
              <Slider data={rateMovie} field={"rate"} />
            </div>
            <hr />
            <h1 className="  xsm:text-[15px] sm:text-[18px] my-1 mx-5 font-freeman text-start bg-[#121b3c] rounded-lg py-1 px-3">
              Upcoming Movies
            </h1>
            <div>
              <Slider data={upcoming} field={"upcoming"} />
            </div>
            <hr />
            <h1 className="  xsm:text-[15px] sm:text-[18px] my-1 mx-5 font-freeman text-start bg-[#121b3c] rounded-lg py-1 px-3">
              Movies in Theater
            </h1>
            <div>
              <Slider data={running} field={"running"} />
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[95%] bg-[#121b3c] rounded-lg mb-16">
        <h1 className=" xsm:text-[15px] sm:text-[20px] my-2 mx-5 font-freeman text-center underline text-shadow shadow-white/100">
          TV Shows
        </h1>
        <div className=" flex justify-center my-2">
          <div className=" w-[95%] bg-[#182450] rounded-lg">
            <h1 className="  xsm:text-[15px] sm:text-[18px] my-1 mx-5 font-freeman text-start bg-[#121b3c] rounded-lg py-1 px-3">
              Popular TV Shows
            </h1>
            <div>
              <Slider data={popTV} field={"popTV"} />
            </div>
            <hr />
            <h1 className="  xsm:text-[15px] sm:text-[18px] my-1 mx-5 font-freeman text-start bg-[#121b3c] rounded-lg py-1 px-3">
              Top Rated TV Shows
            </h1>
            <div>
              <Slider data={rateTV} field={"rateTV"} />
            </div>
            <hr />
            <h1 className="  xsm:text-[15px] sm:text-[18px] my-1 mx-5 font-freeman text-start bg-[#121b3c] rounded-lg py-1 px-3">
              Upcoming TV Shows
            </h1>
            <div>
              <Slider data={upcomingTV} field={"upcomingTV"} />
            </div>
            <hr />
            <h1 className="  xsm:text-[15px] sm:text-[18px] my-1 mx-5 font-freeman text-start bg-[#121b3c] rounded-lg py-1 px-3">
              TV Shows (On Air today)
            </h1>
            <div>
              <Slider data={runningTV} field={"runningTV"} />
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[95%] bg-[#121b3c] rounded-lg">
        <h1 className=" xsm:text-[15px] sm:text-[20px] my-2 mx-5 font-freeman text-center underline text-shadow shadow-white/100">
          Popular Peoples
        </h1>
        <div className=" flex justify-center my-2">
          <div className=" w-[95%] bg-[#182450] rounded-lg">
            <div>
              <Slider data={popPerson1} field={"popPerson-1"} />
            </div>
            <div>
              <Slider data={popPerson2} field={"popPerson-2"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
