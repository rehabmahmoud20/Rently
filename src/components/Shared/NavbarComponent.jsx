import userPic from '../Profile/images/user-avatar.png';
import { Navbar } from 'flowbite-react';
import { UseAuthStatus } from '../Hooks/useAuthStatus';
import rently from '../../assets/images/rently.png';
import { useSelector, useDispatch } from 'react-redux';
import { rentalsActions } from '../Store/rentals';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    const userData = { ...useSelector((state) => state.user.userData) };
    const dispatch = useDispatch();
    UseAuthStatus();
    const globalAuthState = useSelector(
        (state) => state.authentication.isLoggedin
    );
    const handleClick = () => {
        dispatch(rentalsActions.updateFetchData(true));
    };
    return (
        <Navbar
            fluid={true}
            rounded={true}
            className="md:border-b-2  rounded-none md-divide-gray-200 items-center  mx-auto"
        >
            <Link to="/">
                <img
                    src={rently}
                    className="mr-3  w-15 h-10"
                    alt="Flowbite Logo"
                />
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="items-center">
                <Link
                    onClick={handleClick}
                    to="/rental-list"
                    className=" text-lg  font-bold border-b-2 hover:text-cyan-600 transition transition-500 divide-gray-200 md:border-none  dark:text-white"
                >
                    Rent
                </Link>
                {globalAuthState ? (
                    <>
                        <Link
                            to="/add-rental"
                            className=" text-lg font-bold border-b-2 hover:text-cyan-600 transition transition-500 divide-gray-200 md:border-none  dark:text-white"
                        >
                            Add Rental
                        </Link>
                        <Link
                            to="/favourits"
                            className=" text-lg font-bold border-b-2 hover:text-cyan-600 transition transition-500 divide-gray-200 md:border-none dark:text-white"
                        >
                            Favourites
                        </Link>
                        <Link
                            to="/profile"
                            className=" font-bold  divide-gray-200  md:py-0  hight-fit dark:text-white"
                        >
                            <img
                                className="w-10 h-10 object-cover rounded-full transition-all duration-500"
                                src={
                                    userData.avatar ? userData.avatar : userPic
                                }
                                alt="profile"
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/signin"
                            className="  text-lg font-bold border-b-2 hover:text-cyan-600 transition transition-500 divide-gray-200 md:border-none "
                        >
                            Sign in
                        </Link>

                        <Link
                            to="/signup"
                            className="text-lg font-bold  divide-gray-200   hover:text-cyan-600 transition transition-500 dark:text-white"
                        >
                            Sign up
                        </Link>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
