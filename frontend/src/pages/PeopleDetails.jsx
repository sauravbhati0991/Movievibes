import React from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import DetailPage from "@/components/DetailPage";

function PeopleDetails({ id }) {
  return (
    <div>
      <Logo />
      <Navbar />
      <DetailPage id={id} />
    </div>
  );
}

export default PeopleDetails;
