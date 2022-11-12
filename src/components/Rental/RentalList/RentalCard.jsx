import { Card, Carousel } from "flowbite-react";
import { AiFillStar } from "react-icons/ai";
import { FaBed, FaFan } from "react-icons/fa";
import { BiBath, BiArea } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";

const RentalCard = ({ resp }) => {
  return (
    <div className="product mb-3">
      <div className="prod-wrapper max-w-sm bg-white rounded-lg border border-gray-100 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="carousel-list">
          <Card>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 card-top">
              <Carousel slide={false} className="change-carousel">
                {resp.data.images.map((img) => {
                  return (
                    <img
                      key={Math.random() * 100}
                      src={img}
                      alt={img}
                      className="h-full appartment-img"
                    />
                  );
                })}
              </Carousel>
            </div>
            <div className="card-text px-4 py-2">
              <h4 className="text-base md:text-lg lg:text-xl text-gray-800 mb-2">
                {resp.data.name}
              </h4>
              <div className="flex justify-between mb-3">
                <p className="price-text text-cyan-600 text-sm lg:text-base">
                  {resp.data.price} EGP
                  <span className="day text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">/Month</span>
                </p>
                <p className="text-sm lg:text-base text-gray-600 flex items-center">
                  <AiFillStar className="mr-1 text-lg text-yellow-300" />
                  <span className="mr-2 overflow-hidden whitespace-nowrap text-ellipsis">{resp.data.reviews[0].rate}/5</span>
                  <span>
                    {resp.data.reviews[0].rate <= 1
                      ? '"Very Poor"'
                      : resp.data.reviews[0].rate > 1 &&
                        resp.data.reviews[0].rate <= 2
                      ? '"Poor"'
                      : resp.data.reviews[0].rate > 2 &&
                        resp.data.reviews[0].rate <= 3
                      ? '"Fair"'
                      : resp.data.reviews[0].rate > 3 &&
                        resp.data.reviews[0].rate <= 4
                      ? '"Very Good"'
                      : '"Excellent"'}
                  </span>{" "}
                </p>
              </div>
              <p className="text-gray-600 flex mb-3 items-center">
                <GoLocation className="mr-3 text-lg text-cyan-600" />
                <span className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                  {resp.data.address}
                </span>
              </p>
              <div className="details flex justify-between flex-wrap mb-3">
                <p className="text-sm text-gray-600 w-1/2 mb-3 flex items-center">
                  <FaBed className="mr-3 text-lg" />
                  <span className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                    {resp.data.aboutRental.rooms} rooms
                  </span>
                </p>
                <p className="bathrooms text-sm text-gray-600 w-1/2 mb-3 flex items-center">
                  <BiBath className="mr-3 text-lg" />
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis">{resp.data.aboutRental.bathroom} bathrooms</span>
                </p>
                <p className="text-sm text-gray-600 w-1/2 mb-3 flex items-center">
                  <BiArea className="mr-3 text-lg" />
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {resp.data.aboutRental.area}m<sup>2</sup>
                  </span>
                </p>
                <p
                  className="text-sm text-gray-600 w-1/2 mb-3 flex items-center"
                  style={{
                    display:
                      resp.data.features.airConditioner == false
                        ? "none"
                        : "true",
                  }}
                >
                  <FaFan className="mr-3 text-lg" /> A/C
                </p>
              </div>
              <Link to={`/rental-details/${resp.id}`}>
                <button
                  type="button"
                  className="property-button text-white bg-cyan-600 hover:bg-cyan-800 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800"
                >
                  Property Details
                </button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
