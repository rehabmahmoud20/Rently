import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useForm, Controller } from "react-hook-form";
// *libraries
import Select from "react-select";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Carousel } from "flowbite-react";

// *Auth
import { getAuth, onAuthStateChanged } from "firebase/auth";

// *firbase sending all data
import { db } from "../../firebase.config";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

import Spinner from "../Shared/Spinner";

// rental options
const options = [
  { value: "House", label: "House" },
  { value: "Appartment", label: "Appartment" },
];

const EditRental = (prop) => {
  const [loader, setLoader] = useState(false);
  const [imagesUrl, setimagesUrl] = useState([]);
  const [rental, setRental] = useState(null);
  const [gender, genderShow] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getRentalData = () => {
      const rentals = prop.rental;

      const rentalIDTobeEdited = params.id;
      const rentalTobeEdited = rentals.filter((rental) => {
        return rental.id === rentalIDTobeEdited;
      });
      setRental(...rentalTobeEdited);
      if (rentalTobeEdited[0].aboutRental.separateRooms) {
        genderShow(true);
      } else {
        genderShow(false);
      }
    };
    prop.rental && getRentalData();
  }, [prop.rental]);


  // convert imagesUrl
  const convertToBase64 = (e) => {
    const images = [],
      fileReaders = [];
    const { files } = e.target;
    const myfilesArr = Array.from(files);
    if (myfilesArr.length) {
      myfilesArr.forEach((file) => {
        const fileReader = new FileReader(); //create file reader for each image
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result); //[] of  base 64 for each image
          }
          if (images.length === myfilesArr.length) {
            setimagesUrl(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };
  // & send the user data upon adding rental

  const handleUpadteData = async (data) => {
    try {
      setLoader(true)
      const docRef = doc(db, "rentals", params.id);
      //handle image if not found
      const newImage = imagesUrl.length === 0 ? rental.images : imagesUrl;
      //handle property type if not found
      const newType = data.rentalType
        ? data.rentalType
        : rental.aboutRental.type;

      await updateDoc(docRef, {
        ...rental,
        aboutRental: { ...rental.aboutRental, type: newType },
        images: newImage,
      });

      toast.success("data is sent");
      navigate("/rental-list");
    } catch (error) {
      toast.error("data is is not sent");
    }
  };

  const handlechange = (e) => {
    convertToBase64(e);
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return rental && !loader ? (
    <section className="px-0 sm:px-5  container py-5  h-screen overflow-auto mb-5">
     <form
        onSubmit={handleSubmit((data) => {
          handleUpadteData(data);
        })}
      >
        <section className="about-rental">
          <h2 className=" mb-6 text-3xl text-cyan-600">Rental information</h2>
          <div className="p-8 mb-20 shadow-lg shadow-gray-300 rounded-2xl">
            <div className="grid md:grid-cols-2 md:gap-10">
              {/* RENTAL NAME */}
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="rentalName"
                  id="floating_text"
                  placeholder=" "
                  value={rental.name || ''}
                  onChange={(e) => {
                    setRental((prv) => {
                      return {
                        ...prv,
                        name: e.target.value,
                      };
                    });
                  }}
                  className="my-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                />

                <label
                  htmlFor="floating_text"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Rental name
                </label>
              </div>
              {/* adress */}
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="address"
                  id="floating_address"
                  value={rental.address || ''}
                  className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setRental((prv) => {
                      return {
                        ...prv,
                        address: e.target.value,
                      };
                    });
                  }}
                />

                <label
                  htmlFor="floating_address"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  address
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-10">
              {/* insurance */}
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="insurance"
                  id="floating_insurance"
                  value={rental.insurance || ''}
                  className="block mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setRental((prv) => {
                      return {
                        ...prv,
                        insurance: +e.target.value,
                      };
                    });
                  }}
                />

                <label
                  htmlFor="floating_adress"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  insurance
                </label>
              </div>
              {/* price */}
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="price"
                  id="floating_price"
                  value={rental.price || '' }
                  className="block mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setRental((prv) => {
                      return {
                        ...prv,
                        price: +e.target.value,
                      };
                    });
                  }}
                />

                <label
                  htmlFor="floating_adress"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  price
                  <span className="text-cyan-600 ml-2 inline-block">EGP</span>
                  /Month
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-10 mb-2">
              {/* rental select type */}
              <div>
                <label className="text-sm text-gray-500 ">Rental type</label>
                <Controller
                  name="rentalType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={
                        options[
                          options.findIndex((opt) => {
                            return opt.value === rental.aboutRental.type.value;
                          })
                        ]
                      }
                      {...field}
                      options={options}
                      className="my-4 text-cyan-600 "
                    />
                  )}
                />
              </div>

              {/* date */}
              <div className="relative ">
                <label className="text-sm text-gray-500 ">Available date</label>
                <input
                  type="date"
                  name="availableDate"
                  value={new Date(rental.aboutRental.availableDate)
                    .toISOString()
                    .slice(0, 10) || ''}
                  className="my-4   border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full   p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-600 dark:focus:border-cyan-600 datepicker-input"
                  placeholder="Select date"
                  onChange={(e) => {
                    setRental((prv) => {
                      return {
                        ...prv,
                        aboutRental: {
                          ...prv.aboutRental,
                          availableDate: new Date(
                            e.target.value
                          ).toDateString(),
                        },
                      };
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        {/* ===================================================== rental features ================================================ */}
        <h2 className=" mb-6 text-3xl text-cyan-600 ">Rental features</h2>
        <div className="p-8 mb-24 shadow-lg shadow-gray-300 rounded-2xl">
          <div className="grid md:grid-cols-2 md:gap-10">
            {/* Area */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="area"
                id="floating_area"
                value={rental.aboutRental.area || ''}
                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      aboutRental: {
                        ...prv.aboutRental,
                        area: +e.target.value,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="floating_area"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Area
                <span className="text-cyan-600 ml-2 inline-block">
                  m<sup>2</sup>
                </span>
              </label>
            </div>
            {/* bathroom */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="bathroom"
                id="floating_bathroom"
                value={rental.aboutRental.bathroom || ''}
                min={1}
                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      aboutRental: {
                        ...prv.aboutRental,
                        bathroom: +e.target.value,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="floating_bathroom"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Bathrooms
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-3 md:gap-10">
            {/* Rooms */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="Rooms"
                value={rental.aboutRental.rooms || ''}
                min={1}
                id="floating_Rooms"
                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      aboutRental: {
                        ...prv.aboutRental,
                        rooms: +e.target.value,
                      },
                    };
                  });
                }}
              />

              <label
                htmlFor="floating_Rooms"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Rooms
              </label>
            </div>
            {/* Available-rooms */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="AvailableRooms"
                value={rental.aboutRental.availableRooms || ''}
                id="floating_Available-rooms"
                min={1}
                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      aboutRental: {
                        ...prv.aboutRental,
                        availableRooms: +e.target.value,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="floating_Available-rooms"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Available-rooms
              </label>
            </div>
            {/* Floor */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="floor"
                value={rental.aboutRental.floor || ''}
                id="floating_Floor"
                min={1}
                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      aboutRental: {
                        ...prv.aboutRental,
                        floor: +e.target.value,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="floating_Floor"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Floor
              </label>
            </div>
          </div>
          {/* ===================================================== rental Features ================================================ */}
          <div className="grid md:grid-cols-2 md:gap-10 mb-5">
            {/* separate rooms */}
            <div className="flex items-center my-4">
              <input
                id="separateRooms"
                type="checkbox"
                checked={rental.aboutRental.separateRooms || ''}
                name="separateRooms"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      aboutRental: {
                        ...prv.aboutRental,
                        separateRooms: +e.target.checked,
                      },
                    };
                  });
                  if (e.target.checked === true) {
                    genderShow(true);
                  } else {
                    genderShow(false);
                  }
                }}
              />
              <label
                htmlFor="separateRooms"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Separate rooms
              </label>
            </div>
            {/* gender */}
            {gender ? (
              <div className="gender flex items-center">
                <label className="text-sm text-gray-500 ">Gender</label>
                <div className="flex items-center">
                  {/* male */}
                  <div className="flex items-center ">
                    <input
                      id="male"
                      type="radio"
                      checked={rental.aboutRental.gender === "male"}
                      name="gender"
                      className="w-4 h-4 ml-6 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                      onChange={(e) => {
                        setRental((prv) => {
                          return {
                            ...prv,
                            aboutRental: { ...prv.aboutRental, gender: "male" },
                          };
                        });
                      }}
                    />
                    <label
                      htmlFor="male"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Male
                    </label>
                  </div>

                  {/* f e m a l e */}
                  <div className="ml-10 flex items-center ">
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      checked={rental.aboutRental.gender === "female"}
                      className=" w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                      onChange={(e) => {
                        setRental((prv) => {
                          return {
                            ...prv,
                            aboutRental: {
                              ...prv.aboutRental,
                              gender: "female",
                            },
                          };
                        });
                      }}
                    />
                    <label
                      htmlFor="female"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="grid md:grid-cols-4 md:gap-10 mb-5">
            {/* air conditioner */}
            <div className="flex items-center my-4">
              <input
                id="air-conditioner"
                type="checkbox"
                checked={rental.features.airConditioner}
                name="airConditioner"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      features: {
                        ...prv.features,
                        airConditioner: e.target.checked,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="air-conditioner"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Air conditioner
              </label>
            </div>
            {/* Elevator */}
            <div className="flex items-center my-4">
              <input
                id="alevator"
                type="checkbox"
                checked={rental.features.alevator}
                name="alevator"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      features: {
                        ...prv.features,
                        alevator: e.target.checked,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="alevator"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Elevator
              </label>
            </div>
            {/* Furnashed */}
            <div className="flex items-center my-4">
              <input
                id="furnashed"
                type="checkbox"
                checked={rental.features.furnashed}
                name="furnashed"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      features: {
                        ...prv.features,
                        furnashed: e.target.checked,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="furnashed"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                furnashed
              </label>
            </div>

            {/* Parking */}
            <div className="flex items-center my-4">
              <input
                id="parking"
                type="checkbox"
                checked={rental.features.parking}
                name="parking"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      features: {
                        ...prv.features,
                        parking: e.target.checked,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="parking"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Parking
              </label>
            </div>
            {/* Pet */}
            <div className="flex items-center my-4">
              <input
                id="pet"
                type="checkbox"
                checked={rental.features.pet}
                name="pet"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      features: {
                        ...prv.features,
                        pet: e.target.checked,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="pet"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                pet
              </label>
            </div>
            {/* WIFI */}
            <div className="flex items-center my-4">
              <input
                id="wifi"
                name="wifi"
                type="checkbox"
                checked={rental.features.wifi}
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                onChange={(e) => {
                  setRental((prv) => {
                    return {
                      ...prv,
                      features: {
                        ...prv.features,
                        wifi: e.target.checked,
                      },
                    };
                  });
                }}
              />
              <label
                htmlFor="wifi"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                wifi
              </label>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-10 p-8 mb-24 shadow-lg shadow-gray-300 rounded-2xl">
          {/* images */}
          <div className="relative z-0 mb-6  group  ">
            <label className="text-sm text-gray-500  " htmlFor="file_input">
              Upload rental photos
            </label>
            <input
              className="mt-4 w-full block  text-sm text-gray-900 bg-cyan-600 rounded-lg   hover:bg-cyan-700 text-white cursor-pointer dark:text-gray-400 focus:outline-none  dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="images"
              accept="image/*"
              max="5"
              multiple
              onChange={handlechange}
            />
          </div>
          <Carousel slide={false} className="change-carousel w-3/4">
            {imagesUrl.map((image, idx) => {
              return (
                <React.Fragment key={idx}>
                  <img src={image} alt="image" className="h-full" />
                </React.Fragment>
              );
            })}
          </Carousel>
        </div>

        <div className="  mx-auto w-fit">
          <button
            type="submit"
            className=" text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-3 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2 text-center "
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  ) : (
    <Spinner />
  );
};

export default EditRental;
