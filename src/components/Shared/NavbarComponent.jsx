import { Navbar } from "flowbite-react";
import { UseAuthStatus } from "../Hooks/useAuthStatus";
import rently from "../../assets/images/rently.png";
import { useSelector } from "react-redux";

// icons
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
// Link

const NavbarComponent = () => {
  const { isLoggedIn } = UseAuthStatus();
  const globalAuthState = useSelector(
    (state) => state.authentication.isLoggedin
  );
  return (
    <div>
      <Navbar
        fluid={true}
        rounded={true}
        className="md:border-b-2  rounded-none md-divide-gray-200 container mx-auto"
      >
        <Link to="/">
          <img src={rently} className="mr-3  w-15 h-10" alt="Flowbite Logo" />
        </Link>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link
            to="/rental-list"
            className="  font-bold py-3 border-b-2 divide-gray-200 md:border-none md:py-0 dark:text-white"
          >
            Rent
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/add-rental"
                className=" font-bold py-3 border-b-2 divide-gray-200 md:border-none md:py-0 dark:text-white"
              >
                Manage rentals
              </Link>
              <Link
                to="/favourits"
                className=" font-bold py-3 border-b-2 divide-gray-200 md:border-none md:py-0 dark:text-white"
              >
                Favourites
              </Link>
              <Link
                to="/profile"
                className="font-bold py-3 border-b-2 divide-gray-200 md:border-none md:py-0 dark:text-white"
              >
                <FaUserCircle className="text-gray-600 text-2xl " />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className=" font-bold py-3 border-b-2 divide-gray-200 md:border-none md:py-0"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className=" font-bold py-3 border-b-2 divide-gray-200 md:border-none md:py-0 dark:text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
