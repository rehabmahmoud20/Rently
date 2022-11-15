import {
    RiMastercardFill,
    RiVisaLine,
    RiPaypalFill,
    RiBankFill,
} from 'react-icons/ri';
import { Dropdown } from 'flowbite-react';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
const PaymentContent = () => {
    const paymentRef = useRef();
    const addMethodHandler = () => {
        const cardNumber = paymentRef.current.value;

        if (
            cardNumber !== '' &&
            typeof +cardNumber === 'number' &&
            cardNumber.length === 16
        ) {
            toast.success('Payment Method added successfully');
        } else {
            toast.error('Incorrect Card Number !');
        }
    };
    const masterCard = (
        <RiMastercardFill className="text-3xl block ml-3 text-red-700" />
    );
    const visa = (
        <RiVisaLine className="text-3xl block ml-3 text-emerald-800" />
    );
    const payPal = (
        <RiPaypalFill className="text-3xl block ml-3 text-sky-600" />
    );
    const bankAcc = (
        <RiBankFill className="text-3xl block ml-3 text-stone-500" />
    );
    const [currentOpt, setCurrentOpt] = useState(masterCard);
    return (
        <section className="px-5 sm:px-10 py-5">
            <h2 className="text-4xl font-bold text-cyan-600 w-fit mx-auto lg:mx-0">
                Payment Method
            </h2>
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-6">
                <div className="w-full lg:w-1/2">
                    <img
                        src={require('../images/payment-method.gif')}
                        alt="add payment"
                        className="mx-auto w-fit object-cover"
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <h3 className="text-2xl text-bold mb-3 w-fit mx-auto lg:mx-0">
                        Add Payment Method
                    </h3>
                    <p className="text-gray-500 mb-3 text-base w-fit mx-auto lg:mx-0">
                        Provide Your Credit Card Information
                    </p>
                    {/* ENTER PAYMENT */}
                    <div className="rounded-md shadow-inner shadow-gray-400 p-2 sm:p-4">
                        <h4 className="my-2 px-2 sm:px-0 font-bold">
                            Card Number
                        </h4>
                        <div className="flex mb-3 mr-1">
                            <div
                                className="
                            inline-flex items-center py-1 pr-1 ml-1 text-sm text-gray-900 bg-gray-100 rounded-l-md border border-r-0 border-cyan-600 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                            >
                                {/* PAYMENT METHOD OPTIONS */}
                                <Dropdown
                                    dismissOnClick={false}
                                    label={currentOpt}
                                    inline={true}
                                    className=" w-20 text-center"
                                >
                                    <Dropdown.Item
                                        onClick={() => {
                                            setCurrentOpt(masterCard);
                                        }}
                                    >
                                        <RiMastercardFill className="text-2xl block mx-auto  text-red-700" />
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setCurrentOpt(visa);
                                        }}
                                    >
                                        <RiVisaLine className="text-2xl block mx-auto text-emerald-800" />
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setCurrentOpt(payPal);
                                        }}
                                    >
                                        <RiPaypalFill className="text-2xl block mx-auto text-sky-600" />
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setCurrentOpt(bankAcc);
                                        }}
                                    >
                                        <RiBankFill className="text-2xl block mx-auto text-stone-500" />
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                            <input
                                type="text"
                                id="payment"
                                ref={paymentRef}
                                maxLength="16"
                                className="rounded-none rounded-r-lg bg-gray-50 focus:ring-0 text-gray-900  border border-cyan-600 focus:border-cyan-600 block flex-1 min-w-0 w-full text-md p-2.5  dark:bg-gray-700 dark:border-0 dark:placeholder-gray-400 dark:text-white "
                                placeholder="**** - **** - **** - ****"
                            />
                        </div>
                        <button
                            onClick={addMethodHandler}
                            className="text-white mr-1 bg-cyan-600 block w-full sm:w-fit  ml-auto hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-8 py-2.5 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800 transition-all transition-500"
                        >
                            Add Method
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentContent;
