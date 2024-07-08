import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function FilterBox({ data, getFilter }) {
  let [showBox, setShowBox] = useState(false);
  let [filter, setFilter] = useState({
    wood: "hollywood",
    page: "1",
    filter: "popular",
  });

  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  let handleClick = () => {
    setShowBox(!showBox);
  };

  useEffect(() => {
    getFilter(filter);
  }, [filter, getFilter]);

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
        <div className="px-4 py-2 bg-[#263670] text-nowrap rounded-lg flex gap-3">
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
              min={1}
              max={data?.total_pages}
              onChange={handleFilter}
              defaultValue={1}
            />
          </p>
        </div>
        <div className=" px-5 py-2 bg-[#263670] rounded-lg flex xsm:gap-[17px] sm:gap-7 flex-wrap justify-center text-nowrap items-center">
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
            UpComing
            <input
              type="radio"
              name="filter"
              value="upcoming"
              onChange={handleFilter}
            />
          </div>
          <div className="flex gap-3">
            In Theaters
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
