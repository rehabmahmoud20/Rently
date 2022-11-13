import './about.css';
import cairoImage from '../../assets/images/cairo-hero-banner.jpg';
import rentalProp from '../../assets/images/rental-props.webp';
import heshamImage from '../../assets/images/hesham.jpg';
import omimaImage from '../../assets/images/omima.jpeg';
import rehabImage from '../../assets/images/rehab2.jpeg';
import ruaaImage from '../../assets/images/ruaa.jpeg';
import mostafaImage from '../../assets/images/mostafa3.jpeg';
import {
    AiOutlineFileSearch,
    AiFillGithub,
    AiFillLinkedin,
} from 'react-icons/ai';
import { BsPersonBadgeFill } from 'react-icons/bs';
import { MdOutlineMapsHomeWork } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { rentalsActions } from '../Store/rentals';

const About = () => {
    const [showFacts, setShowFacts] = useState(false);
    const dispatch = useDispatch();
    const myRef = useRef();
    const handleRoute = () => {
        dispatch(rentalsActions.updateFetchData(true));
    };
    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            setShowFacts(entry.isIntersecting);
        });
        observer.observe(myRef.current);
    }, []);
    return (
        <div id="about">
            <div className="about-hero bg-center bg-cover"></div>
            <div className="about-wrapper">
                <div className="about-us py-12">
                    <div className="container mx-auto">
                        <h2 className="uppercase text-3xl text-gray-800 mb-5">
                            about us
                        </h2>
                        <p className="text-base text-gray-600">
                            Rently was Founded in 2022, we help travelers,
                            students, workers or even families to find their
                            perfect property to stay or spend their vacation in
                            a trusted place. Rently offer customers an on-demand
                            experience for selling, buying, renting and
                            financing with transparency and nearly seamless
                            end-to-end service. Every day, Hosts offer unique
                            stays and experiences that make it possible for
                            guests to connect with communities in a more
                            authentic way.
                        </p>
                    </div>
                </div>
                <div className="facts bg-gray-200 py-12">
                    <div className="container mx-auto">
                        <h2 className="uppercase text-3xl text-gray-800 mb-8">
                            Facts
                        </h2>
                        <div
                            ref={myRef}
                            className="facts-wrapper grid grid-cols-4 gap-6"
                        >
                            <div
                                className="f-column-one bg-white rounded-lg px-8 py-12"
                                style={{
                                    opacity: showFacts == false ? '0' : '1',
                                }}
                            >
                                <h3 className="text-2xl text-gray-800 mb-3">
                                    1M
                                </h3>
                                <p className="text-base text-gray-600 mb-12">
                                    active listings worldwide
                                </p>
                                <p className="text-sm text-gray-400">
                                    as of March 31, 2022
                                </p>
                            </div>
                            <div
                                className="f-column-two bg-white rounded-lg p-8 py-12"
                                style={{
                                    opacity: showFacts == false ? '0' : '1',
                                }}
                            >
                                <h3 className="text-2xl text-gray-800 mb-3">
                                    10K
                                </h3>
                                <p className="text-base text-gray-600 mb-12">
                                    cities and towns with active Rently listings
                                </p>
                                <p className="text-sm text-gray-400">
                                    as of September 31, 2022
                                </p>
                            </div>
                            <div
                                className="f-column-three bg-white rounded-lg p-8 py-12"
                                style={{
                                    opacity: showFacts == false ? '0' : '1',
                                }}
                            >
                                <h3 className="text-2xl text-gray-800 mb-3">
                                    50+
                                </h3>
                                <p className="text-base text-gray-600 mb-12">
                                    countries and regions with Rently listings
                                </p>
                                <p className="text-sm text-gray-400">
                                    as of March 31, 2022
                                </p>
                            </div>
                            <div
                                className="f-column-four bg-white rounded-lg p-8 py-12"
                                style={{
                                    opacity: showFacts == false ? '0' : '1',
                                }}
                            >
                                <h3 className="text-2xl text-gray-800 mb-3">
                                    1M+
                                </h3>
                                <p className="text-base text-gray-600 mb-12">
                                    Rently guest arrivals all-time
                                </p>
                                <p className="text-sm text-gray-400">
                                    as of September 31, 2022
                                </p>
                            </div>
                            <div
                                className="f-column-five bg-white rounded-lg p-8 py-12"
                                style={{
                                    opacity: showFacts == false ? '0' : '1',
                                }}
                            >
                                <h3 className="text-2xl text-gray-800 mb-3">
                                    1M+
                                </h3>
                                <p className="text-base text-gray-600 mb-12">
                                    Hosts on Rently
                                </p>
                                <p className="text-sm text-gray-400">
                                    as of March 31, 2022
                                </p>
                            </div>
                            <div
                                className="f-column-six bg-white rounded-lg p-8 py-12"
                                style={{
                                    opacity: showFacts == false ? '0' : '1',
                                }}
                            >
                                <h3 className="text-2xl text-gray-800 mb-3">
                                    $100M+
                                </h3>
                                <p className="text-base text-gray-600 mb-12">
                                    earned by Hosts, all-time
                                </p>
                                <p className="text-sm text-gray-400">
                                    as of March 31, 2022
                                </p>
                            </div>
                            <div
                                className="f-column-seven bg-white rounded-lg p-8 py-12"
                                style={{
                                    opacity: showFacts == false ? '0' : '1',
                                }}
                            >
                                <h3 className="text-2xl text-gray-800 mb-3">
                                    $13.8K+
                                </h3>
                                <p className="text-base text-gray-600 mb-12">
                                    earned by the typical Egypt Hosts in 2021
                                </p>
                                <p className="text-sm text-gray-400">
                                    as of March 31, 2022
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="easy-search py-12">
                    <div className="container mx-auto">
                        <h2 className="uppercase text-3xl text-gray-800 mb-5">
                            join us
                        </h2>
                        <div className="easy-search-wrapper flex gap-10">
                            <div className="easy-text w-2/3">
                                <p className="text-base text-gray-600 mb-5">
                                    Join hundreds of our special clients already
                                    using our site. Rently is the easiest way
                                    for travelers to find your property, compare
                                    the top results and make a faster booking
                                    decision.
                                </p>

                                <p className="text-base text-gray-600 mb-10">
                                    We care about one thing: finding you the
                                    perfect vacation rental.
                                </p>
                                <Link
                                    to="/rental-list"
                                    onClick={() => {
                                        handleRoute();
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="rental-button text-white bg-cyan-600 hover:bg-cyan-800 font-medium rounded-lg text-sm px-12 py-3 mr-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800"
                                    >
                                        Find a rental
                                    </button>
                                </Link>
                            </div>
                            <div className="easy-img w-1/3">
                                <img
                                    src={rentalProp}
                                    alt="cairo"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="why-us py-12 bg-gray-200">
                    <div className="container mx-auto">
                        <h2 className="uppercase text-3xl text-gray-800 mb-12">
                            The easiest way to find a vacation rental
                        </h2>
                        <div className="why-us-wrapper flex gap-8">
                            <div className="why-img w-1/3">
                                <img
                                    src={cairoImage}
                                    alt="cairo"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="why-text w-2/3 pl-10">
                                <p className="text-base text-gray-600 mb-5">
                                    We love vacation rentals, but not how time
                                    consuming and complex it can be to find the
                                    right one. So we reimagined a better way. We
                                    eliminated the need to search across several
                                    different sites and scroll through pages of
                                    irrelevant results just to find the perfect
                                    home away from home.
                                </p>

                                <p className="text-base text-gray-600">
                                    We bring all the rental options from the
                                    leading travel sites together in one place
                                    and showcase only the best results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-features py-12">
                    <div className="container mx-auto">
                        <div className="feat-wrapper flex justify-between gap-14">
                            <div className="instant-search flex flex-col justify-center items-center text-center">
                                <AiOutlineFileSearch className="search-icon text-gray-800 mb-5" />
                                <h4 className="text-xl text-gray-900 mb-3">
                                    Instant Search
                                </h4>
                                <p className="text-base text-gray-500">
                                    No wasted time searching and scrolling
                                    across different sites
                                </p>
                            </div>
                            <div className="person-search flex flex-col justify-center items-center text-center">
                                <BsPersonBadgeFill className="search-icon text-gray-800 mb-5" />
                                <h4 className="text-xl text-gray-900 mb-3">
                                    Personalized Results
                                </h4>
                                <p className="text-base text-gray-500">
                                    Only the best results so you can easily find
                                    the perfect rental
                                </p>
                            </div>
                            <div className="rental-variety flex flex-col justify-center items-center text-center">
                                <MdOutlineMapsHomeWork className="search-icon text-gray-800 mb-5" />
                                <h4 className="text-xl text-gray-900 mb-3">
                                    Hundreds Of Rentals
                                </h4>
                                <p className="text-base text-gray-500">
                                    The best vacation rentals from one of the
                                    best travel sites
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="our-team bg-gray-200 py-12">
                    <div className="container mx-auto">
                        <h2 className="uppercase text-3xl text-gray-800 mb-12">
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
                                <h4 className="text-xl text-gray-800">
                                    Ruaa Reda
                                </h4>
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
                </div>
            </div>
        </div>
    );
};

export default About;
