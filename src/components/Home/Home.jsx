// C O M P O N E N T S
import { React, useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebase.config';
// I C O N S
import { toast } from 'react-toastify';
// S E C T I O N S
import WhyUs from './WhyUs';
import HomeHero from './HomeHero';
import Services from './Services';
import Testimonials from './Testimonials';
import Recommended from './Recommended';
import SearchBar from './SearchBar';

import './home.css';

const Home = () => {
    const [listings, setListings] = useState([]);
    useEffect(() => {
        const fetchRents = async () => {
            try {
                // Get a ref
                const rentsRef = collection(db, 'rentals');
                // Create a query
                const q = query(rentsRef, limit(3));
                // Execute the query
                const querySnap = await getDocs(q);
                const rents = [];
                querySnap.forEach((doc) => {
                    rents.push({ ...doc.data(), id: doc.id });
                });
                setListings(rents);
            } catch (error) {
                toast.error('Could not fetch rents');
            }
        };
        fetchRents();
    }, []);
    return (
        <>
            <HomeHero />

            <SearchBar />

            <Services />

            <WhyUs />

            {listings && listings.length > 0 ? (
                <Recommended listings={listings} />
            ) : (
                <></>
            )}

            <Testimonials />
        </>
    );
};
export default Home;
