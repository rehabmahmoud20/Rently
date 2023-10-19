import { useState } from 'react';
// *form
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
// *libraries
import Select from 'react-select';
import { Carousel } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userActions } from '../Store/user';
// *Auth
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// *firbase sending all data
import { db } from '../../firebase.config';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    serverTimestamp,
    getDoc,
    updateDoc,
} from 'firebase/firestore';

// rental options
const options = [
    { value: 'House', label: 'House' },
    { value: 'Appartment', label: 'Appartment' },
];

const AddRental = () => {
    const [images, setImages] = useState([]);
    const [gender, genderShow] = useState(false);
    const [separateRooms, setseparateRooms] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const convertToBase64 = (e) => {
        const images = [],
            fileReaders = [];
        const { files } = e.target;
        const myfilesArr = Array.from(files);
        if (myfilesArr.length) {
            myfilesArr.forEach((file) => {
                const fileReader = new FileReader(); //create file reader for each image
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result); //[] of  base 64 for each image
                    }
                    if (images.length === myfilesArr.length) {
                        setImages(images);
                    }
                };
                fileReader.readAsDataURL(file);
            });
        }
    };

    // & update the user data upon adding rental
    const updateUserData = async (rentalId) => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        // get the user data
        const usersData = await getDoc(userRef);
        // update the user data
        const { properties } = usersData.data();
        await updateDoc(userRef, {
            ...usersData.data(),
            properties: [...properties, rentalId],
        });
        dispatch(
            userActions.updateUserData({
                ...usersData.data(),
                properties: [...properties, rentalId],
            })
        );
        navigate('/rental-list');
    };
    // & send the user data upon adding rental
    const sendData = async (data) => {
        const {
            area,
            AvailableRooms,
            alevator,
            floor,
            furnashed,
            parking,
            pet,
            Price,
            Rooms,
            gender,
            address,
            wifi,
            availableDate,
            bathroom,
            insurance,
            airConditioner,
            rentalName,
            rentalType,
        } = data;
        //   timestamp: new Date().toDateString(),
        let newDate = new Date(availableDate).toDateString();
        const dataCopy = {
            name: rentalName,
            overview: 'naser city',
            address,
            insurance: +insurance,
            price: +Price,
            hostID: auth.currentUser.uid,
            images: images,
            location: { lng: 29.97773, lat: 31.25526 },
            aboutRental: {
                area,
                gender: gender || null,
                availableDate,
                availableRooms: +AvailableRooms,
                bathroom,
                floor: +floor,
                rooms: +Rooms,
                separateRooms: separateRooms,
                type: rentalType,
            },
            features: {
                airConditioner,
                alevator,
                furnashed,
                parking,
                pet,
                wifi,
            },
            policy: {
                info: ' sit amet consectetur adipisicing elit. Maxime mollitia,molestiae',
                rules: [
                    'Available months 6, 12',
                    'This property only accepts cash payments.',
                    'Available for students',
                    'Pets are not allowed',
                ],
            },
            reviews: [
                {
                    rate: 5,
                    clientID: '',
                    feeedback:
                        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups',
                    timestamp: '',
                },
            ],
        };
        const collecRef = collection(db, 'rentals');
        try {
            const docRef = await addDoc(collecRef, dataCopy);
            const { id } = docRef;
            updateUserData(id);
            toast.success('data is sent');
        } catch (error) {
            toast.error('data is is not sent');
        }
    };
    const handlechange = (e) => {
        convertToBase64(e);
    };
    // handle separate rooms
    const handleSeprateRoomsChange = (e) => {
        if (e.target.checked === true) {
            setseparateRooms(true);
            genderShow(true);
        } else {
            genderShow(false);
        }
    };

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onChange' });
    return (
        <section className="container mx-auto py-12">
            <form
                onSubmit={handleSubmit((data) => {
                    sendData(data);
                    reset();
                })}
            >
                <section className="about-rental">
                    <h2 className=" mb-6 text-3xl text-cyan-600">
                        Rental information
                    </h2>
                    <div className="p-8 mb-20 shadow-lg shadow-gray-300 rounded-2xl">
                        <div className="grid md:grid-cols-2 md:gap-10">
                            {/* RENTAL NAME */}
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    name="rentalName"
                                    id="floating_text"
                                    placeholder=" "
                                    className="my-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                    {...register('rentalName', {
                                        required: 'This is required',
                                    })}
                                />
                                {errors.rentalName?.type === 'required' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.rentalName.message}
                                    </p>
                                )}
                                <label
                                    htmlFor="floating_text"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Rental name
                                </label>
                            </div>
                            {/* adress */}
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    name="address"
                                    id="floating_address"
                                    className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                    placeholder=" "
                                    {...register('address', {
                                        required: 'This is required',
                                    })}
                                />
                                {errors.address?.type === 'required' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.address.message}
                                    </p>
                                )}
                                <label
                                    htmlFor="floating_address"
                                    className="text-red-600  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    address
                                </label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-10">
                            {/* insurance */}
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    name="insurance"
                                    id="floating_insurance"
                                    className="block mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                    placeholder=" "
                                    {...register('insurance', {
                                        required: 'This is required',
                                    })}
                                />
                                {errors.insurance?.type === 'required' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.insurance.message}
                                    </p>
                                )}
                                <label
                                    htmlFor="floating_adress"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    insurance
                                </label>
                            </div>
                            {/* Price */}
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    name="Price"
                                    id="floating_Price"
                                    className="block mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                    placeholder=" "
                                    {...register('Price', {
                                        required: 'This is required',
                                    })}
                                />
                                {errors.Price?.type === 'required' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.Price.message}
                                    </p>
                                )}
                                <label
                                    htmlFor="floating_adress"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Price
                                    <span className="text-cyan-600 ml-2 inline-block">
                                        EGP
                                    </span>{' '}
                                    /Month
                                </label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-10 mb-2">
                            {/* rental select type */}
                            <div>
                                <label className="text-sm text-gray-500 ">
                                    Rental type
                                </label>
                                <Controller
                                    name="rentalType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={options}
                                            className="my-4 text-cyan-600 "
                                        />
                                    )}
                                />
                            </div>

                            {/* date */}
                            <div className="relative ">
                                <label className="text-sm text-gray-500 ">
                                    Available date
                                </label>
                                <input
                                    type="date"
                                    name="availableDate"
                                    className="my-4   border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full   p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-600 dark:focus:border-cyan-600 datepicker-input"
                                    placeholder="Select date"
                                    {...register('availableDate', {
                                        required: 'This is required',
                                    })}
                                />
                                {errors.availableDate?.type === 'required' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.availableDate.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                {/* ===================================================== rental features ================================================ */}
                <h2 className=" mb-6 text-3xl text-cyan-600 ">
                    Rental features
                </h2>
                <div className="p-8 mb-24 shadow-lg shadow-gray-300 rounded-2xl">
                    <div className="grid md:grid-cols-2 md:gap-10">
                        {/* Area */}
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                type="text"
                                name="area"
                                id="floating_area"
                                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                placeholder=" "
                                {...register('area', {
                                    required: 'This is required',
                                })}
                            />
                            {errors.area?.type === 'required' && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.area.message}
                                </p>
                            )}
                            <label
                                htmlFor="floating_area"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Area
                                <span className="text-cyan-600 ml-2 inline-block">
                                    m<sup>2</sup>
                                </span>
                            </label>
                        </div>
                        {/* bathroom */}
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                type="text"
                                name="bathroom"
                                id="floating_bathroom"
                                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                placeholder=" "
                                {...register('bathroom', {
                                    required: 'This is required',
                                })}
                            />
                            {errors.bathroom?.type === 'required' && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.bathroom.message}
                                </p>
                            )}
                            <label
                                htmlFor="floating_bathroom"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Bathrooms
                            </label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 md:gap-10">
                        {/* Rooms */}
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                type="number"
                                name="Rooms"
                                min={1}
                                id="floating_Rooms"
                                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                placeholder=" "
                                {...register('Rooms', {
                                    required: 'This is required',
                                })}
                            />
                            {errors.Rooms?.type === 'required' && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.Rooms.message}
                                </p>
                            )}
                            <label
                                htmlFor="floating_Rooms"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Rooms
                            </label>
                        </div>
                        {/* Available-rooms */}
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                type="number"
                                name="AvailableRooms"
                                id="floating_Available-rooms"
                                min={1}
                                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                placeholder=" "
                                {...register('AvailableRooms', {
                                    required: 'This is required',
                                })}
                            />
                            {errors.AvailableRooms?.type === 'required' && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.AvailableRooms.message}
                                </p>
                            )}

                            <label
                                htmlFor="floating_Available-rooms"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Available-rooms
                            </label>
                        </div>
                        {/* Floor */}
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                type="number"
                                name="floor"
                                id="floating_Floor"
                                min={1}
                                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                placeholder=" "
                                {...register('floor', {
                                    required: 'This is required',
                                })}
                                {...register('floor', {
                                    required: 'This is required',
                                    max: {
                                        value: 30,
                                        message: 'Highest floor is 30',
                                    },
                                })}
                            />
                            {errors.floor?.type === 'required' && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.floor.message}
                                </p>
                            )}
                            {errors.Floor?.type === 'max' && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors.Floor.message}
                                </p>
                            )}
                            <label
                                htmlFor="floating_Floor"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Floor
                            </label>
                        </div>
                    </div>
                    {/* </div> */}

                    {/* </section> */}
                    {/* ===================================================== rental Features ================================================ */}
                    <div className="separate-rooms grid md:grid-cols-2 md:gap-10 mb-5">
                        {/* separate rooms */}
                        <div className="flex items-center my-4">
                            <input
                                id="separateRooms"
                                type="checkbox"
                                value=""
                                name="separateRooms"
                                onChange={handleSeprateRoomsChange}
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                            />
                            <label
                                htmlFor="separateRooms"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Separate rooms
                            </label>
                        </div>
                        {/* gender */}
                        {gender ? (
                            <div className="gender flex items-center ">
                                <label className="text-sm text-gray-500 mr-6">
                                    Gender
                                </label>
                                <div className="flex items-center">
                                    {/* male */}
                                    <div className="flex items-center  ">
                                        <input
                                            id="male"
                                            type="radio"
                                            value="male"
                                            name="gender"
                                            className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                                            {...register('gender')}
                                        />
                                        <label
                                            htmlFor="male"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Male
                                        </label>
                                    </div>

                                    {/* f e m a l e */}
                                    <div className=" ml-10 flex items-center ">
                                        <input
                                            id="female"
                                            type="radio"
                                            value="female"
                                            name="gender"
                                            className=" w-4  bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                                            {...register('gender')}
                                        />
                                        <label
                                            htmlFor="female"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="grid md:grid-cols-4 md:gap-10 mb-5">
                        {/* air conditioner */}
                        <div className="flex items-center my-4">
                            <input
                                id="air-conditioner"
                                type="checkbox"
                                value=""
                                name="airConditioner"
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                                {...register('airConditioner')}
                            />
                            <label
                                htmlFor="air-conditioner"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Air conditioner
                            </label>
                        </div>
                        {/* Elevator */}
                        <div className="flex items-center my-4">
                            <input
                                id="alevator"
                                type="checkbox"
                                value=""
                                name="alevator"
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                                {...register('alevator')}
                            />
                            <label
                                htmlFor="alevator"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Elevator
                            </label>
                        </div>
                        {/* Furnashed */}
                        <div className="flex items-center my-4">
                            <input
                                id="furnashed"
                                type="checkbox"
                                value=""
                                name="furnashed"
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                                {...register('furnashed')}
                            />
                            <label
                                htmlFor="furnashed"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                furnashed
                            </label>
                        </div>

                        {/* Parking */}
                        <div className="flex items-center my-4">
                            <input
                                id="parking"
                                type="checkbox"
                                value=""
                                name="parking"
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                                {...register('parking')}
                            />
                            <label
                                htmlFor="parking"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Parking
                            </label>
                        </div>
                        {/* Pet */}
                        <div className="flex items-center my-4">
                            <input
                                id="pet"
                                type="checkbox"
                                value=""
                                name="pet"
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                                {...register('pet')}
                            />
                            <label
                                htmlFor="pet"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                pet
                            </label>
                        </div>
                        {/* WIFI */}
                        <div className="flex items-center my-4">
                            <input
                                id="wifi"
                                name="wifi"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                                {...register('wifi')}
                            />
                            <label
                                htmlFor="wifi"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                wifi
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-10 p-8 mb-24 shadow-lg shadow-gray-300 rounded-2xl items-center">
                    {/* images */}

                    <div className="relative z-0 mb-6  group  ">
                        <label
                            className="text-sm text-gray-500  "
                            htmlFor="file_input"
                        >
                            Upload rental photos
                        </label>
                        <input
                            className="mt-4 w-50 lg:w-full block  text-sm text-gray-900 bg-cyan-600 rounded-lg   hover:bg-cyan-700 text-white cursor-pointer dark:text-gray-400 focus:outline-none  dark:placeholder-gray-400"
                            id="file_input"
                            type="file"
                            name="images"
                            accept="image/*"
                            max="5"
                            multiple
                            onChange={handlechange}
                        />
                    </div>
                    {images.length > 0 && (
                        <Carousel
                            slide={false}
                            className="change-carousel w-3/4"
                        >
                            {images.map((image, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        <img
                                            src={image}
                                            alt="image"
                                            className="h-full"
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </Carousel>
                    )}
                </div>

                <div className="  mx-auto w-fit">
                    <button
                        type="submit"
                        className=" text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-3 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2 text-center "
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddRental;
