import React from "react";
import Navbar from "@/components/Navbar";

function About() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">About Us</h1>
      <p className="mt-4 text-center">This is the about page!</p>
      <Navbar />
    </div>
  );
}

export default About;
