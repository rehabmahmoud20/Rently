import { Link } from 'react-router-dom';
import { MdOutlinePayment } from 'react-icons/md';

const Payment = () => {
    return (
        <li>
            <Link
                to="/profile/payment-method"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <MdOutlinePayment className="flex-shrink-0 w-10 sm:w-5 h-6 sm:h-5 text-gray-600  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-500" />
                <span className="text-sm flex-1 ml-3 whitespace-nowrap hidden sm:block transition-all duration-500">
                    Payment Method
                </span>
            </Link>
        </li>
    );
};

export default Payment;
