import { Carousel, Card, Rating } from "flowbite-react";
import egyptflag from "../../../assets/images/icons8-egypt-48.png";

const Reviews = () => {
  return (
    <div id="reviews" className="h-auto mb-4 sm:w-full">
      <p className="text-2xl mb-3">Reviews</p>
      <div className="h-56 sm:h-64 xl:h-48 2xl:h-60">
        <Carousel slide={false}>
          <Card className="h-full">
            <div className="flex flex-wrap ">
              <div className="w-full md:w-[30%] mb-3">
                <p className="mb-2">omima khaled</p>
                <div className="flex items-center">
                  <img src={egyptflag} alt="" className="w-4 h-4 mr-2" />
                  <span className="text-xs">Egypt</span>
                </div>
              </div>
              <div className="w-full md:w-[70%]">
                <p className="text-sm mb-2 neutral-400">
                  "The rooms were clean, very comfortable, and the staff was
                  amazing. They went over and beyond to help make our stay
                  enjoyable. I highly recommend this hotel for anyone visiting
                  downtown"
                </p>
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.95 out of 5
                  </p>
                </Rating>
              </div>
            </div>
          </Card>
          <Card className="h-full">
            <div className="flex flex-wrap ">
              <div className="w-full md:w-[30%]">
                <p className="mb-2">omima khaled</p>
                <div className="flex items-center">
                  <img src={egyptflag} alt="" className="w-4 h-4 mr-2" />
                  <span className="text-xs">Egypt</span>
                </div>
              </div>
              <div className="w-full md:w-[70%]">
                <p className="text-sm mb-2">
                  "The rooms were clean, very comfortable, and the staff was
                  amazing. They went over and beyond to help make our stay
                  enjoyable. I highly recommend this hotel for anyone visiting
                  downtown"
                </p>
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.95 out of 5
                  </p>
                </Rating>
              </div>
            </div>
          </Card>
          <Card className="h-full">
            <div className="flex flex-wrap">
              <div className="w-full md:w-[30%]">
                <p className="mb-2">omima khaled</p>
                <div className="flex items-center">
                  <img src={egyptflag} alt="" className="w-4 h-4 mr-2" />
                  <span className="text-xs">Egypt</span>
                </div>
              </div>
              <div className="w-full md:w-[70%]">
                <p className="text-sm mb-2">
                  "The rooms were clean, very comfortable, and the staff was
                  amazing. They went over and beyond to help make our stay
                  enjoyable. I highly recommend this hotel for anyone visiting
                  downtown"
                </p>
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.95 out of 5
                  </p>
                </Rating>
              </div>
            </div>
          </Card>
        </Carousel>
      </div>
    </div>
  );
};

export default Reviews;
