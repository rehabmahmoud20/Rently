import HeroImage from './assets/hero-image.jpg';
import { Link } from 'react-router-dom';

function HomeHero() {
  return (
    <section className="hero-section relative mb-36">
      <img
        src={HeroImage}
        alt="House"
        className="hero-image w-full h-screen"
      />
      <div className="overlay absolute top-0 left-0 bg-black h-full w-full opacity-60 z-10"></div>
      <div className="container">
        <div className="get-started absolute left-28 top-32 z-20">
          <h2 className="text-white text-xl sm:text-6xl	mb-16">
            Find your best
            <br />
            smart real estate
          </h2>
          <Link to='rental-list'>
            <button className="text-white text-sm sm:text-2xl border-2	border-white rounded-md	px-3 py-1">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;