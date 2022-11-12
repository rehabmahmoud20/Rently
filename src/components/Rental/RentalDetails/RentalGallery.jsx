import React, { useState } from "react";
import { Carousel } from "flowbite-react";
const RentalGallery = (props) => {
  return (
    <Carousel>
      {props.data.images.map((src) => {
        return (
          <img
            key={Math.random() * 100}
            src={src}
            alt="rental image"
            className="h-full w-full"
          />
        );
      })}
    </Carousel>
  );
};

export default RentalGallery;
