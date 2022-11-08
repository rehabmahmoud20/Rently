// C O M P O N E N T S
import SideMenu from './Sidemenu/SideMenu';
import GenunisPointsContent from './ItemsContent/GenunisPointsContent';
import HistoryContent from './ItemsContent/HistoryContent';
import InboxContent from './ItemsContent/InboxContent';
import PaymentContent from './ItemsContent/PaymentContent';
import PersonalInfoContent from './ItemsContent/PersonalInfoContent';
import PropertiesContent from './ItemsContent/PropertiesContent';
import { UseAuthStatus } from '../Hooks/useAuthStatus';

// A U T H
import { Routes, Route } from 'react-router-dom';
const Profile = () => {
    const { isLoggedIn, checkingStatus } = UseAuthStatus();
    return (
        <section className="user-profile min-h-screen flex">
            <SideMenu />
            <div className="container">
                <Routes>
                    <Route path="genuis" element={<GenunisPointsContent />} />
                    <Route path="history" element={<HistoryContent />} />
                    <Route path="inbox" element={<InboxContent />} />
                    <Route path="payment-method" element={<PaymentContent />} />
                    <Route path="/" element={<PersonalInfoContent />} />
                    <Route path="properties" element={<PropertiesContent />} />
                </Routes>
            </div>
        </section>
    );
};

export default Profile;
