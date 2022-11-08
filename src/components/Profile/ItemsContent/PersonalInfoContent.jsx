import { useEffect, useState, useRef } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { IoCheckmarkDone } from 'react-icons/io5';
import { FiEdit3 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './avatar.css';
import userPic from '../images/user-avatar.png';
import { MdOutlineFileUpload } from 'react-icons/md';

const PersonalInfoContent = () => {
    const auth = getAuth();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [changeDetails, setChangeDetails] = useState(false);
    const [photo, setPhoto] = useState(userPic);
    const changeState = () => {
        setChangeDetails((prevState) => !prevState);
    };
    // GET USER DATA
    const getUserData = async (userID) => {
        const docRef = doc(db, 'users', userID);
        const docSnapshot = await getDoc(docRef);
        setUserData(docSnapshot.data());
        setPhoto(docSnapshot.data().avatar);
        setIsLoading(false);
    };
    // UPLOAD IMAGE
    const profilePhoto = useRef(null);
    // UPLOAD IMAGE HANDLER
    const handleImageUpload = (e, uploadedImage, setPhoto) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                setPhoto(e.target.result);
                setUserData((prevState) => {
                    return {
                        ...prevState,
                        avatar: e.target.result,
                    };
                });
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        getUserData(auth.currentUser.uid);
    }, []);
    // S U B M I T
    const submitHandler = async () => {
        setChangeDetails((prevState) => !prevState);
        try {
            // EDIT USER DATA IN FIREBASE
            await updateProfile(auth.currentUser, {
                displayName: userData.username,
            });
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userRef, userData);
            toast.success('Changes saved successfully');
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };
    // SPINNER NEEDED
    return isLoading ? (
        <div className="container text-center py-12">
            <p className="text-3xl">Loading....</p>
        </div>
    ) : (
        <div className="px-10 py-5">
            <h2 className="text-3xl text-gray-800 mb-6 pb-3 border-b border-gray-200 dark:text-white">
                Personal Information
            </h2>
            <div className="text-end">
                <button
                    className=" text-cyan-600 cursor-pointer select-none text-md font-bold"
                    onClick={changeDetails ? submitHandler : changeState}
                >
                    {!changeDetails && (
                        <FiEdit3 className="text-xl mr-1 inline text-cyan-600" />
                    )}
                    {!changeDetails && 'Edit'}
                    {changeDetails && (
                        <IoCheckmarkDone className="text-xl mr-1 inline text-cyan-600" />
                    )}
                    {changeDetails && 'Save'}
                </button>
            </div>
            {/* UPLOAD AVATAR */}
            <div className="relative py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center border-b border-gray-100">
                <label
                    htmlFor="avatar"
                    className="w-full sm:w-44 font-medium text-lg  dark:text-white"
                >
                    Avatar
                </label>
                <div
                    className={`profile_photo block relative`}
                    style={{
                        backgroundImage: photo ? `url(${photo})` : '',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                >
                    <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        name="profile_photo"
                        multiple={false}
                        ref={profilePhoto}
                        className={'image_input'}
                        onChange={(e) =>
                            handleImageUpload(e, profilePhoto, setPhoto)
                        }
                    />
                    <div
                        className={`circleuser_image_container`}
                        onClick={() => profilePhoto.current.click()}
                    >
                        {changeDetails && (
                            <div
                                className={
                                    'upload_content absolute bottom-0 right-0 cursor-pointer'
                                }
                            >
                                <MdOutlineFileUpload className="w-10 h-10 rounded-full p-2 text-cyan-600 bg-gray-100 upload-icon" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* EMAIL */}
            <div className="relative py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center border-b border-gray-100">
                <label
                    htmlFor="email"
                    className="w-full sm:w-44 font-medium text-lg  dark:text-white"
                >
                    Email
                </label>
                <input
                    disabled
                    id="email"
                    type="text"
                    value={userData.email}
                    className={`border-0 text-gray-500 text-base rounded-sm focus:ring-transparent focus:border-transparent block w-full py-2.5 px-1 dark:placeholder-gray-400 dark:text-white`}
                />
            </div>
            {/* USER NAME */}
            <div className="relative py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center border-b border-gray-100">
                <label
                    htmlFor="username"
                    className="w-full sm:w-44 font-medium text-lg  dark:text-white"
                >
                    Username
                </label>
                <input
                    disabled={!changeDetails}
                    id="username"
                    type="text"
                    value={userData.username}
                    onChange={(e) => {
                        setUserData((prevState) => {
                            return {
                                ...prevState,
                                username: e.target.value,
                            };
                        });
                    }}
                    className={`${
                        changeDetails ? 'bg-gray-100' : ''
                    } border-0 text-gray-500 text-base rounded-sm focus:ring-transparent focus:border-transparent block w-full py-2.5 px-1 dark:placeholder-gray-400 dark:text-white`}
                />
            </div>
            {/* BIO */}
            <div className="relative py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center border-b border-gray-100">
                <label
                    htmlFor="bio"
                    className="w-full sm:w-44 font-medium text-lg  dark:text-white"
                >
                    Bio
                </label>
                <textarea
                    id="bio"
                    disabled={!changeDetails}
                    value={userData.bio}
                    onChange={(e) => {
                        setUserData((prevState) => {
                            return {
                                ...prevState,
                                bio: e.target.value,
                            };
                        });
                    }}
                    rows="3"
                    className={`${
                        changeDetails ? 'bg-gray-100' : ''
                    } resize-none text-base h-fit border-0 text-gray-500 rounded-sm focus:ring-transparent focus:border-transparent block w-full py-2.5 px-1 dark:placeholder-gray-400 dark:text-white`}
                    placeholder="Your Bio..."
                ></textarea>
            </div>
            {/* PHONE */}
            <div className="relative py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center">
                <label
                    htmlFor="phone"
                    className="w-full sm:w-44 font-medium text-lg dark:text-white"
                >
                    Phone
                </label>
                <input
                    disabled={!changeDetails}
                    id="phone"
                    type="text"
                    value={userData.phone}
                    onChange={(e) => {
                        setUserData((prevState) => {
                            return {
                                ...prevState,
                                phone: e.target.value,
                            };
                        });
                    }}
                    className={`${
                        changeDetails ? 'bg-gray-100' : ''
                    } border-0 text-gray-500 text-base rounded-sm focus:ring-transparent focus:border-transparent block w-full py-2.5 px-1 dark:placeholder-gray-400 dark:text-white`}
                />
            </div>
        </div>
    );
};

export default PersonalInfoContent;
