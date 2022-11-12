import { Carousel, Avatar } from 'flowbite-react';

function Testimonials() {
    return (
        <>
            <section className="testimonials mb-24 container ">
                <div className="h-96 md:h-80">
                    <h2 className="text-4xl font-bold mb-8 w-fit mx-auto ">
                        Testimonials
                    </h2>
                    <Carousel indicators={false}>
                        <div className="testimonial-card grid lg:grid-cols-2 gap-2">
                            <Avatar
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                                size="xl"
                                className="mb-8"
                            >
                                <div className="space-y-1 font-medium text-3xl dark:text-white ml-4">
                                    <h3>Jese Leos</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Joined in August 2022
                                    </p>
                                </div>
                            </Avatar>
                            <div className="flex items-center">
                                <p className="max-w-[75%] mx-auto">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Aenean feugiat, risus a
                                    bibendum aliquam, libero metus varius ante,
                                    sit amet pharetra quam nisi eget ipsum.
                                    Nullam purus eros, ullamcorper vel convallis
                                    et, vulputate imperdiet enim.
                                </p>
                            </div>
                        </div>
                        <div className="testimonial-card grid lg:grid-cols-2 gap-2">
                            <Avatar
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                                size="xl"
                                className="mb-8"
                            >
                                <div className="space-y-1 font-medium text-3xl dark:text-white ml-4">
                                    <h3>Jese Leos</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Joined in August 2022
                                    </p>
                                </div>
                            </Avatar>
                            <div className="flex items-center">
                                <p className="max-w-[75%] mx-auto">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Aenean feugiat, risus a
                                    bibendum aliquam, libero metus varius ante,
                                    sit amet pharetra quam nisi eget ipsum.
                                    Nullam purus eros, ullamcorper vel convallis
                                    et, vulputate imperdiet enim.
                                </p>
                            </div>
                        </div>
                        <div className="testimonial-card grid lg:grid-cols-2 gap-2">
                            <Avatar
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                                size="xl"
                                className="mb-8"
                            >
                                <div className="space-y-1 font-medium text-3xl dark:text-white ml-4">
                                    <h3>Jese Leos</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Joined in August 2022
                                    </p>
                                </div>
                            </Avatar>
                            <div className="flex items-center">
                                <p className="max-w-[75%] mx-auto">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Aenean feugiat, risus a
                                    bibendum aliquam, libero metus varius ante,
                                    sit amet pharetra quam nisi eget ipsum.
                                    Nullam purus eros, ullamcorper vel convallis
                                    et, vulputate imperdiet enim.
                                </p>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </section>
        </>
    );
}

export default Testimonials;
