import React from "react";
import Logo from "../components/Logo";
import Mainmovies from "../components/Main-movies";
import MainSlider from "../components/Main-slider";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div>
      <Logo />
      <Navbar />
      <SearchBar />
      <MainSlider />
      <Mainmovies />
    </div>
  );
}

export default Home;
