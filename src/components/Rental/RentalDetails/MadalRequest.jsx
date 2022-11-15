import { Modal, Label, TextInput, Checkbox } from 'flowbite-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../Store/user';
import { useEffect } from 'react';
const ModalRequest = (props) => {
    const userData = { ...useSelector((state) => state.user.userData) };
    const [hostData, setHostData] = useState(null);
    const auth = getAuth();
    const prams = useParams();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        reset,
    } = useForm();
    const onSubmit = async (data) => {
        // REQUEST OBJECT
        if (!auth.currentUser) {
            toast.error('Sign in to be able to send a request');
            closeModal();
            return;
        }
        const requestDetails = {
            name: auth.currentUser.displayName,
            email: data.email,
            phone: data.phone,
            message: data.message,
            type: props.type,
            clientID: auth.currentUser.uid,
            rentalID: prams.id,
            date: data.date,
            timeStamp: new Date().toDateString(),
        };
        try {
            // ADD REQUEST IN FIREBASE "IN CLIENT HISTORY"
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userRef, {
                ...userData,
                history: [
                    ...userData.history,
                    {
                        sentAt: requestDetails.timeStamp,
                        rentalID: requestDetails.rentalID,
                        type: requestDetails.type,
                    },
                ],
            });
            // UPDATE STORE
            dispatch(
                userActions.updateUserData({
                    ...userData,
                    history: [
                        ...userData.history,
                        {
                            sentAt: requestDetails.timeStamp,
                            rentalID: requestDetails.rentalID,
                            type: requestDetails.type,
                        },
                    ],
                })
            );
            // ADD REQUEST IN HOST REQUESTS
            const hostRef = doc(db, 'users', props.hostID);
            const hostData = await getDoc(doc(db, 'users', props.hostID));
            await updateDoc(hostRef, {
                ...hostData.data(),
                requests: [...hostData.data().requests, requestDetails],
            });
            reset();
            toast.success('Your request has been sent successfully');
            closeModal();
            console.log(hostData.data());
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong !');
        }
    };
    const closeModal = () => {
        props.close(false);
    };
    return (
        <Modal show={props.show} size="md" popup={true} onClose={closeModal}>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    {props.type === 'tour' && (
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Request a tour
                        </h3>
                    )}
                    {props.type === 'apply' && (
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Request to apply
                        </h3>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="relative z-0 mb-10 w-full group">
                                <label className="text-sm text-gray-500 ">
                                    Select a date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                    placeholder="Select date"
                                    {...register('date', {
                                        required: 'This is required',
                                    })}
                                />
                                {errors.date?.type === 'required' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.date.message}
                                    </p>
                                )}
                            </div>
                            <div className="relative z-0 mb-10 w-full group">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="on"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                    placeholder=" "
                                    {...register('email', {
                                        required: true,
                                        pattern:
                                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    })}
                                />
                                <label
                                    htmlFor="email"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email
                                </label>
                                {/* V A L I D A T I O N */}
                                {errors.email?.type === 'required' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        Email is required.
                                    </p>
                                )}
                                {errors.email?.type === 'pattern' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        Please enter a valid email.
                                    </p>
                                )}
                            </div>
                            <div className="relative z-0 mb-10 w-full group">
                                <input
                                    type="phone"
                                    name="phone"
                                    id="phone"
                                    autoComplete="on"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                    placeholder=" "
                                    {...register('phone', { required: true })}
                                />
                                <label
                                    htmlFor="phone"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Phone Number
                                </label>
                                {/* V A L I D A T I O N */}
                                {errors.phone?.type === 'required' && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        Phone number is required.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="message"
                                    value="Add a message"
                                />
                            </div>
                            <TextInput
                                id="message"
                                type="text"
                                sizing="md"
                                {...register('message')}
                            />
                        </div>
                        <div className="w-full">
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-cyan-600 py-3 px-10 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-cyan-800 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800"
                            >
                                Send your request
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalRequest;
