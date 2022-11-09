import { useSelector } from 'react-redux';
import Spinner from '../../Shared/Spinner';
const PropertiesContent = () => {
    const userData = { ...useSelector((state) => state.user.userData) };
    return userData ? (
        <div className="px-10 py-5">
            <h2 className="text-3xl">Your Properties</h2>
        </div>
    ) : (
        <Spinner />
    );
};

export default PropertiesContent;
