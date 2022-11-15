import { HiOutlineLocationMarker } from 'react-icons/hi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { useState } from 'react';
import ModalRequest from './MadalRequest';
const Request = (props) => {
    const [type, setType] = useState('');
    const [showModal, setShowModal] = useState(false);
    const onClickTour = () => {
        setShowModal(true);
        setType('tour');
    };
    const onClickApply = () => {
        setShowModal(true);
        setType('apply');
    };
    const onClose = (close) => {
        setShowModal(close);
    };
    const [addToFav, setAddToFav] = useState(false);
    return (
        <>
            <div className="flex items-center justify-between">
                <p className="text-4xl font-bold mb-3 text-stone-900">
                    {props.data.price}{' '}
                    <span className="font-normal text-cyan-600 text-base">
                        EGP/MO
                    </span>
                </p>
                <p>
                    {addToFav ? (
                        <AiFillHeart
                            className="inline text-red-600 text-2xl cursor-pointer"
                            onClick={() =>
                                setAddToFav((prevState) => !prevState)
                            }
                        />
                    ) : (
                        <AiOutlineHeart
                            className="inline text-red-600 text-2xl cursor-pointer"
                            onClick={() =>
                                setAddToFav((prevState) => !prevState)
                            }
                        />
                    )}
                </p>
            </div>
            <div className="flex items-center mb-2">
                <BsDot className="mr-2" />
                <p className="text-stone-900">{props.data.name}</p>
            </div>
            <div className="flex items-center mb-4">
                <HiOutlineLocationMarker className="mr-2" />
                <p className="text-stone-900">{props.data.address}</p>
            </div>
            <div className="buttons flex  space-x-3 ">
                <button
                    onClick={onClickTour}
                    href="#"
                    className="inline-flex items-center rounded-lg bg-cyan-600 py-3 px-10 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-cyan-800 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800"
                >
                    Request a tour
                </button>
                <button
                    onClick={onClickApply}
                    href="#"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-3 px-10 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                    Request to apply
                </button>
                <ModalRequest
                    type={type}
                    show={showModal}
                    close={onClose}
                    hostID={props.data.hostID}
                />
            </div>
        </>
    );
};

export default Request;
