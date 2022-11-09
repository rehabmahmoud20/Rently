import { Card } from "flowbite-react";

const Host = () => {
  return (
    <div id="host" className="h-auto mb-4">
      <p className="text-2xl mb-3">Host</p>
      <div className="w-full">
        <Card>
          <div className="flex items-center justify-between ">
            <div>
              <img
                className="mb-3 h-20 w-20 rounded-full shadow-lg"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Bonnie Green
              </h5>
            </div>
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-cyan-600 py-2 px-4 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-cyan-800 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800"
            >
              Show reviews
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Host;
