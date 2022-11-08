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
          <div className="flex items-center justify-between">
            <p className="text-4xl font-bold mb-3 text-stone-900">
              253.11 $<span className="text-sm">/mo</span>
            </p>
            <p>
              {addToFav ? (
                <AiFillHeart
                  className="inline text-red-600 text-2xl cursor-pointer"
                  onClick={() => setAddToFav((prevState) => !prevState)}
                />
              ) : (
                <AiOutlineHeart
                  className="inline text-red-600 text-2xl cursor-pointer"
                  onClick={() => setAddToFav((prevState) => !prevState)}
                />
              )}
              Favourite
            </p>
          </div>
          <div className="flex items-center mb-4">
            <HiOutlineLocationMarker className="mr-2" />
            <p className="text-stone-900">
              177 Edgevalley Rd #1, London, ON N5V 0C5
            </p>
          </div>
          <div className="buttons flex  space-x-3 ">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-cyan-600 py-3 px-10 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-cyan-800 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800"
            >
              Request a tour
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-3 px-10 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Request to apply
            </a>
          </div>
        </div>
        <div className="h-[60%] md:h-[70%]   ">
          <Carousel>
            {rentalGallery.map((src) => {
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
        </div>
      </div>
      <div className="right-section w-full lg:w-[50%] border-l-4 h-full  ">
        <div className="sectionNav h-[10%]">
          <ul className="flex h-full justify-around border-b flex-wrap">
            <li
              className={`flex items-center h-full cursor-pointer hover:text-cyan-600
            ${
              pathMatchRoute("#overview") &&
              "border-b-2 border-b-cyan-600 text-cyan-600 "
            }`}
            >
              <a href="#overview">Overview</a>
            </li>
            <li
              className={`flex items-center h-full cursor-pointer hover:text-cyan-600
            ${
              pathMatchRoute("#about-rental") &&
              "border-b-2 border-b-cyan-600 text-cyan-600 "
            }`}
            >
              <a href="#about-rental">About rental</a>
            </li>
            <li
              className={`flex items-center h-full cursor-pointer hover:text-cyan-600
            ${
              pathMatchRoute("#key-features") &&
              "border-b-2 border-b-cyan-600 text-cyan-600 "
            }`}
            >
              <a href="#key-features">Key features</a>
            </li>
            <li
              className={`flex items-center h-full cursor-pointer hover:text-cyan-600
            ${
              pathMatchRoute("#reviews") &&
              "border-b-2 border-b-cyan-600 text-cyan-600 "
            }`}
            >
              <a href="#reviews">Reviews</a>
            </li>
            <li
              className={`flex items-center h-full cursor-pointer hover:text-cyan-600
            ${
              pathMatchRoute("#host") &&
              "border-b-2 border-b-cyan-600 text-cyan-600 "
            }`}
            >
              <a href="#host">Host</a>
            </li>
            <li
              className={`flex items-center h-full cursor-pointer hover:text-cyan-600
            ${
              pathMatchRoute("#policies") &&
              "border-b-2 border-b-cyan-600 text-cyan-600 "
            }`}
            >
              <a href="#policies">Policies</a>
            </li>
          </ul>
        </div>
        <div className="h-[90%] lg:overflow-auto  p-4">
          <div id="overview" className="h-auto mb-4">
            <p className="text-2xl mb-2">overview</p>
            <p className="mb-2 text-neutral-400">
              3 Bedrooms+Den ; 2.5 Bathrooms, Brand New Kitchen, Stainless Steel
              Appliances, Dishwasher, Microwave, Formica Countertops, Private
              Garage, Corner Unit.
            </p>

            <div className="w-full h-[300px]">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          <div id="about-rental" className="h-auto mb-4">
            <p className="text-2xl mb-2"> About rental</p>
            <div className="flex justify-between flex-wrap w-full">
              <div className="flex items-center mb-6 w-full lg:w-[50%] ">
                <BiBuildingHouse className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">
                  Type : <span className="font-thin">Appertment </span>
                </p>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <MdDateRange className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">
                  Avialable date :{" "}
                  <span className="font-thin">25/12/2022 </span>
                </p>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%] ">
                <BiArea className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">
                  Area :
                  <span className="font-thin">
                    300 m<sup>2</sup>
                  </span>
                </p>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <FaWarehouse className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">
                  Floor : <span className="font-thin">4</span>
                </p>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <MdOutlineBedroomParent className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">
                  Rooms : <span className="font-thin">2</span>
                </p>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <FaBath className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">
                  Bathrooms : <span className="font-thin">2</span>
                </p>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <VscPerson className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">
                  Seperate rooms :
                  <span>
                    <BiCheck className="inline text-2xl" />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div id="key-features" className="h-auto mb-4">
            <p className="text-2xl mb-3"> Key features</p>
            <div className="flex justify-between flex-wrap">
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <FaCouch className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">Furnished : </p>{" "}
                <span>
                  <BiCheck className="inline text-2xl" />
                </span>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <MdOutlinePets className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">Pets : </p>{" "}
                <span>
                  <BiCheck className="inline text-2xl" />
                </span>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <BsSnow className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">Air conditioner : </p>{" "}
                <span>
                  <BiCheck className="inline text-2xl" />
                </span>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <FaParking className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">Parking : </p>{" "}
                <span>
                  <BiCheck className="inline text-2xl" />
                </span>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <BsWifi className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">Wifi : </p>{" "}
                <span>
                  <BiCheck className="inline text-2xl" />
                </span>
              </div>
              <div className="flex items-center mb-6 w-full lg:w-[50%]">
                <MdOutlineElevator className="text-cyan-600 text-2xl mr-1" />
                <p className="font-bold">Elevator : </p>{" "}
                <span>
                  <BiCheck className="inline text-2xl" />
                </span>
              </div>
            </div>
          </div>
          <div id="reviews" className="h-auto mb-4 sm:w-full">
            <p className="text-2xl mb-3">Reviews</p>
            <div className="h-56 sm:h-64 xl:h-48 2xl:h-60">
              <Carousel slide={false}>
                <Card>
                  <div className="flex ">
                    <div className="w-[30%]">
                      <p className="mb-2">omima khaled</p>
                      <div className="flex items-center">
                        <img src={egyptflag} alt="" className="w-4 h-4 mr-2" />
                        <span className="text-xs">Egypt</span>
                      </div>
                    </div>
                    <div className="w-[70%]">
                      <p className="text-sm mb-2 neutral-400">
                        "The rooms were clean, very comfortable, and the staff
                        was amazing. They went over and beyond to help make our
                        stay enjoyable. I highly recommend this hotel for anyone
                        visiting downtown"
                      </p>
                      <Rating>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          4.95 out of 5
                        </p>
                      </Rating>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex ">
                    <div className="w-[30%]">
                      <p className="mb-2">omima khaled</p>
                      <div className="flex items-center">
                        <img src={egyptflag} alt="" className="w-4 h-4 mr-2" />
                        <span className="text-xs">Egypt</span>
                      </div>
                    </div>
                    <div className="w-[70%]">
                      <p className="text-sm mb-2">
                        "The rooms were clean, very comfortable, and the staff
                        was amazing. They went over and beyond to help make our
                        stay enjoyable. I highly recommend this hotel for anyone
                        visiting downtown"
                      </p>
                      <Rating>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          4.95 out of 5
                        </p>
                      </Rating>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex ">
                    <div className="w-[30%]">
                      <p className="mb-2">omima khaled</p>
                      <div className="flex items-center">
                        <img src={egyptflag} alt="" className="w-4 h-4 mr-2" />
                        <span className="text-xs">Egypt</span>
                      </div>
                    </div>
                    <div className="w-[70%]">
                      <p className="text-sm mb-2">
                        "The rooms were clean, very comfortable, and the staff
                        was amazing. They went over and beyond to help make our
                        stay enjoyable. I highly recommend this hotel for anyone
                        visiting downtown"
                      </p>
                      <Rating>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          4.95 out of 5
                        </p>
                      </Rating>
                    </div>
                  </div>
                </Card>
              </Carousel>
            </div>
          </div>
          <div id="host" className="h-auto mb-4">
            <p className="text-2xl mb-3">Host</p>
            <div className="w-full">
              <Card>
                <div className="flex justify-end px-4 pt-2"></div>
                <div className="flex flex-col items-center pb-2">
                  <img
                    className="mb-3 h-20 w-20 rounded-full shadow-lg"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Bonnie image"
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Bonnie Green
                  </h5>

                  <div className="mt-4 flex space-x-3 lg:mt-6">
                    <a
                      href="#"
                      className="inline-flex items-center rounded-lg bg-cyan-600 py-2 px-4 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-cyan-800 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800"
                    >
                      Send a message
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      Show reviews
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div id="policies" className="h-96">
            policies
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalDetails;
