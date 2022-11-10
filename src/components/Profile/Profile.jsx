// C O M P O N E N T S
import SideMenu from './Sidemenu/SideMenu';
import GenunisPointsContent from './ItemsContent/GenunisPointsContent';
import HistoryContent from './ItemsContent/HistoryContent';
import InboxContent from './ItemsContent/InboxContent';
import PaymentContent from './ItemsContent/PaymentContent';
import PersonalInfoContent from './ItemsContent/PersonalInfoContent';
import PropertiesContent from './ItemsContent/PropertiesContent';
import NotFoundPage from '../Shared/NotFoundPage';

// A U T H
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Shared/Spinner';
const Profile = () => {
    const isLoading = useSelector((state) => state.authentication.isLoading);
    return (
        <section className="user-profile flex">
            <SideMenu />
            <div className="container">
                <Routes>
                    <Route path="genuis" element={<GenunisPointsContent />} />
                    <Route path="history" element={<HistoryContent />} />
                    <Route path="inbox" element={<InboxContent />} />
                    <Route path="payment-method" element={<PaymentContent />} />
                    <Route path="/" element={<PersonalInfoContent />} />
                    <Route path="properties" element={<PropertiesContent />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </section>
    );
};

export default Profile;
