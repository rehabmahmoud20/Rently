// C O M P O N E N T S
import { React, useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebase.config';
// I C O N S
import { toast } from 'react-toastify';
// S E C T I O N S
import WhyUs from './WhyUs';
import HomeHero from './HomeHero';
import Services from './Services';
import Testimonials from './Testimonials';
import Recommended from './Recommended';
import SearchBar from './SearchBar';
import './home.css';
import heshamImage from '../../assets/images/hesham.jpg';
import omimaImage from '../../assets/images/omima.jpeg';
import rehabImage from '../../assets/images/rehab2.jpeg';
import ruaaImage from '../../assets/images/ruaa.jpeg';
import mostafaImage from '../../assets/images/mostafa3.jpeg';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import '../About/about.css';
const Home = () => {
    const [listings, setListings] = useState([]);
    useEffect(() => {
        const fetchRents = async () => {
            try {
                // Get a ref
                const rentsRef = collection(db, 'rentals');
                // Create a query
                const q = query(rentsRef, limit(3));
                // Execute the query
                const querySnap = await getDocs(q);
                const rents = [];
                querySnap.forEach((doc) => {
                    rents.push({ ...doc.data(), id: doc.id });
                });
                setListings(rents);
            } catch (error) {
                toast.error('Could not fetch rents');
            }
        };
        fetchRents();
    }, []);
    return (
        <>
            <HomeHero />

            <SearchBar />
            <Services />
            <WhyUs />
            {listings && listings.length > 0 ? (
                <Recommended listings={listings} />
            ) : (
                <></>
            )}
            <Testimonials />
            {/* <div className="our-team bg-gray-200 py-12">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold mb-8 w-fit mx-auto ">
                        meet our team
                    </h2>
                    <div className="team-wrapper grid grid-cols-5 gap-6 justify-center items-center">
                        <div className="member flex flex-col justify-center items-center">
                            <div className="member-wrapper bg-cyan-400 mb-3">
                                <div className="img">
                                    <div className="overlay-img"></div>
                                    <img src={rehabImage} alt="member" />
                                    <div className="icons">
                                        <a
                                            href="https://github.com/rehabmahmoud20"
                                            target="_blank"
                                        >
                                            <AiFillGithub className="text-white mr-3" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/rehabmahmoud20"
                                            target="_blank"
                                        >
                                            <AiFillLinkedin className="text-white" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-xl text-gray-800">
                                Rehab Mahmoud
                            </h4>
                            <p className="text-base text-gray-600">
                                Rently Co-founder
                            </p>
                        </div>
                        <div className="member flex flex-col justify-center items-center">
                            <div className="member-wrapper bg-cyan-400 mb-3">
                                <div className="img">
                                    <div className="overlay-img"></div>
                                    <img src={omimaImage} alt="member" />
                                    <div className="icons">
                                        <a
                                            href="https://github.com/omima618"
                                            target="_blank"
                                        >
                                            <AiFillGithub className="text-white mr-3" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/omima-khaled-frontend-dev"
                                            target="_blank"
                                        >
                                            <AiFillLinkedin className="text-white" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-xl text-gray-800">
                                Omima Khaled
                            </h4>
                            <p className="text-base text-gray-600">
                                Rently Co-founder
                            </p>
                        </div>
                        <div className="member flex flex-col justify-center items-center">
                            <div className="member-wrapper bg-cyan-400 mb-3">
                                <div className="img">
                                    <div className="overlay-img"></div>
                                    <img src={ruaaImage} alt="member" />
                                    <div className="icons">
                                        <a
                                            href="https://github.com/ruaaeldeeb"
                                            target="_blank"
                                        >
                                            <AiFillGithub className="text-white mr-3" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/ruaa-reda-88706a234"
                                            target="_blank"
                                        >
                                            <AiFillLinkedin className="text-white" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-xl text-gray-800">Ruaa Reda</h4>
                            <p className="text-base text-gray-600">
                                Rently Co-founder
                            </p>
                        </div>
                        <div className="member flex flex-col justify-center items-center">
                            <div className="member-wrapper bg-cyan-400 mb-3">
                                <div className="img">
                                    <div className="overlay-img"></div>
                                    <img src={heshamImage} alt="member" />
                                    <div className="icons">
                                        <a
                                            href="https://github.com/heshamali1995"
                                            target="_blank"
                                        >
                                            <AiFillGithub className="text-white mr-3" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/hesham-ali-710643224/"
                                            target="_blank"
                                        >
                                            <AiFillLinkedin className="text-white" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-xl text-gray-800">
                                Hesham Ali
                            </h4>
                            <p className="text-base text-gray-600">
                                Rently Co-founder
                            </p>
                        </div>
                        <div className="member flex flex-col justify-center items-center">
                            <div className="member-wrapper bg-cyan-400 mb-3">
                                <div className="img">
                                    <div className="overlay-img"></div>
                                    <img src={mostafaImage} alt="member" />
                                    <div className="icons">
                                        <a
                                            href="https://github.com/mostafaelhussainy"
                                            target="_blank"
                                        >
                                            <AiFillGithub className="text-white mr-3" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/melhussainy/"
                                            target="_blank"
                                        >
                                            <AiFillLinkedin className="text-white" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-xl text-gray-800">
                                Mostafa Elhussieny
                            </h4>
                            <p className="text-base text-gray-600">
                                Rently Co-founder
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};
export default Home;
