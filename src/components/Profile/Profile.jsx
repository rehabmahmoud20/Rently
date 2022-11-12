// C O M P O N E N T S
import SideMenu from './Sidemenu/SideMenu';
import GenunisPointsContent from './ItemsContent/GenunisPointsContent';
import HistoryContent from './ItemsContent/HistoryContent';
import InboxContent from './ItemsContent/InboxContent';
import PaymentContent from './ItemsContent/PaymentContent';
import PersonalInfoContent from './ItemsContent/PersonalInfoContent';
import PropertiesContent from './ItemsContent/PropertiesContent';
import NotFoundPage from '../Shared/NotFoundPage';
import { useSelector } from 'react-redux';
import AddRental from '../AddRental/AddRental';
// A U T H
import { Routes, Route } from 'react-router-dom';
// import Spinner from '../Shared/Spinner';
import { db } from '../../firebase.config';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
const Profile = () => {
    const userData = useSelector((state) => state.user.userData);
    const [rentals, setRentals] = useState(null);
    const getProperties = async () => {
        try {
            const listRef = collection(db, 'rentals');
            const querySnap = await getDocs(query(listRef, limit(10)));
            const rents = [];
            querySnap.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                rents.push(data);
            });
            setRentals(rents);
            console.log(rentals);
        } catch (error) {
            toast.error('Something went wrong !');
        }
    };
    useEffect(() => {
        getProperties();
        console.log(rentals);
    }, []);
    return (
        <section className="user-profile flex">
            <SideMenu />
            <div className="container min-h-full">
                <Routes>
                    <Route
                        path="genuis"
                        element={<GenunisPointsContent userData={userData} />}
                    />
                    <Route
                        path="history"
                        element={
                            <HistoryContent
                                userData={userData}
                                rentalsData={rentals}
                            />
                        }
                    />
                    <Route path="inbox" element={<InboxContent />} />
                    <Route path="payment-method" element={<PaymentContent />} />
                    <Route
                        path="/"
                        element={<PersonalInfoContent userData={userData} />}
                    />
                    <Route
                        path="properties"
                        element={
                            <PropertiesContent
                                userData={userData}
                                rentalsData={rentals}
                            />
                        }
                    />
                    <Route
                        path="edit-rental/:id"
                        element={<AddRental rental={rentals} />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </section>
    );
};

export default Profile;
