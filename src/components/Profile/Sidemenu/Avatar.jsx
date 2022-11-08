import userPic from '../images/user-avatar.png';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase.config';
const Avatar = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [joinDate, setJoinDate] = useState('');
    const getUserData = async (userID) => {
        const docRef = doc(db, 'users', userID);
        const docSnapshot = await getDoc(docRef);
        setUserData(docSnapshot.data());
        setJoinDate(
            new Date(docSnapshot.data().timestamp.seconds * 1000).toDateString()
        );
    };
    useEffect(() => {
        const auth = getAuth();
        getUserData(auth.currentUser.uid);
    }, []);
    return (
        <div
            className="p-3 cursor-pointer"
            onClick={() => navigate('/profile/')}
        >
            <div className="flex gap-0 sm:gap-2 justify-center">
                <img
                    className="w-10 h-10 object-cover rounded-full transition-all duration-500"
                    src={userData ? userData.avatar : userPic}
                    alt="profile"
                />
                <div className="font-medium text-lg dark:text-white hidden sm:block transition-all duration-500">
                    <div className="dark:text-white text-center">
                        {userData ? userData.username : ''}
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
