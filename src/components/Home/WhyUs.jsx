// I M A G E S
import Share from './assets/share.svg';
import Trusted from './assets/trusted.svg';
import Variety from './assets/variety.svg';

function WhyUs() {
    return (
        <section className="why-us mb-24 container">
            <h2 className="text-4xl font-bold mb-8 w-fit mx-auto ">
                Why Choose us
            </h2>

            <div className="grid lg:grid-cols-3 gap-24">
                <div className="max-w-sm mx-auto">
                    <figure>
                        <img src={Share} alt="why us" />
                    </figure>
                    <h3 className="text-2xl ml-2 mb-4 text-center font-bold text-teal-500">
                        Share
                    </h3>
                    <p className="ml-2 text-gray-500 text-base text-center">
                        You can split the apartment with different people based
                        on your preferences.
                    </p>
                </div>
                <div className="max-w-sm mx-auto">
                    <figure>
                        <img src={Trusted} alt="why us" />
                    </figure>
                    <h3 className="text-2xl ml-2 mb-4 text-center font-bold text-teal-500">
                        Trusted
                    </h3>
                    <p className="ml-2 text-gray-500 text-base text-center">
                        We offer a trusted community of landlords and apartment
                        owners.
                    </p>
                </div>
                <div className="max-w-sm mx-auto">
                    <figure>
                        <img src={Variety} alt="why us" />
                    </figure>
                    <h3 className="text-2xl ml-2 mb-4 text-center font-bold text-teal-500">
                        Variety
                    </h3>
                    <p className="ml-2 text-gray-500 text-base text-center">
                        We have a huge list of houses and apartments to fit your
                        needs.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default WhyUs;
