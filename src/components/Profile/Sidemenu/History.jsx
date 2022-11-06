import { Link } from 'react-router-dom';
import { RiHistoryFill } from 'react-icons/ri';

const History = () => {
    return (
        <li>
            <Link
                to="/profile/history"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <RiHistoryFill className="flex-shrink-0 w-10 sm:w-5 h-6 sm:h-5 text-gray-600 transition-all duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="text-sm flex-1 ml-3 whitespace-nowrap hidden sm:block transition-all duration-500">
                    History
                </span>
            </Link>
        </li>
    );
};

export default History;
