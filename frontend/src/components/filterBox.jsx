import React, { useEffect, useState, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function FilterBox({ data, getFilter }) {
  let [showBox, setShowBox] = useState(false);
  let [route, setRoute] = useState(false);
  const [filter, setFilter] = useState({
    wood: "hollywood",
    page: "1",
    filter: "popular",
  });
  const pageRef = useRef(null);

  const handleFilter = (event) => {
    const { name, value } = event.target;
    let newValue = value;

    if (name === "page") {
      if (value === "") {
        newValue = "1";
      } else if (value > data?.total_pages) {
        newValue = data?.total_pages;
        pageRef.current.value = data?.total_pages;
      }
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: newValue,
    }));
  };

  let handleClick = () => {
    setShowBox(!showBox);
  };

  useEffect(() => {
    getFilter(filter);
  }, [filter, getFilter]);
  useEffect(() => {
    setRoute(window.location.pathname.split("/").includes("people"));
  }, []);

  return (
    <div className=" w-full">
      <div
        onClick={handleClick}
        className=" cursor-pointer xsm:block sm:hidden relative min-w-[75%] max-w-[75%] mt-[40px] mb-4 py-2 px-4 gap-8 bg-[#182450] hover:bg-[#263670] hover:underline m-auto rounded-lg"
      >
        <p>Filter</p>
        <span className=" absolute right-0 top-0">
          {showBox ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )}
        </span>
      </div>
      <div
        className={`xsm:${
          showBox ? " flex" : "hidden"
        } sm:flex min-w-[80%] max-w-[80%] sm:mt-[100px] sm:my-[100px] lmd:mt-[100px] lmd:my-[100px] xsm:m-auto sm:ml-[100px] lmd:m-auto py-5 px-4 gap-8 bg-[#182450] justify-center items-center flex-wrap rounded-lg`}
      >
        <div
          className={` ${
            route ? " hidden" : " flex"
          } px-4 py-2 bg-[#263670] text-nowrap rounded-lg  gap-3`}
        >
          <p>
            Hollywood{" "}
            <input
              className="mx-1"
              type="radio"
              name="wood"
              value="hollywood"
              onChange={handleFilter}
              defaultChecked
            />
          </p>
          <p>
            Bollywood{" "}
            <input
              className="mx-1"
              type="radio"
              name="wood"
              value="bollywood"
              onChange={handleFilter}
            />
          </p>
        </div>
        <div className=" px-5 h-[40px] bg-[#263670] rounded-lg flex justify-center flex-nowrap items-center">
          <p>
            Page{" "}
            <input
              className="custom-number-input w-[55px] pl-2 pr-1 m-2 bg-[#182450] outline-none rounded-lg"
              type="number"
              name="page"
              ref={pageRef}
              min={1}
              max={data?.total_pages}
              onChange={handleFilter}
              defaultValue={1}
            />
          </p>
        </div>
        <div
          className={` ${
            route ? " hidden" : " flex flex-wrap "
          } px-5 py-2 bg-[#263670] rounded-lg xsm:gap-[17px] sm:gap-7 justify-center text-nowrap items-center`}
        >
          <div className="flex gap-3">
            Popularity
            <input
              type="radio"
              name="filter"
              value="popular"
              onChange={handleFilter}
              defaultChecked
            />
          </div>
          <div className="flex gap-3">
            Top Rated
            <input
              type="radio"
              name="filter"
              value="toprated"
              onChange={handleFilter}
            />
          </div>
          <div className="flex gap-3">
            Upcoming
            <input
              type="radio"
              name="filter"
              value="upcoming"
              onChange={handleFilter}
            />
          </div>
          <div className="flex gap-3">
            Today
            <input
              type="radio"
              name="filter"
              value="theater"
              onChange={handleFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
