"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/utilites/getUser";

export default function User() {
  let [data, setData] = useState(null);

  let handleProfile = () => {
    window.setTimeout(() => {
      location.assign("/myprofile");
    }, 500);
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchUserData();
      setData(result);
    };
    getData();
  }, []);

  return (
    <>
      {data !== null ? (
        <div
          onClick={handleProfile}
          className=" flex gap-2 cursor-pointer z-[10] absolute left-2 bg-[#182450] rounded-lg px-2 py-1 top-2"
        >
          <Image
            alt={`Profile picture of ${data?.name || 'user'}`}
            src={`/images/${
              data?.photo.split("/")[data?.photo.split("/").length - 1]
            }`}
            className=" xsm:w-[20px] sm:w-[25px] rounded-[50%]"
          />
          <h1 className=" text-white  font-freeman xsm:text-[15px] sm:text-[18px] text-nowrap">
            {data?.name.split(" ")[0]}
          </h1>
        </div>
      ) : null}
    </>
  );
}
