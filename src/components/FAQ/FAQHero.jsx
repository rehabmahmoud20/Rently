import heroImage from './assets/faqMainImage.jpg';

function FAQHero() {
  return (
    <>
      <section className='hero-section'>
        <div className='container'>
          <div className='flex md:flex-row flex-col'>
            <div className='text-container my-auto basis-3/5'>
              <h2 className='text-7xl font-bold mb-6'>FAQ</h2>
              <p className='text-xl max-w-[80%] text-slate-600	'>
                Have questions? Here you’ll find the answers
                most valued by our partners, along with
                access to step-by-step instructions and
                support.
              </p>
            </div>
            <figure className='basis-2/5'>
              <img src={heroImage} alt="Call center specialiest" />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQHero;
