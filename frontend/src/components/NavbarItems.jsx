import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import TvIcon from "@mui/icons-material/Tv";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import MovieIcon from "@mui/icons-material/Movie";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

export let items = [
  {
    id: 1,
    title: "Account",
    nohover: <PersonOutlineOutlinedIcon className=" text-white" />,
    onhover: <PersonIcon className=" text-white" />,
    active: <PersonIcon className=" text-white" />,
  },
  {
    id: 2,
    title: "Home",
    nohover: <HomeOutlinedIcon className=" text-white" />,
    onhover: <HomeIcon className=" text-white" />,
    active: <HomeIcon className=" text-white" />,
  },
  {
    id: 3,
    title: "TV Shows",
    nohover: <TvIcon className=" text-white" />,
    onhover: <DesktopWindowsIcon className=" text-white" />,
    active: <DesktopWindowsIcon className=" text-white" />,
  },
  {
    id: 4,
    title: "Movies",
    nohover: <MovieOutlinedIcon className=" text-white" />,
    onhover: <MovieIcon className=" text-white" />,
    active: <MovieIcon className=" text-white" />,
  },
  {
    id: 5,
    title: "Category",
    nohover: <CategoryOutlinedIcon className=" text-white" />,
    onhover: <CategoryIcon className=" text-white" />,
    active: <CategoryIcon className=" text-white" />,
  },
];
