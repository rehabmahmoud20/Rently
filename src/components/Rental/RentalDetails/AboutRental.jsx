import { MdDateRange, MdOutlineBedroomParent } from "react-icons/md";
import { BiBuildingHouse, BiArea, BiCheck } from "react-icons/bi";
import { FaWarehouse, FaBath } from "react-icons/fa";
import { VscPerson } from "react-icons/vsc";
const AboutRental = () => {
  return (
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
            Avialable date : <span className="font-thin">25/12/2022 </span>
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
  );
};

export default AboutRental;
