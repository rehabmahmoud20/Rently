// I M A G E S
import HouseImage from './assets/house-image.jpg';
import ApartmentImage from './assets/apartment-image.jpg';
import RoomImage from './assets/room-image.png';
// C O M P O N E N T S
import { Card } from 'flowbite-react';
const Services = () => {
    return (
        <section className="our-services pt-24 mb-24">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold mb-8 w-fit mx-auto ">
                    Our Services
                </h2>
                <div className="services-card-container grid lg:grid-cols-3 gap-24">
                    <div className="services-card max-w-sm mx-auto">
                        <Card
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={HouseImage}
                        >
                            <h5 className="text-2xl text-center tracking-tight dark:text-white">
                                Rent a house
                            </h5>
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                You can place your own full house for rent.
                            </p>
                        </Card>
                    </div>
                    <div className="services-card max-w-sm mx-auto">
                        <Card
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={ApartmentImage}
                        >
                            <h5 className="text-2xl text-center tracking-tight dark:text-white">
                                Rent an apartment
                            </h5>
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                You can place your own apartment for rent.
                            </p>
                        </Card>
                    </div>
                    <div className="services-card max-w-sm mx-auto">
                        <Card
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={RoomImage}
                        >
                            <h5 className="text-2xl text-center tracking-tight dark:text-white">
                                Rent rooms
                            </h5>
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                You can split your own apartment and place the
                                rooms for rent.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
