import userPic from '../images/user-avatar.png';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Avatar = () => {
    const [imgSrc, setImgSrc] = useState(userPic);
    const [username, setUsername] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = getAuth();
        const creationDate = new Date(
            auth.currentUser.metadata.creationTime
        ).toDateString();
        console.log(creationDate);
        auth.currentUser.photoURL && setImgSrc(auth.currentUser.photoURL);
        setUsername(auth.currentUser.displayName);
        setJoinDate(creationDate);
    }, []);
    return (
        <div
            className="p-3 cursor-pointer"
            onClick={() => navigate('/profile/')}
        >
            <div className="flex gap-0 sm:gap-2 justify-center">
                <img
                    className="w-10 h-10 object-cover rounded-full transition-all duration-500"
                    src={imgSrc}
                    alt="profile"
                />
                <div className="font-medium text-lg dark:text-white hidden sm:block transition-all duration-500">
                    <div className="dark:text-white text-center">
                        {username}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-300">
                        Joined in : {joinDate}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
