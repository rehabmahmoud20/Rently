import { useNavigate } from 'react-router-dom';
const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="container text-center">
            <h2 className="text-4xl text-gray-800 font-bold mt-6 mb-3">
                OOPS !
            </h2>
            <p className="text-xl text-gray-500 mb-3">
                The page you are looking for does not exist !
            </p>
            <button
                onClick={() => {
                    navigate('/');
                }}
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-3 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Back To Home
            </button>
            <img
                src={require('../../assets/images/not-found.gif')}
                alt="notfound..."
                className="max-w-full max-h-fit mx-auto cursor-pointer"
            />
        </div>
    );
};

export default NotFoundPage;
