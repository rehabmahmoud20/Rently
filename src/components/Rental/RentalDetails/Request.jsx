import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
const Request = () => {
  const [addToFav, setAddToFav] = useState(false);
  return (
    <>
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
    </>
  );
};

export default Request;
