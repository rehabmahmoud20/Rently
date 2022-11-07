import { Navbar } from "flowbite-react";
import rently from "../../assets/images/rently.png";

import { FaHeart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
// Link

const NavbarComponent = () => {
  return (
    <div>
      <Navbar
        fluid={true}
        rounded={true}
        className="md:border-b-2  rounded-none md-divide-gray-200"
      >
        <div className="flex items-center" >
        <Navbar.Brand 
        href="http://localhost:3000">
          <img src={rently} className="mr-3  w-15 h-10" alt="Flowbite Logo" />
        </Navbar.Brand>

          <Link to="/rental-list" className="hidden md:block  text-lg" >Rent</Link>
        </div>

        <Navbar.Toggle />
        <Navbar.Collapse>
        <Link to="/rental-list" className="block md:hidden  py-3 border-b-2 divide-gray-200 " >Rent</Link>

          <Link to="/add-rental" className=" text-lg py-3 border-b-2 divide-gray-200 md:border-none md:py-0 dark:text-white">Manage rentals</Link>
          <Link to="/signin" className=" text-lg py-3 border-b-2 divide-gray-200 md:border-none md:py-0">Sign in</Link>

          <Link to="/signup" className=" text-lg py-3 border-b-2 divide-gray-200 md:border-none md:py-0">Sign up</Link>
          <Link to="/favourits" className="  py-3 border-b-2 divide-gray-200 md:border-none md:py-0">
            <FaHeart className=" text-red-600 text-2xl" />
          </Link>

          <Link to="/profile/*" className="py-3 border-b-2 divide-gray-200 md:border-none md:py-0">
            <FaUserCircle className="text-gray-600 text-2xl " />
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
