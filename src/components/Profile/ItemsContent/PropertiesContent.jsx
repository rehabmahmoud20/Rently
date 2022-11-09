import { useSelector } from 'react-redux';

const PropertiesContent = () => {
    const userData = { ...useSelector((state) => state.user.userData) };
    console.log(userData);
    return (
        <div className="px-10 py-5">
            <h2 className="text-3xl">Your Properties</h2>
            <p>{userData.username}</p>
        </div>
    );
};

export default PropertiesContent;
