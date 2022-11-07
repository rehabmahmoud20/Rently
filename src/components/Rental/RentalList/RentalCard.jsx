import { Card, Carousel } from "flowbite-react";
import { CiLocationOn } from "react-icons/ci";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FaBed, FaFan, FaHeart } from "react-icons/fa";
import { BiBath, BiArea } from "react-icons/bi";


const RentalDetails = ({data}) => {
  console.log(data)
  return (
    <div className="product w-1/2 mb-10">
      <div className="max-w-sm bg-white rounded-lg border border-gray-100 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="carousel">
          <Card>
            <div className="heart-wrapper bg-gray-100 cursor-pointer rounded-full">
              <AiOutlineHeart className="heart-icon text-red-600 text-md"/>
            </div>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 card-top">
              <Carousel slide={false} className="w-full">
                {data.images.map((img) => {
                  return (
                    <img key={Math.random() * 100} src={img} alt={img} className="h-full appartment-img" />
                  )
                })}
              </Carousel>
            </div>
            <div className="card-text px-4 py-2">
              <h4 className="text-xl text-gray-800 mb-2">
                {data.name}
              </h4>
              <div className="flex justify-between mb-3">
                <p className="price-text text-cyan-600">
                  {data.price}<span className="day text-gray-600">/Day</span>
                </p>
                <p className="text-sm text-gray-600 flex">
                  <AiFillStar className="mr-2 text-lg"/> 
                  <span>Reviews: {data.reviews[0].rate}/5</span>
                </p>
              </div>
              <p className="text-sm text-gray-600 flex mb-3">
                <CiLocationOn className="mr-2 text-lg"/> <span>Longitude: {data.location.lng}, Latitude: {data.location.lat}</span>
              </p>
              <div className="details flex justify-between flex-wrap mb-3">
                <p className="text-sm text-gray-600 w-1/2 mb-3 flex">
                  <FaBed className="mr-2 text-lg"/>
                  <span>{data.aboutRental.rooms} rooms</span>
                </p>
                <p className="text-sm text-gray-600 w-1/2 mb-3 flex">
                  <BiBath className="mr-2 text-lg"/>
                  <span>{data.aboutRental.bathroom} bathrooms</span>
                </p>
                <p className="text-sm text-gray-600 w-1/2 mb-3 flex">
                  <BiArea className="mr-2 text-lg"/> 
                  <span>{data.aboutRental.area}m<sup>2</sup></span>
                </p>
                <p className="text-sm text-gray-600 w-1/2 mb-3 flex" style={{display: data.features.airConditioner == false ? "none" : "true"}}>
                  <FaFan className="mr-2 text-lg"/> A/C
                </p>
              </div>
              <button type="button" class="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800">Property Details</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default RentalDetails;