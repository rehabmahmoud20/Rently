import { MdDateRange, MdOutlineBedroomParent } from "react-icons/md";
import { BiBuildingHouse, BiArea, BiCheck } from "react-icons/bi";
import { FaWarehouse, FaBath } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { VscPerson } from "react-icons/vsc";
const AboutRental = (props) => {
  return (
    <div id="about-rental" className="h-auto mb-4">
      <p className="text-2xl mb-2"> About rental</p>
      <div className="flex justify-between flex-wrap w-full">
        <div className="flex items-center mb-6 w-full lg:w-[50%] ">
          <BiBuildingHouse className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">
            Type :{" "}
            <span className="font-thin">
              {props.data.type.value || props.data.type}{" "}
            </span>
          </p>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <MdDateRange className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">
            Avialable date :{" "}
            <span className="font-thin">{props.data.availableDate} </span>
          </p>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%] ">
          <BiArea className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">
            Area :
            <span className="font-thin">
              {props.data.area} m<sup>2</sup>
            </span>
          </p>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <FaWarehouse className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">
            Floor : <span className="font-thin">{props.data.floor}</span>
          </p>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <MdOutlineBedroomParent className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">
            Rooms : <span className="font-thin">{props.data.rooms}</span>
          </p>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <FaBath className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">
            Bathrooms : <span className="font-thin">{props.data.bathroom}</span>
          </p>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <VscPerson className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">
            Seperate rooms :
            <span>
              {props.data.separateRooms ? (
                <BiCheck className="inline text-2xl" />
              ) : (
                <HiXMark className="inline text-2xl" />
              )}
            </span>
          </p>
        </div>
        {props.data.separateRooms ? (
          <div className="flex items-center mb-6 w-full lg:w-[50%]">
            <MdOutlineBedroomParent className="text-cyan-600 text-2xl mr-2" />
            <p className="font-bold">
              Available rooms :{" "}
              <span className="font-thin">{props.data.availableRooms}</span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AboutRental;
