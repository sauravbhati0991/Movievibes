import React from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import DetailPage from "@/components/DetailPage";

function TVShowsDetails({ id }) {
  return (
    <div>
      <Logo />
      <Navbar />
      {/* <DetailPage id={id} field={"TVShow"} /> */}
    </div>
  );
}

export default TVShowsDetails;
