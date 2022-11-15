import { IoLocationSharp } from 'react-icons/io5';
import { Rating } from 'flowbite-react';
import { TbBath } from 'react-icons/tb';
import { BiBed, BiExpand } from 'react-icons/bi';
import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = (props) => {
    const navigate = useNavigate();
    const rentalsList = props.list;
    return (
        <Card
            className="h-full"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={
                rentalsList.images[
                    Math.floor(Math.random() * rentalsList.images.length)
                ]
            }
        >
            <div className="property-text-container">
                <h5 className="text-lg mb-1 font-bold text-gray-900 dark:text-white">
                    {rentalsList.name}
                </h5>
                <p className="Price mb-1 font-medium text-sm text-gray-700 dark:text-gray-400">
                    <span className="text-teal-400 text-base">
                        {rentalsList.price} EGP
                    </span>
                    /Month
                </p>
                <p className="Location mb-1 font-medium text-sm flex items-center">
                    <IoLocationSharp className="mr-2 w-5 min-w-fit h-5 min-h-fit text-teal-400" />
                    {rentalsList.address}
                </p>
                <Rating className="mb-1">
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                </Rating>
                <div className="Amenities mb-3 flex flex-wrap">
                    <span className="flex items-center mr-8 mb-1 font-medium">
                        <TbBath className="mr-2" />{' '}
                        {rentalsList.aboutRental.bathroom} Baths
                    </span>
                    <span className="flex items-center mr-8  mb-1 font-medium">
                        <BiBed className="mr-2" />{' '}
                        {rentalsList.aboutRental.rooms} Bedrooms
                    </span>
                    <span className="flex items-center font-medium">
                        <BiExpand className="mr-2" />{' '}
                        {rentalsList.aboutRental.area} m<sup>2</sup>
                    </span>
                </div>
                <button
                    onClick={() => {
                        navigate(`/rental-details/${rentalsList.id}`);
                    }}
                    className="text-white bg-cyan-600 block w-fit mx-auto  hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-8 py-2.5 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800 transition-all transition-500"
                >
                    View Details
                </button>
            </div>
        </Card>
    );
};

export default PropertyCard;
