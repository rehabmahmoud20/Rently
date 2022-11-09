import { MdOutlinePets, MdOutlineElevator } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import { FaCouch, FaParking } from "react-icons/fa";
import { BsSnow, BsWifi } from "react-icons/bs";
const KeyFeatures = () => {
  return (
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
  );
};

export default KeyFeatures;
