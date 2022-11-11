import { Link, useLocation } from 'react-router-dom';
const SidemenuItem = (props) => {
    const routeLinke = props.rLink;
    const Icon = props.icon;
    const itemContent = props.content;
    const location = useLocation();
    const activeItemStyle =
        'text-sm font-bold ml-0 sm:ml-2 rounded-lg text-gray-700 bg-gray-200 dark:bg-gray-700 transition-all transition-500';
    const itemStyle =
        'text-sm font-bold rounded-lg text-gray-700 opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transition-500';
    return (
        <li
            className={
                location.pathname === routeLinke ? activeItemStyle : itemStyle
            }
        >
            <Link
                to={routeLinke}
                className="flex items-center p-2 rounded-lg dark:text-white"
            >
                <Icon className="flex-shrink-0 w-10 sm:w-6 h-6 transition-all duration-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap hidden md:block transition-all duration-500">
                    {itemContent}
                </span>
            </Link>
        </li>
    );
};

export default SidemenuItem;
