import Logout from './Logout';
import Avatar from './Avatar';
// ICONS
import { IoTrophyOutline } from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';
import { MdOutlinePayment } from 'react-icons/md';
import { MdMoveToInbox } from 'react-icons/md';
import { BiBuildingHouse } from 'react-icons/bi';
import { RiHistoryFill } from 'react-icons/ri';
import SidemenuItem from './SidemenuItem';
const SideMenu = () => {
    const items = [
        {
            id: 1,
            icon: IoTrophyOutline,
            content: 'Genuis Points',
            link: '/profile/genuis',
        },
        {
            id: 2,
            icon: BiUser,
            content: 'Personal Information',
            link: '/profile',
        },
        {
            id: 3,
            icon: MdOutlinePayment,
            content: 'Payment Method',
            link: '/profile/payment-method',
        },
        {
            id: 4,
            icon: MdMoveToInbox,
            content: 'Inbox',
            link: '/profile/inbox',
        },
        {
            id: 5,
            icon: BiBuildingHouse,
            content: 'Your properties',
            link: '/profile/properties',
        },
        {
            id: 6,
            icon: RiHistoryFill,
            content: 'History',
            link: '/profile/history',
        },
    ];
    return (
        <aside
            className="w-fit sm:min-w-max select-none border-r border-gray-100 transition-all"
            aria-label="Sidebar"
        >
            <Avatar />
            <div className="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
                <ul className="space-y-2">
                    {items.map((item) => {
                        return (
                            <SidemenuItem
                                key={item.id}
                                rLink={item.link}
                                icon={item.icon}
                                content={item.content}
                            />
                        );
                    })}
                    <Logout />
                </ul>
            </div>
        </aside>
    );
};

export default SideMenu;
