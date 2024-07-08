import React from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import DetailsSection from "@/components/DetailsSec";

function Movies() {
  return (
    <div>
      <Logo />
      <Navbar />
      <DetailsSection data={"Movies"} />
    </div>
  );
}

export default Movies;
