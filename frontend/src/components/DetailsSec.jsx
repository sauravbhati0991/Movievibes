"use client";
import React, { useState, useEffect } from "react";
import FilterBox from "./filterBox";

export default function DetailsSection({ data }) {
  let [detail, setDetail] = useState(null);
  let [apiKey, setApiKey] = useState("");
  let [index, setindex] = useState(null);
  let [filterData, setFilterData] = useState({});

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
  let GetDetails = async (apiKey) => {
    try {
      const Today = new Date(Date.now());
      const OneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const SixMonths = new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000);
      await fetch(
        `https://api.themoviedb.org/3/${
          data === "People"
            ? `person/popular?api_key=${apiKey}&language=en-US&page=${filterData.page}`
            : `discover/${
                data === "Movies"
                  ? `movie?api_key=${apiKey}&${
                      filterData.wood === "hollywood"
                        ? "language=en-US&region=US&with_original_language=en"
                        : "language=hi-IN&region=IN&with_original_language=hi"
                    }&page=${filterData.page}&sort_by=${
                      filterData.filter === "popular"
                        ? "popularity.desc"
                        : filterData.filter === "toprated"
                        ? "vote_average.desc&without_genres=99,10755&vote_count.gte=200"
                        : filterData.filter === "upcoming"
                        ? `popularity.desc&with_release_type=2|3&release_date.gte=${
                            Today.toISOString().split("T")[0]
                          }&release_date.lte=${
                            SixMonths.toISOString().split("T")[0]
                          }`
                        : `popularity.desc&with_release_type=2|3&release_date.gte=${
                            OneWeekAgo.toISOString().split("T")[0]
                          }&release_date.lte=${
                            Today.toISOString().split("T")[0]
                          }`
                    }`
                  : data === "TV Shows"
                  ? `tv?api_key=${apiKey}&${
                      filterData.wood === "hollywood"
                        ? "language=en-US&region=US&with_original_language=en"
                        : "language=hi-IN&region=IN&with_original_language=hi"
                    }&page=${filterData.page}&sort_by=${
                      filterData.filter === "popular"
                        ? "popularity.desc"
                        : filterData.filter === "toprated"
                        ? "vote_average.desc"
                        : filterData.filter === "upcoming"
                        ? `popularity.desc&air_date.lte=${
                            SixMonths.toISOString().split("T")[0]
                          }&air_date.gte=${Today.toISOString().split("T")[0]}`
                        : `popularity.desc&air_date.lte=${
                            Today.toISOString().split("T")[0]
                          }&air_date.gte=${
                            OneWeekAgo.toISOString().split("T")[0]
                          }`
                    }`
                  : null
              }`
        }`
      )
        .then((res) => res.json())
        .then((json) => setDetail(json));
    } catch (err) {
      console.error(err);
    }
  };
  const handleMouseOver = (index) => {
    const img = document.getElementById(`poster-id-${index}`);
    img.classList.add("hover-delay");
    setindex(index);
  };

  const handleMouseLeave = (index) => {
    const img = document.getElementById(`poster-id-${index}`);
    img.classList.remove("hover-delay");
    setindex(null);
  };

  const getFilterData = (filter) => {
    setFilterData(filter);
    console.log(filterData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await GetApiKey();
    };
    fetchData();
  });
  useEffect(() => {
    if (apiKey) {
      GetDetails(apiKey);
    }
  });
  return (
    <div className=" flex flex-col justify-center items-center text-white select-none">
      <h1 className="font-freeman text-[25px] xsm:px-20 sm:px-24 bg-[#182450] text-nowrap xsm:mt-[70px] sm:mt-2 rounded-lg shadow-sm shadow-white">
        {data} Section
      </h1>
      <FilterBox data={detail} getFilter={getFilterData} />
      <div className="w-[85%] xsm:mt-[50px] sm:mt-0 xsm:mb-[50px] sm:mb-[80px] sm:ml-[100px] sm:mr-3 py-5 px-1 rounded-lg bg-[#182450] flex items-center justify-center gap-8 flex-wrap inner-shadow-main-movie">
        {detail?.results.map((v, i) => (
          <>
            <div
              key={i}
              id={`poster-id-${i}`}
              onMouseOver={() => handleMouseOver(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              style={{
                backgroundImage: v?.poster_path
                  ? `url('https://image.tmdb.org/t/p/w500${v?.poster_path}')`
                  : `url('https://image.tmdb.org/t/p/w500${v?.profile_path}')`,
              }}
              className={`cursor-pointer shadow-md shadow-white z-0 bg-cover sm:min-w-[120px] sm:min-h-[180px] xsm:min-w-[80px] xsm:min-h-[120px] rounded-md sm:w-[120px] xsm:w-[80px] transform transition-transform duration-300 ease-in-out`}
            >
              {index === i ? (
                <div className=" relative text-start sm:min-w-[120px] sm:min-h-[180px] xsm:min-w-[80px] xsm:min-h-[120px] bg-gradient-to-t from-[#000823] via-[#21232e] to-transparent sm:w-[120px] xsm:w-[80px] sm:text-[15px] xsm:text-[12px] bg-transparent p-2 rounded-md shadow-lg">
                  <p className=" absolute bottom-[30%] sm:text-[10px] xsm:text-[8px] text-shadow shadow-white/100">
                    {v?.title ? v?.title : v?.original_name}
                  </p>
                  <p className=" absolute bottom-[23%] sm:text-[10px] xsm:text-[8px] ">
                    {v?.known_for_department === "Acting"
                      ? null
                      : v?.release_date
                      ? `(${v?.release_date.split("-")[0]})`
                      : v?.first_air_date
                      ? `(${v?.first_air_date.split("-")[0]})`
                      : "N/A"}
                  </p>
                  <p className=" absolute bottom-[12%] sm:text-[10px] xsm:text-[8px] ">
                    {v?.known_for_department === "Acting"
                      ? `Popularity: ${Math.round(v?.popularity * 10) / 10}`
                      : `Ratings: ${Math.round(v?.vote_average * 10) / 10}`}
                  </p>
                  <p className=" absolute bottom-[2%] sm:text-[10px] xsm:text-[8px] ">
                    {v?.gender ? null : "Language: "}
                    {v?.gender ? (
                      v?.gender === 1 ? (
                        "Actress"
                      ) : (
                        "Actor"
                      )
                    ) : (
                      <span className="w-fit px-1 rounded-md bg-gray-500 bg-opacity-60">
                        {v?.original_language}
                      </span>
                    )}
                  </p>
                </div>
              ) : null}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

// https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi&page=1&sort_by=popularity.desc
// https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi&page=1&sort_by=popularity.desc
// https://api.themoviedb.org/3/person/popular?language=en-US&page=1

// https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${Today.toISOString().split("T")[0]}&release_date.lte=${SixMonths.toISOString().split("T")[0]}
// https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi&page=1&sort_by=popularity.desc&air_date.lte={SixMonths.toISOString().split("T")[0]}&air_date.gte={Today.toISOString().split("T")[0]}

// https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${OneWeekAgo.toISOString().split("T")[0]}&release_date.lte=${Today.toISOString().split("T")[0]}
// https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi&page=1&sort_by=popularity.desc&air_date.lte={Today.toISOString().split("T")[0]}&air_date.gte={OneWeekAgo.toISOString().split("T")[0]}

// https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200
// https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi&page=1&sort_by=vote_average.desc&vote_count.gte=200
