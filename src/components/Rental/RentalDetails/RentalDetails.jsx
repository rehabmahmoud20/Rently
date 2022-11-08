import React, { useState } from "react";
import Request from "./Request";
import RentalGallery from "./RentalGallery";
import Header from "./Header";
import Overview from "./Overview";
import AboutRental from "./AboutRental";
import KeyFeatures from "./KeyFeatures";
import Reviews from "./Reviews";
import Host from "./Host";
import Policies from "./Policies";
import "./rentalDetails.css";
const RentalDetails = () => {
  return (
    <section className=" flex border-2  h-[600px] flex-wrap container mx-auto">
      <div className="left-section w-full lg:w-[50%] h-full ">
        <div className="h-[40%] md:h-[30%]  p-4">
          <Request />
        </div>
        <div className="h-[60%] md:h-[70%]   ">
          <RentalGallery />
        </div>
      </div>
      <div className="right-section w-full lg:w-[50%] border-l-4 h-full  ">
        <div className="sectionNav h-[10%]">
          <Header />
        </div>
        <div className="h-[90%] lg:overflow-auto  p-4">
          <Overview />
          <AboutRental />
          <KeyFeatures />
          <Reviews />
          <Host />
          <Policies />
        </div>
      </div>
    </section>
  );
};

export default RentalDetails;
