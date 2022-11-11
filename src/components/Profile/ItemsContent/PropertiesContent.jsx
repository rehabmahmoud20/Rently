import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { userActions } from '../../Store/user';
import { Modal, Button } from 'flowbite-react';
import PropertyCard from './propertyCard';
import { db } from '../../../firebase.config';
import {
    collection,
    getDocs,
    query,
    deleteDoc,
    updateDoc,
    limit,
    doc,
    getDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdModeEdit, MdDelete } from 'react-icons/md';
const PropertiesContent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // DATA STATES
    const userData = useSelector((state) => state.user.userData);
    const [propertiesId, setPropertiesId] = useState(
        userData ? userData.properties : []
    );
    const [properties, setProperties] = useState([]);
    // DELETE STATES
    const [showModal, setShowModal] = useState(false);
    const [reqId, setReqId] = useState('');
    // GET DATA
    const getProperties = async () => {
        try {
            const listRef = collection(db, 'rentals');
            const querySnap = await getDocs(query(listRef, limit(10)));
            const rents = [];
            querySnap.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                propertiesId.includes(data.id) && rents.push(data);
                setProperties(rents);
            });
        } catch (error) {
            toast.error('Something went wrong !');
        }
    };
    // EDIT HANDLER
    const editHandler = (id) => {
        console.log(id);
    };
    // DELETE HANDLER
    const deleteHandler = async (id) => {
        try {
            const userRef = doc(db, 'users', userData.id);
            await updateDoc(userRef, {
                ...userData,
                properties: propertiesId.filter((s) => s !== id),
            });
            const docRef = doc(db, 'rentals', id);
            await deleteDoc(docRef);
            dispatch(
                userActions.updateUserData({
                    ...userData,
                    properties: propertiesId.filter((s) => s !== id),
                })
            );
            setShowModal(false);
            toast.success('Property Deleted Successfully !');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong !');
        }
    };
    useEffect(() => {
        userData && setPropertiesId(userData.properties);
        getProperties();
    }, [userData]);
    return (
        <section className="px-5 sm:px-10 py-5">
            <h2 className="text-4xl font-bold mb-6 text-cyan-600 w-fit mx-auto lg:mx-0">
                Your Properties
            </h2>
            <p className=" font-bold text-gray-500 w-fit mx-auto lg:mx-0 mb-6 text-xl">
                Total properties : {properties.length}
            </p>
            {/* NO RENTALS ADDED */}
            {properties.length === 0 && (
                <div className="text-center">
                    <p className=" text-gray-500 text-center mb-3 text-lg">
                        You have not added any property yet
                    </p>
                    <button
                        onClick={() => {
                            navigate('/add-rental');
                        }}
                        className="text-white bg-cyan-600 block w-fit mx-auto mb-1 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-8 py-2.5 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800 transition-all transition-500"
                    >
                        List Your Property
                    </button>
                    <img
                        className="w-fit max-w-full mx-auto"
                        src={require('../images/add-prop.gif')}
                        alt="no properties added"
                    />
                </div>
            )}
            {/* RENDER USER RENTALS */}
            {properties.length > 0 && (
                <div className="flex flex-wrap lg:flex-nowrap justify-start gap-10 items-start">
                    {properties.map((property) => {
                        return (
                            <div
                                key={property.id}
                                className="w-full lg:w-1/2 relative"
                            >
                                <PropertyCard list={property} />
                                {/* EDIT & DELETE */}
                                <div className="absolute flex gap-2 top-4 right-4">
                                    <span
                                        onClick={() => {
                                            editHandler(property.id);
                                        }}
                                        title="Edit"
                                        className="bg-white rounded-full p-2 cursor-pointer opacity-50 hover:opacity-100 transition transition-500"
                                    >
                                        <MdModeEdit className="text-cyan-600 text-xl" />
                                    </span>
                                    <span
                                        onClick={() => {
                                            setShowModal(true);
                                            setReqId(property.id);
                                        }}
                                        title="Delete"
                                        className="bg-white rounded-full p-2 cursor-pointer opacity-50 hover:opacity-100 transition transition-500"
                                    >
                                        <MdDelete className="text-cyan-600 text-xl" />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    {/* CONFIRM MODAL */}
                    <Modal
                        show={showModal}
                        size="md"
                        popup={true}
                        onClose={() => {
                            setShowModal(false);
                        }}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this
                                    Property?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => {
                                            deleteHandler(reqId);
                                        }}
                                    >
                                        Yes, I'm sure
                                    </Button>
                                    <Button
                                        className="text-white"
                                        color="gray"
                                        onClick={() => {
                                            setShowModal(false);
                                        }}
                                    >
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )}
        </section>
    );
};
export default PropertiesContent;
