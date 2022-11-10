// C O M P O N E N T S
import { React, useEffect, useState } from "react";
import { Card, Rating } from "flowbite-react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../firebase.config";
import Recommended from "./Recommended";
// I M A G E S
import HeroImage from "./assets/hero-image.jpg";
import HouseImage from "./assets/house-image.jpg";
import ApartmentImage from "./assets/apartment-image.jpg";
import RoomImage from "./assets/room-image.png";
import BuildingImage from "./assets/building-image.jpg";
import OfferImage from "./assets/offer-image.png";
import Avatar01 from "./assets/avatar-image-01.jpg";
import Avatar02 from "./assets/avatar-image-02.jpg";
import Avatar03 from "./assets/avatar-image-03.jpg";
// I C O N S
import {
  AiOutlineCheck,
  AiOutlineHeart,
  AiOutlineFileSearch,
} from "react-icons/ai";
import { toast } from "react-toastify";
const Home = () => {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchRents = async () => {
      try {
        // Get a ref
        const rentsRef = collection(db, "rentals");
        // Create a query
        const q = query(rentsRef, limit(3));
        // Execute the query
        const querySnap = await getDocs(q);
        const rents = [];
        querySnap.forEach((doc) => {
          rents.push(doc.data());
        });
        setListings(rents);
      } catch (error) {
        toast.error("Could not fetch rents");
      }
    };
    fetchRents();
  }, []);
  console.log("listings", listings);
  return (
    <>
      <section className="hero-section relative mb-24">
        <img src={HeroImage} alt="House" className="hero-image w-full" />
        <div className="overlay absolute top-0 left-0 bg-black h-full w-full opacity-60 z-10"></div>
        <div className="get-started absolute left-28 top-32 z-20">
          <h2 className="text-white text-6xl	mb-16">
            Find your best
            <br />
            smart real estate
          </h2>
          <button className="text-white text-2xl border-2	border-white rounded-md	px-3 py-1">
            Get Started
          </button>
        </div>
      </section>
      <section className="our-services mb-24">
        <div className="container mx-auto">
          <h3 className="our-services-header text-center mb-14 text-4xl">
            Our Services
          </h3>
          <div className="services-card-container grid lg:grid-cols-3 gap-24">
            <div className="services-card">
              <Card
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={HouseImage}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
                  Rent a house
                </h5>
                <p className="font-normal text-gray-500 dark:text-gray-400">
                  You can place your own full house for rent.
                </p>
              </Card>
            </div>
            <div className="services-card">
              <Card
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={ApartmentImage}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
                  Rent an apartment
                </h5>
                <p className="font-normal text-gray-500 dark:text-gray-400">
                  You can place your own apartment for rent.
                </p>
              </Card>
            </div>
            <div className="services-card">
              <Card
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={RoomImage}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
                  Rent rooms
                </h5>
                <p className="font-normal text-gray-500 dark:text-gray-400">
                  You can split your own apartment and place the rooms for rent.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="why-us mb-24">
        <div className="container  mx-auto">
          <div className="why-us-container services-card-container grid lg:grid-cols-2 gap-24">
            <figure className="why-us-image-container">
              <img
                src={BuildingImage}
                alt=""
                className="object-cover rounded-xl"
              />
            </figure>
            <div className="why-us-text-containe">
              <h3 className="my-28 mb-14 text-4xl">Why Choose Us</h3>
              <div className="sub-text">
                <h4 className="text-2xl mb-4 flex">
                  <AiOutlineCheck className="mr-5 text-teal-400" />
                  Trusted
                </h4>
                <h5 className="text-xl mb-10">
                  We offer a trusted community of landlords and apartment
                  owners.
                </h5>
                <h4 className="text-2xl mb-4 flex">
                  <AiOutlineFileSearch className="mr-5 text-teal-400" />
                  Variety
                </h4>
                <h5 className="text-xl mb-10">
                  We have a huge list of houses and apartments to fit your
                  needs.
                </h5>
                <h4 className="text-2xl mb-4 flex">
                  <AiOutlineHeart className="mr-5 text-teal-400" />
                  Share
                </h4>
                <h5 className="text-xl">
                  You can split the apartment with different people based on
                  your preferences.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="our-properties mb-24">
        <div className="container  mx-auto">
          {listings && listings.length > 0 ? (
            <Recommended listings={listings} />
          ) : (
            <></>
          )}
        </div>
      </section>
      <section className="Offers relative mb-24">
        <img src={OfferImage} alt="House" className="offers-image w-full" />
        <div className="overlay absolute inset-0 bg-black h-full w-full opacity-60 z-10"></div>
        <div className="get-started absolute left-1/2 top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 text-center w-full">
          <h2 className="text-white text-4xl mb-16 font-normal">
            Want to get limited offers ?
          </h2>
          <button className="text-white text-xl border-2	border-white rounded-md	px-3 py-1 font-light">
            Discover
          </button>
        </div>
      </section>
      <section className="testimonial mb-24 ">
        <div className="container grid lg:grid-cols-3 gap-24 mx-auto">
          <div className="testimonial-card">
            <Card>
              <div className="avatar-container flex">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={Avatar01}
                  alt="Rounded avatar"
                />
                <div className="avatar-container-text">
                  <h5 className="m-0 p-0">Hesham</h5>
                  <p>26th MAY, 2021</p>
                </div>
              </div>
              <p>
                It was a pleasure to deal with you and it was comfortable for
                all services as I wanted
              </p>
              <Rating className="mb-3">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
              </Rating>
            </Card>
          </div>
          <div className="testimonial-card">
            <Card>
              <div className="avatar-container flex">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={Avatar02}
                  alt="Rounded avatar"
                />
                <div className="avatar-container-text">
                  <h5 className="m-0 p-0">Mostafa</h5>
                  <p>12th JUL, 2022</p>
                </div>
              </div>
              <p>
                It was a pleasure to deal with you and it was comfortable for
                all services as I wanted
              </p>
              <Rating className="mb-3">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
                <Rating.Star filled={false} />
              </Rating>
            </Card>
          </div>
          <div className="testimonial-card">
            <Card>
              <div className="avatar-container flex">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={Avatar03}
                  alt="Rounded avatar"
                />
                <div className="avatar-container-text">
                  <h5 className="m-0 p-0">Moataz</h5>
                  <p>7th JAN, 2022</p>
                </div>
              </div>
              <p>
                It was a pleasure to deal with you and it was comfortable for
                all services as I wanted
              </p>
              <Rating className="mb-3">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
              </Rating>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
