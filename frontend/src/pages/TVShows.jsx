import React from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import DetailsSection from "@/components/DetailsSec";

function TVShows() {
  return (
    <div>
      <Logo />
      <Navbar />
      <DetailsSection data={"TV Shows"} />
    </div>
  );
}

export default TVShows;
