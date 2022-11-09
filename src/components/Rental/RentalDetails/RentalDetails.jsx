import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Carousel, Button, Card, Rating } from "flowbite-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  MdDateRange,
  MdOutlineBedroomParent,
  MdOutlinePets,
  MdOutlineElevator,
} from "react-icons/md";
import { BiBuildingHouse, BiArea, BiCheck } from "react-icons/bi";
import { FaWarehouse, FaBath, FaCouch, FaParking } from "react-icons/fa";
import { VscPerson } from "react-icons/vsc";
import { BsSnow, BsWifi } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import egyptflag from "../../../assets/images/icons8-egypt-48.png";
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

// Initial Property State
const initialState = {
  loading: true,
  data: [],
  error: ""
}

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        loading: true
      }
    case "success":
      return {
        loading: false,
        data: action.payload
      }
    case "failed":
      return {
        loading: false,
        error: action.payload
      }
  }
}
const RentalDetails = () => {
  const [addToFav, setAddToFav] = useState(false);
  const [rental, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const [rentalGallery, setRentalGallery] = useState([
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80",
  ]);
  const position = [51.505, -0.09];
  const location = useLocation();
  console.log(location.hash);
  function pathMatchRoute(route) {
    if (route === location.hash) {
      return true;
    }
  }

  // Fetch the specific rental property
  useEffect(() => {
    const docRef = doc(db, "rentals", params.id);
    getDoc(docRef).then((doc) => {
      dispatch({type: "success", payload: doc.data()})
    }).catch((error) => {
      dispatch({type: "failed", payload: error.message})
    })
  }, []);
  console.log(rental);
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
