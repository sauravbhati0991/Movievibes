import React from "react";
import Logo from "../components/Logo";
import Mainmovies from "../components/Main-movies";
import MainSlider from "../components/Main-slider";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import LogOut from "@/components/LogOut";
import User from "@/components/User";

function Home() {
  return (
    <div className=" relative">
      <Logo />
      <User />
      <Navbar />
      <LogOut />
      <SearchBar />
      <MainSlider />
      <Mainmovies />
    </div>
  );
}

export default Home;
