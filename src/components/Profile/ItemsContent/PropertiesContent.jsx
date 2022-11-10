import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PropertyCard from './propertyCard';
import RentalCard from '../../Rental/RentalList/RentalCard';
import { db } from '../../../firebase.config';
import {
    collection,
    getDocs,
    query,
    where,
    limit,
    startAfter,
    connectFirestoreEmulator,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const PropertiesContent = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);
    const [propertiesId, setPropertiesId] = useState(
        userData ? userData.properties : []
    );
    const [properties, setProperties] = useState([]);
    // GET DATA
    const getProperties = async () => {
        try {
            const listRef = collection(db, 'rentals');
            const q = query(listRef, limit(10));
            const querySnap = await getDocs(q);
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
    useEffect(() => {
        setPropertiesId(userData.properties);
        // getProperties();
    }, [userData]);
    return (
        <section className="px-5 sm:px-10 py-5">
            <h2 className="text-4xl font-bold mb-6 text-cyan-600 w-fit mx-auto lg:mx-0">
                Your Properties
            </h2>
            <p className=" font-bold text-gray-500 w-fit mx-auto lg:mx-0 mb-6 text-xl">
                Total properties : {properties.length}
            </p>
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
            {properties.length > 0 && (
                <div className="flex flex-wrap lg:flex-nowrap justify-start gap-10 items-start">
                    {properties.map((property) => {
                        return (
                            <PropertyCard key={property.id} list={property} />
                        );
                    })}
                </div>
            )}
        </section>
    );
};
export default PropertiesContent;
