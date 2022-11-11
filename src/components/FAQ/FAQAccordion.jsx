import { Accordion } from 'flowbite-react';

function FAQAccordion() {
  return (
    <>
      <div className='container md:flex flex-row mb-24'>
        <div className='links basis-2/5 mb-24'>
          <ul>
            <li>
              {' '}
              <a href='#about-us' className='text-lg mb-2 text-teal-500'>
                About us
              </a>
            </li>
            <li>
              {' '}
              <a href='#guest-relations' className='text-lg mb-2 text-teal-500'>
                Guest relations
              </a>
            </li>
            <li>
              {' '}
              <a href='#ranking-and-metrics' className='text-lg mb-2 text-teal-500'>
                Ranking and metrics
              </a>
            </li>
          </ul>
        </div>
        <div className='accordion basis-3/5'>
          <div className='accordion-section mb-10'>
            <h3 id='about-us' className='text-xl mb-5'>
              About us
            </h3>
            <Accordion alwaysOpen={true}>
              <Accordion.Panel>
                <Accordion.Title>
                  How will I manage my bussiness with you?
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    Our easy-to-use owner dashboard will be
                    the primary location for managing your
                    reservations, updating rates and keeping
                    your listing up to date. Some partners
                    choose to use a software provider to
                    link our systems. They still log in to
                    the owner dashboard to leverage our more
                    advanced tools like MarketMaker and
                    Boost.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  Is the content avilable in other
                  langauges?
                </Accordion.Title>
                <Accordion.Content>
                  <p>Currently No.</p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  Who are you?
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    We are a team of five developers trying
                    to enter the tech industry through this
                    website
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
          <div className='accordion-section mb-10'>
            <h3
              id='guest-relations'
              className='text-xl mb-5'
            >
              Guest relations
            </h3>
            <Accordion alwaysOpen={true}>
              <Accordion.Panel>
                <Accordion.Title>
                  How do I communicate with guests staying
                  at my property?
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    You can communicate with your guests by
                    going to Reservation Manager on your
                    dashboard or your owner mobile app. You
                    can also communicate directly by email
                    or phone as those details are given to
                    you after the traveler is booked.
                    Although, we do recommend you keep all
                    communication on our secure messaging
                    platform.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  How can guests review thier stay?
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    Three days after your guest checks out,
                    we’ll send you an email asking you to
                    review their stay. When you submit your
                    review, we’ll let your guest know via
                    email and will invite them to leave
                    their own review within 14 days.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  Why are quality photos important?
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    High-quality photos can lead to more
                    bookings, as photos help travelers
                    decide if the property is right for
                    them. They also help describe the
                    property, so expectations are set if the
                    traveler decides to book.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  Why are house rules important?
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    House rules are displayed on your
                    property listing so travelers can decide
                    if they're the right fit for your home.
                    Travelers are required to accept your
                    house rules before they book with you.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  What if guests break my house rules?
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    We advise you to contact customer
                    service during the guest's stay if you
                    need further advice.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  What kind of information do I receive
                  about my guests?
                </Accordion.Title>
                <Accordion.Content>
                  <p className='mb-3'>
                    You'll receive an email notification of
                    the booking, containing the below
                    traveler details:
                  </p>

                  <ul className='ml-5'>
                    <li className='mb-1'>- Name</li>
                    <li className='mb-1'>- Phone number</li>
                    <li className='mb-1'>- Email</li>
                    <li className='mb-1'>
                      - Additional information such as
                      whether the traveler has ever booked
                      with us before
                    </li>
                  </ul>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
          <div className='accordion-section mb-10'>
            <h3
              id='ranking-and-metrics'
              className='text-xl mb-5'
            >
              Ranking and metrics
            </h3>
            <Accordion alwaysOpen={true}>
              <Accordion.Panel>
                <Accordion.Title>
                  How can I get more visibilty in search
                  results?
                </Accordion.Title>
                <Accordion.Content>
                  <p className='mb-5'>
                    To stand out in search results, make
                    sure to take the following actions:
                  </p>
                  <ul className='ml-5'>
                    <li className='mb-1'>
                      - Create quality content. How
                      travelers respond to your headline,
                      photos, amenities and descriptions
                      affects your rank.
                    </li>
                    <li className='mb-1'>
                      -Set competitive rates. Set prices
                      appropriate for your property, area
                      and goals. Tools like MarketMaker can
                      help!{' '}
                    </li>
                    <li className='mb-1'>
                      - Accept and honor bookings.
                      Responding promptly to inquiries and
                      booking requests, accepting bookings
                      or enabling Instant Booking and having
                      a low cancellation rate will also help
                      boost your market rank. These actions
                      show our ranking system that you’re
                      committed to creating great traveler
                      experiences even before they book.
                    </li>
                    <li className='mb-1'>
                      - Earn great reviews. Positive reviews
                      help travelers know you take pride in
                      your property and that their vacation
                      is in good hands. Four- and five-star
                      reviews show you’re committed to your
                      guests and can influence your rank.
                    </li>
                  </ul>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  How do search results work?
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    We use machine learning to understand
                    what travelers want for an upcoming
                    trip. Our ranking system looks at all
                    the properties in the area, comparing
                    amenities, number of bedrooms, location,
                    reviews, and other criteria. Then it
                    ranks all properties — including yours —
                    by how well they fit the traveler’s
                    needs. This ranking is combined with an
                    individual traveler’s preferences to
                    determine where your property shows up
                    in their search results.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  How is my competitive set determined?
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    Your competitive set is determined by
                    your property's location and is grouped
                    with similar properties based on their
                    amenities and features. We encourage you
                    to keep your property details and
                    amenities up to date — this will help
                    make your competitive set more accurate.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQAccordion;
