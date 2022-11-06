import userPic from '../images/user.jpg';
const Avatar = () => {
    return (
        <div className="p-3">
            <div className="flex flex-wrap gap-2">
                <img
                    className="w-10 h-10 rounded-full transition-all duration-500"
                    src={userPic}
                    alt="profile"
                />
                <div className="font-medium text-lg dark:text-white hidden sm:block transition-all duration-500">
                    <div className="dark:text-white">Jese Leos</div>
                    <div className="text-xs text-gray-400 dark:text-gray-300">
                        Joined in August 2014
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
