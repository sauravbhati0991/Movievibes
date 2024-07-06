import React, { useState } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

export default function Slider({ data, field }) {
  const [hideLBTN, setHideLBTN] = useState(false);
  const [hideRBTN, setHideRBTN] = useState(false);
  const [details, setDetails] = useState(null);

  const ScrollLeft = () => {
    let Slider = document.getElementById(`slider-${field}-movie`);
    Slider.scrollLeft += 80;
    if (Slider.scrollLeft <= -80) {
      setHideRBTN(true);
    } else {
      setHideRBTN(false);
    }
    if (Slider.scrollLeft >= eval(Slider.scrollWidth - 80)) {
      setHideLBTN(true);
    }
  };

  const ScrollRight = () => {
    let Slider = document.getElementById(`slider-${field}-movie`);
    Slider.scrollLeft -= 80;
    if (Slider.scrollLeft <= 80) {
      setHideRBTN(true);
    }
    if (Slider.scrollLeft >= eval(Slider.scrollWidth - 80)) {
      setHideLBTN(false);
    }
  };

  const handleMouseOver = (index) => {
    const img = document.getElementById(`${field}-poster-id-${index}`);
    img.classList.add("hover-delay");
    setDetails(index);
  };

  const handleMouseLeave = (index) => {
    const img = document.getElementById(`${field}-poster-id-${index}`);
    img.classList.remove("hover-delay");
    setDetails(null);
  };

  return (
    <div className="relative my-2 bg-transparent xsm:mx-2">
      <button
        onClick={ScrollRight}
        className={`z-[2] absolute left-0 text-white h-full w-[50px] rounded-md hover:bg-gradient-to-r hover:from-slate-700 ${
          hideRBTN ? "hidden" : "block"
        }`}
      >
        <ArrowBackIosOutlinedIcon fontSize="large" />
      </button>
      <button
        onClick={ScrollLeft}
        className={`z-[2] absolute right-0 text-white h-full w-[50px] rounded-md hover:bg-gradient-to-l hover:from-slate-700 ${
          hideLBTN ? "hidden" : null
        }`}
      >
        <ArrowForwardIosOutlinedIcon fontSize="large" />
      </button>
      <div
        id={`slider-${field}-movie`}
        className="w-full xsm:h-[185px] sm:h-[270px] flex items-center overflow-x-scroll overflow-y-hidden scroll-smooth gap-2 no-scrollbar pr-10 pl-10 bg-[#29376b] rounded-lg inner-shadow-main-movie"
      >
        {data.map((v, i) => (
          <>
            <div
              key={i}
              id={`${field}-poster-id-${i}`}
              onMouseOver={() => handleMouseOver(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              style={{
                backgroundImage: v?.poster_path
                  ? `url('https://image.tmdb.org/t/p/w500${v?.poster_path}')`
                  : `url('https://image.tmdb.org/t/p/w500${v?.profile_path}')`,
              }}
              className={`cursor-pointer bg-cover sm:min-w-[120px] sm:min-h-[180px] xsm:min-w-[80px] xsm:min-h-[120px] rounded-md sm:w-[120px] xsm:w-[80px] transform transition-transform duration-300 ease-in-out`}
            >
              {details === i ? (
                <div className=" relative text-start sm:min-w-[120px] sm:min-h-[180px] xsm:min-w-[80px] xsm:min-h-[120px] bg-gradient-to-t from-[#000823] via-[#21232e] to-transparent sm:w-[120px] xsm:w-[80px] sm:text-[15px] xsm:text-[12px] bg-transparent p-2 rounded-md shadow-lg">
                  <p className=" absolute bottom-[30%] sm:text-[10px] xsm:text-[8px] text-shadow shadow-white/100">
                    {v?.title ? v?.title : v?.original_name}
                  </p>
                  <p className=" absolute bottom-[23%] sm:text-[10px] xsm:text-[8px] ">
                    {v?.known_for_department === "Acting"
                      ? null
                      : v?.release_date
                      ? `(${v?.release_date.split("-")[0]})`
                      : `(${v?.first_air_date.split("-")[0]})`}
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
