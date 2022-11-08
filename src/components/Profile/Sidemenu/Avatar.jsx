import userPic from '../images/user-avatar.png';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
const Avatar = () => {
    const [imgSrc, setImgSrc] = useState(userPic);
    useEffect(() => {
        const auth = getAuth();
        auth.currentUser.photoURL && setImgSrc(auth.currentUser.photoURL);
    }, []);
    return (
        <div className="p-3">
            <div className="flex flex-wrap gap-2">
                <img
                    className="w-10 h-10 object-cover rounded-full transition-all duration-500"
                    src={imgSrc}
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
