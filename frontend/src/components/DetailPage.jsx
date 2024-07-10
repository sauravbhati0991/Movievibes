"use client";
import React, { useState, useEffect } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export default function DatailPage({ id, field }) {
  let [apiKey, setApiKey] = useState("");
  let [detail, setDetail] = useState(null);
  let [indexCast, setindexCast] = useState(null);
  let [indexCrew, setindexCrew] = useState(null);
  let [castAndCrew, setcastAndCrew] = useState(null);

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
      await fetch(
        `https://api.themoviedb.org/3/${
          field === "Movie" ? "movie" : "tv"
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
      // console.log(castAndCrew?.crew);
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
    }
  });

  return (
    <div className=" text-white relative w-full">
      <div
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${detail?.backdrop_path}')`,
        }}
        className=" absolute top-0 w-[100%] bg-contain h-screen bg-top bg-no-repeat opacity-20 "
      ></div>
      <div className=" sm:pl-[100px]  sm:pt-[30px] lg:pt-[150px] w-full px-5 absolute top-[200px] xms:text-[13px] sm:text-[16px] mb-[200px]">
        <div className=" w-full flex flex-nowrap mb-5 justify-between">
          <div className=" flex flex-col gap-2">
            <h1 className=" text-shadow-sm text-wrap xsm:text-[15px] sm:text-[18px] shadow-white">
              {detail?.title}
            </h1>
            <p>
              (
              {detail?.tagline
                ? `${detail?.tagline}`
                : `${detail?.release_date.split("-")[0]}`}
              )
            </p>
            <p>
              Status: {detail?.status}({detail?.release_date.split("-")[0]})
            </p>
            <p className=" relative">
              Ratings: {Math.round(detail?.vote_average * 10) / 10}{" "}
              <svg
                // width="20"
                // height="20"
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
            <p>Runtime: {detail?.runtime} min.</p>
            <div className=" flex flex-wrap gap-2">
              {detail?.genres.map((v, i) => {
                return (
                  <p className=" bg-red-500 hover:bg-red-600 cursor-pointer px-2 rounded-lg">
                    {v?.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div className=" relative">
            <div
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/w500${detail?.poster_path}')`,
              }}
              className={` shadow-md shadow-white z-0 bg-cover sm:min-w-[120px] sm:min-h-[180px] xsm:min-w-[80px] xsm:min-h-[120px] rounded-md sm:w-[120px] xsm:w-[80px] transform transition-transform duration-300 ease-in-out`}
            ></div>
            <div className=" cursor-pointer absolute text-nowrap xms:mt-4 sm:-ml-[100px] sm:bottom-2 px-2 bg-gray-700 hover:bg-gray-500  rounded-lg">
              {" "}
              Trailer <PlayCircleIcon className="p-[3px]" />
            </div>
          </div>
        </div>
        <hr />
        <div className="xsm:text-[15px] sm:text-[18px] my-5 bg-[#121b3c] rounded-lg p-2">
          <h1 className=" text-center underline mb-2 text-shadow-lg shadow-white">
            DETAILS
          </h1>
          <div className=" flex flex-col gap-2">
            <hr />
            <div>
              <p className=" underline">Overview:</p>
              <p>{detail?.overview}</p>
            </div>
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
                <p>Ratings: {Math.round(detail?.vote_average * 10) / 10}</p>
                <p>Popularity: {Math.round(detail?.popularity * 10) / 10}</p>
              </div>
            </div>
            <hr />
            <div>
              <div className=" flex justify-evenly">
                <p>ID: {detail?.id}</p>
                <p>IMDB-ID: {detail?.imdb_id}</p>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <hr />
        <div className=" my-4 rounded-lg pb-2">
          <p className=" w-full text-center text-base underline">CAST</p>
          <div className=" overflow-x-scroll scroll-smooth no-scrollbar px-8 py-12 m-2 rounded-lg flex gap-4">
            {castAndCrew?.cast.map((v, i) => {
              return (
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
                  className=" relative hover:z-[1] text-wrap rounded-[50%] hover:rounded-lg bg-cover h-[180px] min-w-[120px] transform transition-transform duration-300 ease-in-out"
                >
                  {indexCast === i ? (
                    <div className=" absolute bg-gradient-to-t from-[#000823] via-[#000823] to-transparent bottom-0 w-full text-[10px]">
                      <p>{v?.original_name}</p>
                      <p className=" flex gap-2">
                        Character: <p>{v?.character}</p>
                      </p>
                      <p className=" flex gap-2">
                        Popularity: {Math.round(v?.popularity * 10) / 10}
                      </p>
                    </div>
                  ) : null}
                </div>
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
                  className=" relative hover:z-[1] text-wrap rounded-[50%] hover:rounded-lg  bg-cover h-[180px] min-w-[120px] transform transition-transform duration-300 ease-in-out"
                >
                  {indexCrew === i ? (
                    <div className=" absolute bg-gradient-to-t from-[#000823] via-[#000823] to-transparent bottom-0 w-full text-[10px]">
                      <p>{v?.original_name}</p>
                      <p className=" flex gap-2">
                        Job: <p>{v?.job}</p>
                      </p>
                      <p className=" flex gap-2">
                        Popularity: {Math.round(v?.popularity * 10) / 10}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <hr />
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
    </div>
  );
}

// https://api.themoviedb.org/3/movie/1022789?language=en-US

// adult: false
// backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg"
// belongs_to_collection: {id: 173710, name: 'Planet of the Apes (Reboot) Collection', poster_path: '/afGkMC4HF0YtXYNkyfCgTDLFe6m.jpg', backdrop_path: '/2ZkvqfOJUCINozB00wmYuGJQW81.jpg'}
// budget: 160000000
// genres: (3) [{…}, {…}, {…}]
// homepage: "https://www.20thcenturystudios.com/movies/kingdom-of-the-planet-of-the-apes"
// id: 653346
// imdb_id: "tt11389872"
// origin_country: ['US']
// original_language: "en"
// original_title: "Kingdom of the Planet of the Apes"
// overview: "Several generations following Caesar's reign, apes – now the dominant species – live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all he's known about the past and to make choices that will define a future for apes and humans alike."
// popularity: 3116.984
// poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg"
// production_companies: (3) [{…}, {…}, {…}]
// production_countries: [{…}]
// release_date: "2024-05-08"
// revenue: 392879995
// runtime: 145
// spoken_languages: [{…}]
// status: "Released"
// tagline: "No one can stop the reign."
// title: "Kingdom of the Planet of the Apes"
// video: false
// vote_average: 6.91
// vote_count: 1411
