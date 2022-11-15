import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/authentication';
const Logout = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const navigate = useNavigate();
    const logoutHandler = () => {
        auth.signOut();
        navigate('/');
        dispatch(authActions.authStatus(false));
    };
    return (
        <li className="text-sm font-bold rounded-lg text-gray-700 opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transition-500">
            <Link
                onClick={logoutHandler}
                to="/"
                className="flex items-center p-2 rounded-lg dark:text-white"
            >
                <BiLogOut className="flex-shrink-0 w-10 sm:w-6 h-6  text-gray-600 transition-all duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap hidden md:block transition-all duration-500">
                    Logout
                </span>
            </Link>
        </li>
    );
};

export default Logout;
