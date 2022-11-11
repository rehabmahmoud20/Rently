// I M A G E S
import Share from './assets/share.svg';
import Trusted from './assets/trusted.svg';
import Variety from './assets/variety.svg';

function WhyUs() {
  return (
    <section className="why-us mb-24 container">
      <h2 className='text-4xl font-base text-center mb-10'>Why us</h2>

      <div className="grid lg:grid-cols-3 gap-24">
        <div className="max-w-sm mx-auto">
          <figure>
            <img src={Share} alt="" srcset="" />
          </figure>
          <h3 className='text-2xl ml-2 mb-2 font-medium text-teal-500'>Share</h3>
          <p className='ml-2 mb-2'>You can split the apartment with different people based on your preferences.</p>
        </div>
        <div className="max-w-sm mx-auto">
          <figure>
            <img src={Trusted} alt="" srcset="" />
          </figure>
          <h3 className='text-2xl ml-2 mb-2 font-medium text-teal-500'>Trusted</h3>
          <p className='ml-2 mb-2'>We offer a trusted community of landlords and apartment owners.</p>
        </div>
        <div className="max-w-sm mx-auto">
          <figure>
            <img src={Variety} alt="" srcset="" />
          </figure>
          <h3 className='text-2xl ml-2 mb-2 font-medium text-teal-500'>Variety</h3>
          <p className='ml-2 mb-2'>We have a huge list of houses and apartments to fit your needs.</p>
        </div>
      </div>
    </section>
    // <section className="why-us mb-24">
    //   <div className="container  mx-auto">
    //     <div className="why-us-container services-card-container grid lg:grid-cols-2 gap-24">
    //       <figure className="why-us-image-container">
    //         <img
    //           src={BuildingImage}
    //           alt=""
    //           className="object-cover rounded-xl"
    //         />
    //       </figure>
    //       <div className="why-us-text-containe">
    //         <h3 className="my-28 mb-14 text-4xl">
    //           Why Choose Us
    //         </h3>
    //         <div className="sub-text">
    //           <h4 className="text-2xl mb-4 flex">
    //             <AiOutlineCheck className="mr-5 text-teal-400" />
    //             Trusted
    //           </h4>
    //           <h5 className="text-xl mb-10">
    //             We offer a trusted community of landlords
    //             and apartment owners.
    //           </h5>
    //           <h4 className="text-2xl mb-4 flex">
    //             <AiOutlineFileSearch className="mr-5 text-teal-400" />
    //             Variety
    //           </h4>
    //           <h5 className="text-xl mb-10">
    //             We have a huge list of houses and apartments
    //             to fit your needs.
    //           </h5>
    //           <h4 className="text-2xl mb-4 flex">
    //             <AiOutlineHeart className="mr-5 text-teal-400" />
    //             Share
    //           </h4>
    //           <h5 className="text-xl">
    //             You can split the apartment with different
    //             people based on your preferences.
    //           </h5>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default WhyUs;