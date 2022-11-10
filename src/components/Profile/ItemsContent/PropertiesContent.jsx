import { useSelector } from 'react-redux';
import Spinner from '../../Shared/Spinner';
const PropertiesContent = () => {
    const userData = { ...useSelector((state) => state.user.userData) };
    return userData ? (
        <section className="px-5 sm:px-10 py-5">
            <h2 className="text-4xl font-bold text-cyan-600 w-fit mx-auto lg:mx-0">
                Your Properties
            </h2>
        </section>
    ) : (
        <Spinner />
    );
};

export default PropertiesContent;
