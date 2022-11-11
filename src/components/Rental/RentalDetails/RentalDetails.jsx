import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
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
import Spinner from "../../Shared/Spinner";
// Initial Property State
const initialState = {
  loading: true,
  data: [],
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        loading: true,
      };
    case "success":
      return {
        loading: false,
        data: action.payload,
      };
    case "failed":
      return {
        loading: false,
        error: action.payload,
      };
  }
};
const RentalDetails = () => {
  const [rental, dispatch] = useReducer(reducer, initialState);
  const params = useParams();

  // Fetch the specific rental property
  useEffect(() => {
    const docRef = doc(db, "rentals", params.id);
    getDoc(docRef)
      .then((doc) => {
        dispatch({ type: "success", payload: doc.data() });
      })
      .catch((error) => {
        dispatch({ type: "failed", payload: error.message });
      });
  }, []);
  console.log(rental.data);
  return (
    <>
      {rental.loading ? (
        <Spinner />
      ) : (
        <section className=" flex border-2  h-[600px] flex-wrap container mx-auto">
          <div className="left-section w-full lg:w-[50%] h-full ">
            <div className="h-[45%] md:h-[35%] p-4">
              <Request data={rental.data} />
            </div>
            <div className="h-[55%] md:h-[65%]">
              <RentalGallery data={rental.data} />
            </div>
          </div>
          <div className="right-section w-full lg:w-[50%] border-l-4 h-full  ">
            <div className="sectionNav h-[10%]">
              <Header />
            </div>
            <div className="h-[90%] lg:overflow-auto  p-4">
              <Overview data={rental.data} />
              <AboutRental data={rental.data.aboutRental} />
              <KeyFeatures data={rental.data.features} />
              <Reviews />
              <Host />
              <Policies />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default RentalDetails;
