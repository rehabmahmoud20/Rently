import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { userActions } from '../../Store/user';
import { Modal, Button } from 'flowbite-react';
import PropertyCard from './propertyCard';
import Spinner from '../../Shared/Spinner';
import { db } from '../../../firebase.config';
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdModeEdit, MdDelete } from 'react-icons/md';
const PropertiesContent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // DATA STATES
    const [propertiesId, setPropertiesId] = useState([]);
    const [properties, setProperties] = useState([]);
    // DELETE STATES
    const [showModal, setShowModal] = useState(false);
    const [reqId, setReqId] = useState('');
    // GET DATA
    const getProperties = () => {
        let rents = props.rentalsData;
        setPropertiesId(props.userData.properties);
        rents = rents.filter((rent) => {
            return props.userData.properties.includes(rent.id) && rent;
        });
        setProperties(rents);
    };
    // EDIT HANDLER
    const editHandler = (id) => {
        navigate(`/profile/edit-rental/${id}`);
    };
    // DELETE HANDLER
    const deleteHandler = async (id) => {
        try {
            const userRef = doc(db, 'users', props.userData.id);
            await updateDoc(userRef, {
                ...props.userData,
                properties: propertiesId.filter((s) => s !== id),
            });
            const docRef = doc(db, 'rentals', id);
            await deleteDoc(docRef);
            dispatch(
                userActions.updateUserData({
                    ...props.userData,
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
        props.userData && setPropertiesId(props.userData.properties);
        props.rentalsData && getProperties();
    }, [props.userData, props.rentalsData]);
    return (
        <section className="px-5 sm:px-10 py-5">
            <h2 className="text-4xl font-bold mb-6 text-cyan-600 w-fit mx-auto lg:mx-0">
                Your Properties
            </h2>
            <p className=" font-bold text-gray-500 w-fit mx-auto lg:mx-0 mb-6 text-xl">
                Total properties : {properties.length}
            </p>
            {/* NO RENTALS ADDED */}
            {props.rentalsData && properties.length === 0 && (
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
                <div className="flex flex-wrap cards-cont justify-start gap-10 items-start overflow-y-auto max-h-screen">
                    {properties.map((property) => {
                        return (
                            <div
                                key={property.id}
                                className="w-full lg:w-2/5 relative"
                            >
                                <PropertyCard list={property} />
                                {/* EDIT & DELETE */}
                                <div className="absolute flex gap-2 top-4 right-4">
                                    <span
                                        onClick={() => {
                                            editHandler(property.id);
                                        }}
                                        title="Edit"
                                        className="bg-white rounded-full p-2 cursor-pointer transition transition-500"
                                    >
                                        <MdModeEdit className="text-cyan-600 text-xl" />
                                    </span>
                                    <span
                                        onClick={() => {
                                            setShowModal(true);
                                            setReqId(property.id);
                                        }}
                                        title="Delete"
                                        className="bg-white rounded-full p-2 cursor-pointer transition transition-500"
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
            {!props.rentalsData && <Spinner />}
        </section>
    );
};
export default PropertiesContent;
