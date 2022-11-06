import PersonalInfo from './PersonalInfo';
import GenunisPoints from './GenunisPoints';
import Payment from './Payment';
import Inbox from './Inbox';
import Properties from './Properties';
import History from './History';
import Logout from './Logout';
import DeleteUser from './DeleteUser';
import Avatar from './Avatar';
const SideMenu = () => {
    return (
        <aside
            className="h-screen w-fit sm:min-w-max select-none shadow-lg shadow-zinc-400 transition-all"
            aria-label="Sidebar"
        >
            <Avatar />
            <div className="overflow-y-auto py-4 px-3rounded dark:bg-gray-800">
                <ul className="space-y-2">
                    <GenunisPoints />
                    <PersonalInfo />
                    <Inbox />
                    <Payment />
                    <Properties />
                    <History />
                    <Logout />
                    <DeleteUser />
                </ul>
            </div>
        </aside>
    );
};

export default SideMenu;
