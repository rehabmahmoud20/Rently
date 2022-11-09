import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from '../../Shared/Spinner';
import { useNavigate } from 'react-router-dom';
import { TbDiscount } from 'react-icons/tb';
const GenunisPointsContent = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);
    const [username, setUsername] = useState('');
    const getFirsfName = (name) => {
        let fName = name.slice(0, name.indexOf(' '));
        return fName;
    };
    useEffect(() => {
        userData && setUsername(getFirsfName(userData.username));
    }, [userData]);
    return userData ? (
        <section className="px-5 sm:px-10 py-5">
            <h2 className="text-5xl font-bold text-cyan-600 w-fit mx-auto lg:mx-0">
                Genuis Program
            </h2>
            {/* Hero */}
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center py-5 gap-6">
                <div className="w-full lg:w-1/2">
                    <h3 className="text-2xl font-bold mb-3 text-cyan-600 w-fit mx-auto lg:mx-0">
                        Genuis
                    </h3>
                    <p className="mb-6 font-bold text-xl w-fit mx-auto lg:mx-0">
                        Rently's loyalty program
                    </p>
                    <p className="font-bold text-base mb-3 w-fit mx-auto lg:mx-0">
                        {username}, you're at Genius Level 1 🎉
                    </p>
                    <p className=" text-gray-500 text-center lg:text-left text-base mb-3 w-fit mx-auto lg:mx-0">
                        Complete 5 stays before Nov 10, 2023
                        <br />
                        to unlock Genius Level 2
                    </p>
                    <button
                        onClick={() => {
                            navigate('/rental-list');
                        }}
                        className="text-white bg-cyan-600 block w-fit mx-auto lg:mx-0  hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-8 py-2.5 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800 transition-all transition-500"
                    >
                        Discover
                    </button>
                    {/* Genuis Features */}
                    <div className="text-center lg:text-left mt-6">
                        <h3 className="text-2xl font-bold mb-3 text-cyan-600 w-fit mx-auto lg:mx-0">
                            Rent your next property for less
                        </h3>
                        <p className="text-gray-500 text-center lg:text-left text-base mb-3 w-fit mx-auto lg:mx-0">
                            Enjoy discounted properties with
                            <br />
                            Genius discounts
                        </p>
                        <div className="flex flex-wrap justify-between items-center gap-3">
                            <div className="block p-4 mx-auto  max-w-sm bg-white rounded-lg shadow-md shadow-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-3 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Genius Level 1
                                </h5>
                                <p className="font-normal text-gray-500 dark:text-gray-400">
                                    <TbDiscount className="text-cyan-600 text-xl mr-1 inline" />{' '}
                                    10% discounts
                                </p>
                            </div>
                            <div className="block p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md shadow-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-3 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Genius Level 2
                                </h5>
                                <p className="font-normal text-gray-500 dark:text-gray-400">
                                    <TbDiscount className="text-cyan-600 text-xl mr-1 inline" />{' '}
                                    15% discounts
                                </p>
                            </div>
                            <div className="block p-4 mx-auto max-w-sm bg-white rounded-lg shadow-md shadow-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-3 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Genius Level 3
                                </h5>
                                <p className="font-normal text-gray-500 dark:text-gray-400">
                                    <TbDiscount className="text-cyan-600 text-xl mr-1 inline" />{' '}
                                    20% discounts
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Genuis Image */}
                <div className="w-full lg:w-1/2">
                    <img
                        src={require('../images/genuis.gif')}
                        alt="Genuis Program"
                        className="mx-auto w-fit object-cover"
                    />
                </div>
            </div>
        </section>
    ) : (
        <Spinner />
    );
};

export default GenunisPointsContent;
