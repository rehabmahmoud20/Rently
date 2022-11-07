import { CiLocationOn } from 'react-icons/ci';
import { Rating } from 'flowbite-react';
import { TbBath } from 'react-icons/tb';
import { BiBed, BiExpand } from 'react-icons/bi';
import { Card } from 'flowbite-react';

const Recommended = ({ listings }) => {
  console.log(listings)
  return (
    <>
      <h3 className='our-properties-header text-center mb-14 text-4xl'>
        Our Featured Properties
      </h3>
      <div className='properties-card-container grid lg:grid-cols-3 gap-24'>
        {listings.map(list => (
          <Card
            imgAlt='Meaningful alt text for an image that is not purely decorative'
            imgSrc={list.images[0]}
          >
            <div className='property-text-container'>
              <h5 className='text-lg font-bold text-gray-900 dark:text-white'>
                {list.name}
              </h5>
              <p className='Price font-medium	text-sm text-gray-700 dark:text-gray-400'>
                <span className='text-teal-400 text-base'>
                  {list.price} EGP
                </span>
                /Month
              </p>
              <p className='Location font-medium text-sm flex items-center'>
                <CiLocationOn className='mr-2 fill-teal-400' />
                {list.address}
              </p>
              <Rating className='mb-3'>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
              </Rating>

              <div className='Amenities flex flex-wrap'>
                <span className='flex items-center mr-8 mb-2 font-medium'>
                  <TbBath className='mr-2' /> {list.aboutRental.bathroom} Baths
                </span>
                <span className='flex items-center  mb-2 font-medium'>
                  <BiBed className='mr-2' /> {list.aboutRental.rooms} Bedrooms
                </span>
                <span className='flex items-center font-medium'>
                  <BiExpand className='mr-2' /> {list.aboutRental.area} m
                  <sup>2</sup>
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Recommended;
