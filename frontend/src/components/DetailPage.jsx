"use client";
import React, { useState, useEffect } from "react";
import slugify from "slugify";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export default function DatailPage({ id, field }) {
  let [apiKey, setApiKey] = useState("");
  let [detail, setDetail] = useState(null);
  let [indexCast, setindexCast] = useState(null);
  let [indexCrew, setindexCrew] = useState(null);
  let [castAndCrew, setcastAndCrew] = useState(null);
  let [moviesDone, setMoviesDone] = useState(null);
  let [tvshowDone, setTVShowDone] = useState(null);

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

  let GetDetails = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/${
          field === "Movie" ? "movie" : field === "TVShow" ? "tv" : "person"
        }/${id}?api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setDetail(json));
      console.log(detail);
    } catch (err) {
      console.error(err);
    }
  };

  let GetCastAndCrew = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((json) => setcastAndCrew(json));
    } catch (err) {
      console.error(err);
    }
  };

  let GetMovieDone = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&sort_by=popularity.desc`
      )
        .then((res) => res.json())
        .then((json) => setMoviesDone(json));
    } catch (err) {
      console.error(err);
    }
  };

  let GetTVShowDone = async (apiKey) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${apiKey}&sort_by=popularity.desc`
      )
        .then((res) => res.json())
        .then((json) => setTVShowDone(json));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCastMouseOver = (index) => {
    const img = document.getElementById(`poster-id-cast-${index}`);
    img.classList.add("hover-delay");
    setindexCast(index);
  };

  const handleCastMouseLeave = (index) => {
    const img = document.getElementById(`poster-id-cast-${index}`);
    img.classList.remove("hover-delay");
    setindexCast(null);
  };
  const handleCrewMouseOver = (index) => {
    const img = document.getElementById(`poster-id-crew-${index}`);
    img.classList.add("hover-delay");
    setindexCrew(index);
  };

  const handleCrewMouseLeave = (index) => {
    const img = document.getElementById(`poster-id-crew-${index}`);
    img.classList.remove("hover-delay");
    setindexCrew(null);
  };
  const formatNumber = (num) => {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(1) + " T";
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + " B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + " M";
    } else {
      return num;
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
      GetDetails(apiKey);
      GetCastAndCrew(apiKey);
      GetMovieDone(apiKey);
      GetTVShowDone(apiKey);
    }
  });

  if (detail?.success == false) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-base text-white">
        <h1>There is no Movie, Tv Show Or Person Related to given ID</h1>
      </div>
    );
  } else {
    return (
      <div className=" text-white relative w-full">
        <div
          style={{
            backgroundImage:
              field === "Movie" || field === "TVShow"
                ? `url('https://image.tmdb.org/t/p/w500${detail?.backdrop_path}')`
                : null,
          }}
          className=" absolute top-0 w-[100%] bg-contain h-screen bg-top bg-no-repeat opacity-20 "
        ></div>
        <div className=" sm:pl-[100px]  sm:pt-[30px] lg:pt-[150px] w-full px-5 absolute top-[200px] xms:text-[13px] sm:text-[16px] mb-[200px]">
          <div className=" w-full flex flex-nowrap mb-5 sm:px-8 justify-between">
            <div className=" flex flex-col gap-2">
              <h1 className=" text-shadow-sm text-wrap xsm:text-[15px] sm:text-[18px] shadow-white">
                {field === "People"
                  ? detail?.name
                  : detail?.title
                  ? detail?.title
                  : detail?.original_name}
              </h1>
              {field !== "People" ? (
                <p>
                  (
                  {detail?.tagline
                    ? `${detail?.tagline}`
                    : `${
                        detail?.release_date
                          ? detail?.release_date.split("-")[0]
                          : detail?.last_air_date.split("-")[0]
                      }`}
                  )
                </p>
              ) : (
                <p>Department: {detail?.known_for_department}</p>
              )}
              <p>
                {field === "People"
                  ? `Date od Birth: ${detail?.birthday.split("-").join("/")}`
                  : `Status: ${detail?.status}(
              ${
                detail?.release_date
                  ? detail?.release_date.split("-")[0]
                  : detail?.last_air_date.split("-")[0]
              }
              )`}
              </p>
              {field === "People" ? (
                <p>Place Of Birth: {detail?.place_of_birth}</p>
              ) : (
                <p className=" relative">
                  Ratings: {Math.round(detail?.vote_average * 10) / 10}{" "}
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className=" absolute xsm:h-5 sm:h-6 xsm:w-5 sm:w-6 left-[80px] top-0"
                  >
                    <defs>
                      <linearGradient
                        id={`star-gradient-${
                          (Math.round(detail?.vote_average * 10) / 10) * 10
                        }`}
                      >
                        <stop
                          offset={`${
                            (Math.round(detail?.vote_average * 10) / 10) * 10
                          }%`}
                          stopColor="yellow"
                        />
                        <stop
                          offset={`${
                            (Math.round(detail?.vote_average * 10) / 10) * 10
                          }%`}
                          stopColor="lightgray"
                        />
                      </linearGradient>
                    </defs>
                    <polygon
                      fill={`url(#${`star-gradient-${
                        (Math.round(detail?.vote_average * 10) / 10) * 10
                      }`})`}
                      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
                    />
                  </svg>
                </p>
              )}
              {field === "Movie" ? (
                <p>Runtime: {detail?.runtime} min. </p>
              ) : field === "TVShow" ? (
                <p>Avg. Runtime: {detail?.episode_run_time}</p>
              ) : (
                <p>Popularity: {detail?.popularity}</p>
              )}
              {field !== "People" ? (
                <div className=" flex flex-wrap gap-2">
                  {detail?.genres.map((v, i) => {
                    return (
                      <p
                        key={i}
                        className=" bg-red-500 hover:bg-red-600 cursor-pointer px-2 rounded-lg"
                      >
                        {v?.name}
                      </p>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <div className=" relative">
              <div
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/w500${
                    detail?.poster_path
                      ? detail?.poster_path
                      : detail?.profile_path
                  }')`,
                }}
                className={` shadow-md shadow-white z-0 bg-cover sm:min-w-[120px] sm:min-h-[180px] xsm:min-w-[80px] xsm:min-h-[120px] rounded-md sm:w-[120px] xsm:w-[80px] transform transition-transform duration-300 ease-in-out`}
              ></div>
              {field === "People" ? null : (
                <div className=" cursor-pointer absolute text-nowrap xms:mt-4 sm:-top-8 xsm:px-2 sm:px-6  bg-gray-700 hover:bg-gray-500  rounded-lg">
                  {" "}
                  Trailer <PlayCircleIcon className="p-[3px]" />
                </div>
              )}
            </div>
          </div>
          <hr />
          {field === "TVShow" ? (
            <div>
              <div className="xsm:text-[12px] sm:text-[15px] my-5 bg-[#121b3c] flex rounded-lg p-2 overflow-x-scroll no-scrollbar scroll-smooth gap-4">
                {detail?.seasons.map((v, i) => {
                  return (
                    <div key={i}>
                      <div
                        style={{
                          backgroundImage: v?.poster_path
                            ? `url('https://image.tmdb.org/t/p/w500${v?.poster_path}')`
                            : "url(/images/LogoMakerCa-1716099081526-removebg-poster.png)",
                        }}
                        className="rounded-t-lg min-w-[120px] max-w-[120px] h-[180px] bg-cover bg-white"
                      ></div>
                      <div className="bg-[#182450] p-2 rounded-b-lg min-w-[120px] max-w-[120px]">
                        <h1 className=" text-center text-shadow shadow-white">
                          {v?.name}
                        </h1>
                        <p>Episodes: {v?.episode_count}</p>
                        <p>
                          Release:{" "}
                          {v?.air_date ? v?.air_date.split("-")[0] : "N/A"}
                        </p>
                        <p className=" text-nowrap">
                          Ratings: {v?.vote_average}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
          ) : null}
          <div className="xsm:text-[15px] sm:text-[18px] my-5 bg-[#121b3c] rounded-lg p-2">
            <h1 className=" text-center underline mb-2 text-shadow-lg shadow-white">
              DETAILS
            </h1>
            <div className=" flex flex-col gap-2">
              <hr />
              {field === "People" ? (
                <div>
                  <p className=" underline">Biography:</p>
                  <p>{detail?.biography}</p>
                </div>
              ) : (
                <div>
                  <p className=" underline">Overview:</p>
                  <p>{detail?.overview}</p>
                </div>
              )}
              {field !== "People" ? (
                <div className=" flex flex-col gap-2">
                  <hr />
                  <div>
                    <div className=" flex justify-evenly">
                      <p>Language: {detail?.original_language}</p>
                      <p>Country: {detail?.origin_country}</p>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className=" flex justify-evenly">
                      <p>Budget: {formatNumber(detail?.budget)}$</p>
                      <p>Revenue: {formatNumber(detail?.revenue)}$</p>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className=" flex justify-evenly">
                      <p>
                        Ratings: {Math.round(detail?.vote_average * 10) / 10}
                      </p>
                      <p>
                        Popularity: {Math.round(detail?.popularity * 10) / 10}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div>
                    {field === "Movie" ? (
                      <div className="flex justify-evenly">
                        <p>ID: {detail?.id}</p>
                        <p>IMDB-ID: {detail?.imdb_id}</p>
                      </div>
                    ) : (
                      <div className="flex justify-evenly">
                        <p>Seasons: {detail?.number_of_seasons}</p>
                        <p>Total Episodes: {detail?.number_of_episodes}</p>
                      </div>
                    )}
                  </div>
                  <hr />
                </div>
              ) : null}
            </div>
          </div>
          <hr />
          {field === "Movie" ? (
            <div>
              <div className=" my-4 rounded-lg pb-2">
                <p className=" w-full text-center text-base underline">CAST</p>
                <div className=" overflow-x-scroll scroll-smooth no-scrollbar px-8 py-12 m-2 rounded-lg flex gap-4">
                  {castAndCrew?.cast.map((v, i) => {
                    return (
                      <a
                        href={`/people/${slugify(v?.original_name, {
                          lower: true,
                        })}-${v?.id}`}
                      >
                        <div
                          key={i}
                          id={`poster-id-cast-${i}`}
                          onMouseOver={() => handleCastMouseOver(i)}
                          onMouseLeave={() => handleCastMouseLeave(i)}
                          style={{
                            backgroundImage: `${
                              v?.profile_path
                                ? `url('https://image.tmdb.org/t/p/w500${v?.profile_path}')`
                                : "url(/images/default-poster-profile.jpg)"
                            }`,
                          }}
                          className="cursor-pointer relative hover:z-[1] text-wrap rounded-[50%] hover:rounded-lg bg-cover h-[180px] min-w-[120px] transform transition-transform duration-300 ease-in-out"
                        >
                          {indexCast === i ? (
                            <div className=" absolute bg-gradient-to-t from-[#000823] via-[#000823] to-transparent bottom-0 w-full text-[10px]">
                              <p>{v?.original_name}</p>
                              <p className=" flex gap-2">
                                Character: <p>{v?.character}</p>
                              </p>
                              <p className=" flex gap-2">
                                Popularity:{" "}
                                {Math.round(v?.popularity * 10) / 10}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
              <hr />
              <div className=" my-4 rounded-lg pb-2">
                <p className=" w-full text-center text-base underline">CREW</p>
                <div className=" overflow-x-scroll no-scrollbar px-8 py-12 m-2 rounded-lg flex gap-4">
                  {castAndCrew?.crew.map((v, i) => {
                    return (
                      <a
                        href={`/people/${slugify(v?.original_name, {
                          lower: true,
                        })}-${v?.id}`}
                      >
                        <div
                          key={i}
                          id={`poster-id-crew-${i}`}
                          onMouseOver={() => handleCrewMouseOver(i)}
                          onMouseLeave={() => handleCrewMouseLeave(i)}
                          style={{
                            backgroundImage: `${
                              v?.profile_path
                                ? `url('https://image.tmdb.org/t/p/w500${v?.profile_path}')`
                                : "url(/images/default-poster-profile.jpg)"
                            }`,
                          }}
                          className=" cursor-pointer relative hover:z-[1] text-wrap rounded-[50%] hover:rounded-lg  bg-cover h-[180px] min-w-[120px] transform transition-transform duration-300 ease-in-out"
                        >
                          {indexCrew === i ? (
                            <div className=" absolute bg-gradient-to-t from-[#000823] via-[#000823] to-transparent bottom-0 w-full text-[10px]">
                              <p>{v?.original_name}</p>
                              <p className=" flex gap-2">
                                Job: <p>{v?.job}</p>
                              </p>
                              <p className=" flex gap-2">
                                Popularity:{" "}
                                {Math.round(v?.popularity * 10) / 10}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
              <hr />
            </div>
          ) : field === "TVShow" ? (
            <div className=" bg-[#121b3c] my-6 rounded-lg p-5 flex justify-evenly">
              <div>
                <div
                  style={{
                    backgroundImage: detail?.created_by[0]?.profile_path
                      ? `url('https://image.tmdb.org/t/p/w500${detail?.created_by[0]?.profile_path}')`
                      : "url(/images/default-poster-profile.jpg)",
                  }}
                  className="rounded-t-lg min-w-[120px] max-w-[120px] h-[180px] bg-cover bg-white"
                ></div>
                <div className="bg-[#182450] p-2 rounded-b-lg min-w-[120px] max-w-[120px] text-shadow shadow-white text-center">
                  <h1 className=" underline">Created By</h1>
                  <h1>{detail?.created_by[0]?.name}</h1>
                </div>
              </div>
              <div>
                <div
                  style={{
                    backgroundImage: detail?.networks[0]?.logo_path
                      ? `url('https://image.tmdb.org/t/p/w500${detail?.networks[0]?.logo_path}')`
                      : "url(/images/LogoMakerCa-1716099081526-removebg-poster.png)",
                  }}
                  className="rounded-t-lg min-w-[120px] max-w-[120px] h-[180px] bg-cover bg-white"
                ></div>
                <div className="bg-[#182450] p-2 rounded-b-lg min-w-[120px] max-w-[120px] text-shadow shadow-white text-center">
                  <h1 className=" underline">Network</h1>
                  <h1>{detail?.networks[0]?.name}</h1>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className=" my-4 rounded-lg pb-2">
                <p className=" w-full text-center text-base underline">
                  Movies
                </p>
                <div className=" overflow-x-scroll scroll-smooth no-scrollbar px-8 py-12 m-2 rounded-lg flex gap-4">
                  {moviesDone?.cast !== null ? (
                    moviesDone?.cast.map((v, i) => {
                      return (
                        <a
                          href={`/movies/${slugify(
                            v?.title ? v?.title : v?.original_name,
                            {
                              lower: true,
                            }
                          )}-${v?.id}`}
                        >
                          <div
                            key={i}
                            id={`poster-id-cast-${i}`}
                            onMouseOver={() => handleCastMouseOver(i)}
                            onMouseLeave={() => handleCastMouseLeave(i)}
                            style={{
                              backgroundImage: `${
                                v?.poster_path
                                  ? `url('https://image.tmdb.org/t/p/w500${v?.poster_path}')`
                                  : "url(/images/LogoMakerCa-1716099081526-removebg-poster.png)"
                              }`,
                            }}
                            className="cursor-pointer relative hover:z-[1] text-wrap rounded-lg bg-cover h-[180px] min-w-[120px] transform transition-transform duration-300 ease-in-out"
                          >
                            {indexCast === i ? (
                              <div className=" absolute bg-gradient-to-t from-[#000823] via-[#000823] to-transparent bottom-0 w-full text-[10px]">
                                <p>
                                  {v?.original_title} (
                                  {v?.release_date
                                    ? v?.release_date.split("-")[0]
                                    : "N/A"}
                                  )
                                </p>
                                <p className=" flex gap-2">
                                  Character: <p>{v?.character}</p>
                                </p>
                                <p className=" flex gap-2">
                                  Ratings:{" "}
                                  {Math.round(v?.vote_average * 10) / 10}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        </a>
                      );
                    })
                  ) : (
                    <p className=" text-center">No Movies Done</p>
                  )}
                </div>
              </div>
              <hr />
              <div className=" my-4 rounded-lg pb-2">
                <p className=" w-full text-center text-base underline">
                  TV Shows
                </p>
                <div className=" overflow-x-scroll no-scrollbar px-8 py-12 m-2 rounded-lg flex gap-4">
                  {tvshowDone?.cast !== null ? (
                    tvshowDone?.cast.map((v, i) => {
                      return (
                        <a
                          href={`/tvshows/${slugify(
                            v?.title ? v?.title : v?.original_name,
                            {
                              lower: true,
                            }
                          )}-${v?.id}`}
                        >
                          <div
                            key={i}
                            id={`poster-id-crew-${i}`}
                            onMouseOver={() => handleCrewMouseOver(i)}
                            onMouseLeave={() => handleCrewMouseLeave(i)}
                            style={{
                              backgroundImage: `${
                                v?.poster_path
                                  ? `url('https://image.tmdb.org/t/p/w500${v?.poster_path}')`
                                  : "url(/images/default-poster-profile.jpg)"
                              }`,
                            }}
                            className=" cursor-pointer relative hover:z-[1] text-wrap rounded-lg  bg-cover h-[180px] min-w-[120px] transform transition-transform duration-300 ease-in-out"
                          >
                            {indexCrew === i ? (
                              <div className=" absolute bg-gradient-to-t from-[#000823] via-[#000823] to-transparent bottom-0 w-full text-[10px]">
                                <p>
                                  {v?.original_name} (
                                  {v?.first_air_date.split("-")[0]})
                                </p>
                                <p className=" flex gap-2">
                                  Character: <p>{v?.character}</p>
                                </p>
                                <p className=" flex gap-2">
                                  Popularity:{" "}
                                  {Math.round(v?.popularity * 10) / 10}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        </a>
                      );
                    })
                  ) : (
                    <p className=" text-center">No TV Show Done</p>
                  )}
                </div>
              </div>
              <hr />
            </div>
          )}
          <hr />
          {field !== "People" ? (
            <div>
              <div className=" my-4 rounded-lg pb-2">
                <p className=" w-full text-center text-base underline">
                  PRODUCTION COMPANIES
                </p>
                <div className=" overflow-x-scroll no-scrollbar px-2 py-4 m-2 rounded-lg flex gap-4">
                  {detail?.production_companies.map((v, i) => {
                    return (
                      <div>
                        <div
                          key={i}
                          style={{
                            backgroundImage: `${
                              v?.logo_path
                                ? `url('https://image.tmdb.org/t/p/w500${v?.logo_path}')`
                                : "url(/images/LogoMakerCa-1716099081526-removebg-poster.png)"
                            }`,
                          }}
                          className=" text-wrap rounded-lg  bg-cover h-[120px] w-[180px] bg-white"
                        ></div>
                        <div className=" bottom-0 w-[180px] text-[16px]">
                          <p>{v?.name}</p>
                          <p className=" flex gap-2">
                            Country: <p>{v?.origin_country}</p>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
