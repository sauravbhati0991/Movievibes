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
        <div className=" w-full flex flex-nowrap mb-5 sm:px-8 justify-between">
          <div className=" flex flex-col gap-2">
            <h1 className=" text-shadow-sm text-wrap xsm:text-[15px] sm:text-[18px] shadow-white">
              {detail?.title ? detail?.title : detail?.original_name}
            </h1>
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
            <p>
              Status: {detail?.status}(
              {detail?.release_date
                ? detail?.release_date.split("-")[0]
                : detail?.last_air_date.split("-")[0]}
              )
            </p>
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
            {field === "Movie" ? (
              <p>Runtime: {detail?.runtime} min. </p>
            ) : field === "TVShow" ? (
              <p>Avg. Runtime: {detail?.episode_run_time}</p>
            ) : null}
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
          </div>
          <div className=" relative">
            <div
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/w500${detail?.poster_path}')`,
              }}
              className={` shadow-md shadow-white z-0 bg-cover sm:min-w-[120px] sm:min-h-[180px] xsm:min-w-[80px] xsm:min-h-[120px] rounded-md sm:w-[120px] xsm:w-[80px] transform transition-transform duration-300 ease-in-out`}
            ></div>
            <div className=" cursor-pointer absolute text-nowrap xms:mt-4 sm:-top-8 xsm:px-2 sm:px-6  bg-gray-700 hover:bg-gray-500  rounded-lg">
              {" "}
              Trailer <PlayCircleIcon className="p-[3px]" />
            </div>
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
                      <p className=" text-nowrap">Ratings: {v?.vote_average}</p>
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
        </div>
        <hr />
        {field === "Movie" ? (
          <div>
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
                      className="cursor-pointer relative hover:z-[1] text-wrap rounded-[50%] hover:rounded-lg bg-cover h-[180px] min-w-[120px] transform transition-transform duration-300 ease-in-out"
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
                      className=" cursor-pointer relative hover:z-[1] text-wrap rounded-[50%] hover:rounded-lg  bg-cover h-[180px] min-w-[120px] transform transition-transform duration-300 ease-in-out"
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
          </div>
        ) : (
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
        )}
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

// {
//   "adult": false,
//   "also_known_as": [
//     "ג'וני דפ",
//     "จอห์นนี เดปป์",
//     "جوني ديب",
//     "Τζoν Κρίστοφερ Ντεπ ΙΙ",
//     "جانی دپ",
//     "조니 뎁",
//     "ジョニー・デップ",
//     "John Christopher Depp II",
//     "Джони Деп"
//   ],
//   "biography": "John Christopher Depp II (born June 9, 1963) is an American actor, producer and musician. He is the recipient of various accolades, including a Golden Globe Award and a Screen Actors Guild Award, in addition to nominations for three Academy Awards and two British Academy Film Awards.\n\nDepp made his debut in the horror film A Nightmare on Elm Street (1984), before rising to prominence as a teen idol on the television series 21 Jump Street (1987–1990). In the 1990s, Depp acted mostly in independent films, often playing eccentric characters. These included What's Eating Gilbert Grape (1993), Benny and Joon (1993), Dead Man (1995), Donnie Brasco (1997) and Fear and Loathing in Las Vegas (1998). Depp also began collaborating with director Tim Burton, starring in Edward Scissorhands (1990), Ed Wood (1994) and Sleepy Hollow (1999).\n\nIn the 2000s, Depp became one of the most commercially successful film stars by playing Captain Jack Sparrow in the swashbuckler film series Pirates of the Caribbean (2003–present). He received critical praise for Finding Neverland (2004), and continued his commercially successful collaboration with Tim Burton with the films Charlie and the Chocolate Factory (2005), Corpse Bride (2005), Sweeney Todd: The Demon Barber of Fleet Street (2007), and Alice in Wonderland (2010). In 2012, Depp was one of the world's biggest film stars, and was listed by the Guinness World Records as the world's highest-paid actor, with earnings of US$75 million. During the 2010s, Depp began producing films through his company, Infinitum Nihil, and formed the rock supergroup Hollywood Vampires with Alice Cooper and Joe Perry.",
//   "birthday": "1963-06-09",
//   "deathday": null,
//   "gender": 2,
//   "homepage": null,
//   "id": 85,
//   "imdb_id": "nm0000136",
//   "known_for_department": "Acting",
//   "name": "Johnny Depp",
//   "place_of_birth": "Owensboro, Kentucky, USA ",
//   "popularity": 180.427,
//   "profile_path": "/wcI594cwM4ArPwvRd2IU0Z0yLuh.jpg"
// }

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

// {
//   "adult": false,
//   "backdrop_path": "/7cqKGQMnNabzOpi7qaIgZvQ7NGV.jpg",
//   "created_by": [
//     {
//       "id": 58321,
//       "credit_id": "5f3814c011c066003637f6a8",
//       "name": "Eric Kripke",
//       "original_name": "Eric Kripke",
//       "gender": 2,
//       "profile_path": "/dd7EgfOEKPqQxWtBfAvjYZahbSc.jpg"
//     }
//   ],
//   "episode_run_time": [
//     60
//   ],
//   "first_air_date": "2019-07-25",
//   "genres": [
//     {
//       "id": 10765,
//       "name": "Sci-Fi & Fantasy"
//     },
//     {
//       "id": 10759,
//       "name": "Action & Adventure"
//     }
//   ],
//   "homepage": "https://www.amazon.com/dp/B0875L45GK",
//   "id": 76479,
//   "in_production": true,
//   "languages": [
//     "en"
//   ],
//   "last_air_date": "2024-07-04",
//   "last_episode_to_air": {
//     "id": 4781989,
//     "name": "Dirty Business",
//     "overview": "Vernon Correctional Services provides compassionate rehabilitation to those in our care to prepare them for successful community reentry. At Vernon, it's not about custody. It's about family.",
//     "vote_average": 6.389,
//     "vote_count": 18,
//     "air_date": "2024-07-04",
//     "episode_number": 6,
//     "episode_type": "standard",
//     "production_code": "THBY 406",
//     "runtime": 66,
//     "season_number": 4,
//     "show_id": 76479,
//     "still_path": "/hz6Gc2G3VOASIWd3Dm65nWVZlc2.jpg"
//   },
//   "name": "The Boys",
//   "next_episode_to_air": {
//     "id": 4781990,
//     "name": "The Insider",
//     "overview": "",
//     "vote_average": 9.5,
//     "vote_count": 2,
//     "air_date": "2024-07-11",
//     "episode_number": 7,
//     "episode_type": "standard",
//     "production_code": "",
//     "runtime": null,
//     "season_number": 4,
//     "show_id": 76479,
//     "still_path": null
//   },
//   "networks": [
//     {
//       "id": 1024,
//       "logo_path": "/ifhbNuuVnlwYy5oXA5VIb2YR8AZ.png",
//       "name": "Prime Video",
//       "origin_country": ""
//     }
//   ],
//   "number_of_episodes": 32,
//   "number_of_seasons": 5,
//   "origin_country": [
//     "US"
//   ],
//   "original_language": "en",
//   "original_name": "The Boys",
//   "overview": "A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.",
//   "popularity": 2894.051,
//   "poster_path": "/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
//   "production_companies": [
//     {
//       "id": 20580,
//       "logo_path": "/oRR9EXVoKP9szDkVKlze5HVJS7g.png",
//       "name": "Amazon Studios",
//       "origin_country": "US"
//     },
//     {
//       "id": 333,
//       "logo_path": "/5xUJfzPZ8jWJUDzYtIeuPO4qPIa.png",
//       "name": "Original Film",
//       "origin_country": "US"
//     },
//     {
//       "id": 11073,
//       "logo_path": "/aCbASRcI1MI7DXjPbSW9Fcv9uGR.png",
//       "name": "Sony Pictures Television Studios",
//       "origin_country": "US"
//     },
//     {
//       "id": 38398,
//       "logo_path": null,
//       "name": "Kripke Enterprises",
//       "origin_country": "US"
//     },
//     {
//       "id": 16615,
//       "logo_path": "/5au3v0r2brGaegO9EQ0nodLkmQ1.png",
//       "name": "Point Grey Pictures",
//       "origin_country": "US"
//     },
//     {
//       "id": 2526,
//       "logo_path": "/kzIW6QWhacDwzGoXEIWhac8rb70.png",
//       "name": "Kickstart Entertainment",
//       "origin_country": "US"
//     },
//     {
//       "id": 33728,
//       "logo_path": null,
//       "name": "NightSky Productions",
//       "origin_country": "US"
//     },
//     {
//       "id": 210099,
//       "logo_path": "/d6HwljzlOzxJ4tXlrpRkNZaZMWL.png",
//       "name": "Amazon MGM Studios",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "seasons": [
//     {
//       "air_date": "2020-09-10",
//       "episode_count": 57,
//       "id": 163277,
//       "name": "Specials",
//       "overview": "",
//       "poster_path": "/cCXG81dSCPXcqYm6gTHlwtXocti.jpg",
//       "season_number": 0,
//       "vote_average": 0
//     },
//     {
//       "air_date": "2019-07-25",
//       "episode_count": 8,
//       "id": 98085,
//       "name": "Season 1",
//       "overview": "The story takes place in a universe where most of the superpowered individuals are recognized as superheroes, but in reality abuse their powers for personal gain, information the public is kept unaware of.",
//       "poster_path": "/8mBpZIU61uNOvW8JBHYVaoDWOdU.jpg",
//       "season_number": 1,
//       "vote_average": 8.1
//     },
//     {
//       "air_date": "2020-09-03",
//       "episode_count": 8,
//       "id": 154681,
//       "name": "Season 2",
//       "overview": "The even more intense, more insane season two finds The Boys on the run from the law, hunted by the Supes, and desperately trying to regroup and fight back against Vought. In hiding, Hughie, Mother’s Milk, Frenchie and Kimiko try to adjust to a new normal, with Butcher nowhere to be found. Meanwhile, Starlight must navigate her place in The Seven as Homelander sets his sights on taking complete control. His power is threatened with the addition of Stormfront, a social media-savvy new Supe, who has an agenda of her own. On top of that, the Supervillain threat takes center stage and makes waves as Vought seeks to capitalize on the nation’s paranoia.",
//       "poster_path": "/9rXhd3cVMcMDlhqrgWkuQVsNkVF.jpg",
//       "season_number": 2,
//       "vote_average": 8
//     },
//     {
//       "air_date": "2022-06-01",
//       "episode_count": 8,
//       "id": 215686,
//       "name": "Season 3",
//       "overview": "It’s been a year of calm. Homelander’s subdued. Butcher works for the government, supervised by Hughie of all people. But both men itch to turn this peace and quiet into blood and bone. So when The Boys learn of a mysterious Anti-Supe weapon, it sends them crashing into the Seven, starting a war, and chasing the legend of the first Superhero: Soldier Boy.",
//       "poster_path": "/7Ns6tO3aYjppI5bFhyYZurOYGBT.jpg",
//       "season_number": 3,
//       "vote_average": 7.8
//     },
//     {
//       "air_date": "2024-06-13",
//       "episode_count": 8,
//       "id": 305753,
//       "name": "Season 4",
//       "overview": "The world is on the brink. Victoria Neuman is closer than ever to the Oval Office and under Homelander's muscly thumb as he consolidates his power. Butcher, with only months to live, has lost Becca's son, and his job as The Boys' leader. The rest of the team are fed up with his lies. With the stakes higher than ever, they must find a way to work together and save the world before it's too late.",
//       "poster_path": "/nWwhdt7iOFJsWM8Lz1UtaUC6EUf.jpg",
//       "season_number": 4,
//       "vote_average": 7.1
//     },
//     {
//       "air_date": null,
//       "episode_count": 0,
//       "id": 393831,
//       "name": "Season 5",
//       "overview": "",
//       "poster_path": null,
//       "season_number": 5,
//       "vote_average": 0
//     }
//   ],
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Returning Series",
//   "tagline": "Never meet your heroes.",
//   "type": "Scripted",
//   "vote_average": 8.473,
//   "vote_count": 9862
// }
