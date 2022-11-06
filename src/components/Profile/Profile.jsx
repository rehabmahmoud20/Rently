import { Routes, Route } from 'react-router-dom';
import SideMenu from './Sidemenu/SideMenu';
import DeleteUserContent from './ItemsContent/DeleteUserContent';
import GenunisPointsContent from './ItemsContent/GenunisPointsContent';
import HistoryContent from './ItemsContent/HistoryContent';
import InboxContent from './ItemsContent/InboxContent';
import PaymentContent from './ItemsContent/PaymentContent';
import PersonalInfoContent from './ItemsContent/PersonalInfoContent';
import PropertiesContent from './ItemsContent/PropertiesContent';
const Profile = () => {
    return (
        <section className="user-profile min-h-screen flex">
            <SideMenu />
            <Routes>
                <Route path="delete-account" element={<DeleteUserContent />} />
                <Route path="genuis" element={<GenunisPointsContent />} />
                <Route path="history" element={<HistoryContent />} />
                <Route path="inbox" element={<InboxContent />} />
                <Route path="payment-method" element={<PaymentContent />} />
                <Route path="personal-info" element={<PersonalInfoContent />} />
                <Route path="properties" element={<PropertiesContent />} />
            </Routes>
        </section>
    );
};

export default Profile;
