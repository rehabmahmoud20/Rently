import { IoLocationSharp } from 'react-icons/io5';
import { Rating } from 'flowbite-react';
import { TbBath } from 'react-icons/tb';
import { BiBed, BiExpand } from 'react-icons/bi';
import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
const Recommended = ({ listings }) => {
    const navigate = useNavigate();
    return (
        <>
            <section className="our-properties mb-24">
                <div className="container  mx-auto">
                    <h2 className="text-4xl font-bold mb-8 w-fit mx-auto ">
                        Our Featured Properties
                    </h2>
                    <div className="properties-card-container grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {listings.map((list) => (
                            <Card
                                key={Math.random() * 100}
                                imgAlt="Meaningful alt text for an image that is not purely decorative"
                                imgSrc={list.images[0]}
                                className="max-w-sm mx-auto"
                                // className="max-w-sm mx-auto"
                            >
                                <div className="property-text-container">
                                    <h5 className="text-lg mb-1 font-bold text-gray-900 dark:text-white">
                                        {list.name}
                                    </h5>
                                    <p className="Price mb-1 font-medium text-sm text-gray-700 dark:text-gray-400">
                                        <span className="text-teal-400 text-base">
                                            {list.price} EGP
                                        </span>
                                        /Month
                                    </p>
                                    <p className="Location mb-1 font-medium text-sm flex items-center">
                                        <IoLocationSharp className="mr-2 w-5 min-w-fit h-5 min-h-fit text-teal-400" />
                                        {list.address}
                                    </p>
                                    <Rating className="mb-1">
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star filled={false} />
                                    </Rating>
                                    <div className="Amenities flex flex-wrap mb-2">
                                        <span className="flex items-center mr-8 mb-1 font-medium">
                                            <TbBath className="mr-2" />{' '}
                                            {list.aboutRental.bathroom} Baths
                                        </span>
                                        <span className="flex items-center  mb-1 font-medium">
                                            <BiBed className="mr-2" />{' '}
                                            {list.aboutRental.rooms} Bedrooms
                                        </span>
                                        <span className="flex items-center font-medium">
                                            <BiExpand className="mr-2" />{' '}
                                            {list.aboutRental.area} m
                                            <sup>2</sup>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth',
                                            });
                                            navigate(
                                                `/rental-details/${list.id}`
                                            );
                                        }}
                                        className="text-white bg-cyan-600 block w-fit mx-auto  hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-8 py-2.5 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800 transition-all transition-500"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Recommended;
