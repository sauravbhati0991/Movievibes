import React from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import DetailsSection from "@/components/DetailsSec";

function People() {
  return (
    <div>
      <Logo />
      <Navbar />
      <DetailsSection data={"People"} />
    </div>
  );
}

export default People;
