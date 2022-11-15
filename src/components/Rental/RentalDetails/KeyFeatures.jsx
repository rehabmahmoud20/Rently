import { MdOutlinePets, MdOutlineElevator } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import { FaCouch, FaParking } from "react-icons/fa";
import { BsSnow, BsWifi } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

const KeyFeatures = (props) => {
  return (
    <div id="key-features" className="h-auto mb-4">
      <p className="text-2xl mb-3"> Key features</p>
      <div className="flex justify-between flex-wrap">
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <FaCouch className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">Furnished : </p>{" "}
          <span>
            {props.data.furnashed ? (
              <BiCheck className="inline text-2xl" />
            ) : (
              <MdOutlineClose className="inline text-2xl" />
            )}
          </span>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <MdOutlinePets className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">Pets : </p>{" "}
          <span>
            {props.data.pet ? (
              <BiCheck className="inline text-2xl" />
            ) : (
              <MdOutlineClose className="inline text-2xl" />
            )}
          </span>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <BsSnow className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">Air conditioner : </p>{" "}
          <span>
            {props.data.airConditioner ? (
              <BiCheck className="inline text-2xl" />
            ) : (
              <MdOutlineClose className="inline text-2xl" />
            )}
          </span>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <FaParking className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">Parking : </p>{" "}
          <span>
            {props.data.parking ? (
              <BiCheck className="inline text-2xl" />
            ) : (
              <MdOutlineClose className="inline text-2xl" />
            )}
          </span>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <BsWifi className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">Wifi : </p>{" "}
          <span>
            {props.data.wifi ? (
              <BiCheck className="inline text-2xl" />
            ) : (
              <MdOutlineClose className="inline text-2xl" />
            )}
          </span>
        </div>
        <div className="flex items-center mb-6 w-full lg:w-[50%]">
          <MdOutlineElevator className="text-cyan-600 text-2xl mr-2" />
          <p className="font-bold">Elevator : </p>{" "}
          <span>
            {props.data.alevator ? (
              <BiCheck className="inline text-2xl" />
            ) : (
              <MdOutlineClose className="inline text-2xl" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
