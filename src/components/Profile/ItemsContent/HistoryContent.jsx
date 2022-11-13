import { useEffect, useState } from 'react';
import PropertyCard from './propertyCard';
import Spinner from '../../Shared/Spinner';
import { useNavigate } from 'react-router-dom';
const HistoryContent = (props) => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const getRental = () => {
        const findReq = [];
        props.userData.history.forEach((req) => {
            props.rentalsData.forEach((rental) => {
                rental.id === req.rentalID &&
                    findReq.push({
                        ...rental,
                        reqType: req.type,
                        sentAt: req.sentAt,
                    });
            });
            setProperties(findReq);
            return findReq;
        });
    };
    useEffect(() => {
        props.rentalsData && props.userData && getRental();
    }, [props.userData, props.rentalsData]);
    return (
        <section className="px-5 sm:px-10 py-5">
            <h2 className="text-4xl font-bold mb-6 text-cyan-600 w-fit mx-auto lg:mx-0">
                History
            </h2>
            <p className=" font-bold text-gray-500 w-fit mx-auto lg:mx-0 mb-6 text-xl">
                Total Requests : {properties.length}
            </p>
            {/* NO RENTALS ADDED */}
            {props.rentalsData && properties.length === 0 && (
                <div className="text-center">
                    <p className=" text-gray-500 text-center mb-3 text-lg">
                        You have not sent any request yet
                    </p>
                    <button
                        onClick={() => {
                            navigate('/rental-list');
                        }}
                        className="text-white bg-cyan-600 block w-fit mx-auto mb-1 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-8 py-2.5 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800 transition-all transition-500"
                    >
                        Explore now
                    </button>
                    <img
                        className="w-fit max-w-full mx-auto"
                        src={require('../images/request.gif')}
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
                                key={property.id + property.reqType}
                                className="w-full lg:w-2/5 relative"
                            >
                                <h3 className="text-sm mb-1 text-gray-500 text-center">
                                    You requested {property.reqType} at{' '}
                                    {property.sentAt}
                                </h3>
                                <PropertyCard list={property} />
                            </div>
                        );
                    })}
                </div>
            )}
            {!props.rentalsData && <Spinner />}
        </section>
    );
};
export default HistoryContent;
