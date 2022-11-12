import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  function pathMatchRoute(route) {
    if (route === location.hash) {
      return true;
    }
  }
  return (
    <ul className="flex h-full justify-around border-b flex-wrap lg:flex-nowrap">
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
      pathMatchRoute("#host") && "border-b-2 border-b-cyan-600 text-cyan-600 "
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
  );
};

export default Header;
