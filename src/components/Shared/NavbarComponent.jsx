import userPic from "../Profile/images/user-avatar.png";

import { Navbar } from "flowbite-react";
import { UseAuthStatus } from "../Hooks/useAuthStatus";
import rently from "../../assets/images/rently.png";
import { useSelector } from "react-redux";



// icons
import { FaHeart } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Link

const NavbarComponent = () => {
  const userData = { ...useSelector((state) => state.user.userData) };
  const { isLoggedIn } = UseAuthStatus();
  const globalAuthState = useSelector(
    (state) => state.authentication.isLoggedin
  );
  return (
      <Navbar
        fluid={true}
        rounded={true}
        className="md:border-b-2  rounded-none md-divide-gray-200 items-center  mx-auto"
      >
        <Link to="/">
          <img src={rently} className="mr-3  w-15 h-10" alt="Flowbite Logo" />
        </Link>

        <Navbar.Toggle />
        <Navbar.Collapse className="items-center">

          <Link
            to="/rental-list"
            className="h-fit text-lg  font-bold py-3 border-b-2 divide-gray-200 md:border-none  dark:text-white"
          >
            Rent
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/add-rental"
                className="h-fit text-lg font-bold py-3 border-b-2 divide-gray-200 md:border-none  dark:text-white"
              >
                Manage rentals
              </Link>
              <Link
                to="/favourits"
                className="h-fit text-lg font-bold py-3 border-b-2 divide-gray-200 md:border-none dark:text-white"
              >
                Favourites
              </Link>
              <Link
                to="/profile"
                className="h-fit font-bold py-3  divide-gray-200  md:py-0  hight-fit dark:text-white"
              >
                  <img
          className="w-10 h-10 object-cover rounded-full transition-all duration-500"
          src={userData.avatar ? userData.avatar : userPic}
          alt="profile"
        />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="h-fit  text-lg font-bold py-3 border-b-2 divide-gray-200 md:border-none "
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="h-fit  text-lg font-bold py-3  divide-gray-200   dark:text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </Navbar.Collapse>

         
        {/* </Navbar.Collapse> */}
      </Navbar>
    // </div>
  );
};

export default NavbarComponent;
