import { useState } from "react";
// *form
import { useForm, Controller } from "react-hook-form";
// *libraries
import Select from "react-select";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

// *Auth
import { getAuth, onAuthStateChanged } from "firebase/auth";

// *firbase sending all data
import { db } from "../../firebase.config";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { async } from "@firebase/util";
import { type } from "@testing-library/user-event/dist/type";

// rental options
const options = [
  { value: "House", label: "House" },
  { value: "Appartment", label: "Appartment" },
];

const EditRental = (prop) => {
  const [imagesUrl, setimagesUrl] = useState([]);
  const [rental, setRental] = useState(false);
  const [formData,setFormData] = useState({
    rentalType: "",
    type: '',
    separateRooms: false,
    name: "",
    airConditioner: false,
    insurance: "",
    bathroom: "",
    availableDate: "",
    wifi: false,
    address: "",
    gender: "",
    Rooms: "",
    price: '',
    pet: false,
    parking: false,
    furnashed: false,
    AvailableRooms: "",
    alevator: false,
    floor: "",
  })

  const params = useParams();

  useEffect(() => {
    const getRentalData = () => {
      const rentals = prop.rental;
      const rentalIDTobeEdited = params.id;
      if (rentals) {
        const rentalTobeEdited = rentals.filter((rental) => {
          return rental.id === rentalIDTobeEdited;
        });
        console.log(rentalTobeEdited)
        setRental(rentalTobeEdited);
        const {
          price,
          gender,
          name,
          features: { alevator, furnashed, parking, airConditioner, wifi, pet },
          aboutRental:{
            area,
            availableDate,
            availableRooms,
            bathroom,
            floor,
            rooms,
            separateRooms,
            type,
              images,
          },
          insurance,
          address,
          overview,

         } = rentalTobeEdited[0];
         
         setFormData({price,address,wifi,overview,insurance,separateRooms, area,
          availableDate,
          availableRooms,
          bathroom,
          floor,
          rooms,alevator, furnashed, parking, airConditioner, wifi, pet, price,
          gender,
          name, type,
          images,})
          // setFormData((prv)=>{return{...prv, rooms,alevator, furnashed, parking, airConditioner, wifi, pet, price}})
      }
      // getRentalData();
    };
    getRentalData();

  }, [prop.rental]);

  const auth = getAuth();
  useEffect(() => {
    const getRental = async () => {
      const rentaRef = doc(db, "rentals", auth.currentUser.uid);

      try {
        const docSnap = await getDoc(rentaRef);
        if (docSnap.exists()) {
          setRental(docSnap.data());
        }
      } catch (error) {
        console.log(error);
        toast.error("Rental doesn't exist");
      }
      // const rentaRef = doc(db,'rentals',auth.currentUser.uid)
      // const docSnap = await getDoc(rentaRef)
      // if(docSnap.exists()){
      //     setRental(docSnap.data())
      // }
    };
    getRental();
  }, []);

  // & update the user data upon adding rental
  const updateUserData = async (rentalId) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    // get the user data
    const usersData = await getDoc(userRef);
    // update the user data
    const { properties } = usersData.data();
    const updateUserData = await updateDoc(userRef, {
      ...usersData.data(),
      properties: [...properties, rentalId],
    });
  };
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
  const sendData = async (data) => {
    const {
      area,
      AvailableRooms,
      alevator,
      floor,
      furnashed,
      parking,
      pet,
      price,
      Rooms,
      gender,
      address,
      wifi,
      availableDate,
      bathroom,
      insurance,
      airConditioner,
      rentalName,
      separateRooms,
      rentalType,
    } = data;
    let newDate = new Date(availableDate).toDateString();
    console.log(newDate);

    const dataCopy = {
      name: rentalName,
      overview: "lorem 5000000000000000000000",
      address,
      insurance: +insurance,
      createdAt: new Date().toDateString(),
      gender,
      price: +price,
      hostID: auth.currentUser.uid,
      images: imagesUrl,
      location: { lng: 29.97773, lat: 31.25526 },
      aboutRental: {
        area,
        availableDate,
        availableRooms: +AvailableRooms,
        bathroom,
        floor: +floor,
        rooms: +Rooms,
        separateRooms,
        type: rentalType.value,
      },
      features: {
        airConditioner,
        alevator,
        furnashed,
        parking,
        pet,
        wifi,
      },
      policy: {
        info: " sit amet consectetur adipisicing elit. Maxime mollitia,molestiae",
        rules: [
          "Available months 6, 12",
          "This property only accepts cash payments.",
          "Available for students",
          "Pets are not allowed",
        ],
      },
      reviews: [
        {
          rate: 5,
          clientID: "",
          feeedback:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          timestamp: "",
        },
      ],
    };
    const docRef = doc(db, "rentals",params.id);
    try {
      //   console.log(dataCopy);
      const docRef = await updateDoc(docRef, dataCopy);
      // const { id } = docRef;
      // updateUserData(id);
      toast.success("data is sent");
    } catch (error) {
      console.log(error);
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
    defaultValues: {
      // // rentalName:formData.rentalName,
      // rentalType: formData.rentalType,
      // select: {},
      // // separateRooms: formData.separateRooms,
      // rentalName: formData.airConditioner,
      // airConditioner: formData.airConditioner,
      // // insurance: formData.insurance,
      // bathroom: formData.bathroom,
      // // availableDate: formData.availableDate,
      // wifi: formData.wifi,
      // // address: formData.address,
      // gender: formData.gender,
      // Rooms: formData.Rooms,
      // // price: formData.price,
      // pet: formData.pet,
      // parking: formData.parking,
      // furnashed: formData.furnashed,
      // AvailableRooms: formData.availableRooms,
      // alevator: formData.alevator,
      // floor: formData.floor,
    },
  });
  return (
    <section className="container mx-auto py-12">
      <form
        onSubmit={handleSubmit((data) => {
          sendData(data);
          reset();
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
                  value={formData.name}
                  onChange={(e)=>{
                    setFormData((prv)=>{
                      return{...prv,name:e.target.value}
                      
                    })
                  }}
                  className="my-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                  {...register("rentalName", { required: "This is required" })}
                />
                {errors.rentalName?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.rentalName.message}
                  </p>
                )}
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
                  value={formData.address}
                  className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                  placeholder=" "
                  {...register("address", { required: "This is required" })}
                />
                {errors.address?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.address.message}
                  </p>
                )}
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
                  value={formData.insurance}
                  className="block mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                  placeholder=" "
                  {...register("insurance", { required: "This is required" })}
                />
                {errors.insurance?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.insurance.message}
                  </p>
                )}
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
                  value={formData.price}
                  className="block mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                  placeholder=" "
                  {...register("price", { required: "This is required" })}
                />
                {errors.price?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.price.message}
                  </p>
                )}
                <label
                  htmlFor="floating_adress"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  price
                  <span className="text-cyan-600 ml-2 inline-block">
                    EGP
                  </span>{" "}
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
                  value={formData.type.value}
                  render={({ field }) => (
                    <Select
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
                  value={formData.availableDate}
                  className="my-4   border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full   p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-600 dark:focus:border-cyan-600 datepicker-input"
                  placeholder="Select date"
                  {...register("availableDate", {
                    required: "This is required",
                  })}
                />
                {errors.availableDate?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.availableDate.message}
                  </p>
                )}
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
                value={formData.area}

                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                {...register("area", { required: "This is required" })}
              />
              {errors.area?.type === "required" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.area.message}
                </p>
              )}
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
                type="text"
                name="bathroom"
                id="floating_bathroom"
                value={formData.bathroom}

                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                {...register("bathroom", { required: "This is required" })}
              />
              {errors.bathroom?.type === "required" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.bathroom.message}
                </p>
              )}
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
                value={formData.rooms}

                min={1}
                id="floating_Rooms"
                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                {...register("Rooms", { required: "This is required" })}
              />
              {errors.Rooms?.type === "required" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.Rooms.message}
                </p>
              )}
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
                value={formData.availableRooms}

                id="floating_Available-rooms"
                min={1}
                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                {...register("AvailableRooms", {
                  required: "This is required",
                })}
              />
              {errors.AvailableRooms?.type === "required" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.AvailableRooms.message}
                </p>
              )}

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
                value={formData.floor}
                id="floating_Floor"
                min={1}
                className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                {...register("floor", { required: "This is required" })}
                {...register("floor", {
                  required: "This is required",
                  max: { value: 30, message: "Highest floor is 30" },
                })}
              />
              {errors.floor?.type === "required" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.floor.message}
                </p>
              )}
              {errors.Floor?.type === "max" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.Floor.message}
                </p>
              )}
              <label
                htmlFor="floating_Floor"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Floor
              </label>
            </div>
          </div>
          {/* </div> */}

          {/* </section> */}
          {/* ===================================================== rental Features ================================================ */}
          <div className="grid md:grid-cols-4 md:gap-10 mb-5">
            {/* separate rooms */}
            <div className="flex items-center my-4">
              <input
                id="separateRooms"
                type="checkbox"
                checked={formData.separateRooms}
                name="separateRooms"
                {...register("separateRooms")}
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
              />
              <label
                htmlFor="separateRooms"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Separate rooms
              </label>
            </div>
            {/* air conditioner */}
            <div className="flex items-center my-4">
              <input
                id="air-conditioner"
                type="checkbox"
                checked={formData.airConditioner}
                name="airConditioner"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                {...register("airConditioner")}
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
                checked={formData.alevator}
                name="alevator"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                {...register("alevator")}
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
                checked={formData.parking}
                name="furnashed"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                {...register("furnashed")}
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
                checked={formData.parking}
                name="parking"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                {...register("parking")}
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
                checked={formData.pet}
                name="pet"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                {...register("pet")}
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
                checked={formData.wifi}
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                {...register("wifi")}
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
          {/* gender */}
          <div className="gender">
            <label className="text-sm text-gray-500 ">Gender</label>

            {/* male */}
            <div className="flex items-center my-4 ">
              <input
                id="male"
                type="radio"
                checked={formData.gender}
                name="gender"
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                {...register("gender")}
              />
              <label
                htmlFor="male"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Male
              </label>
            </div>

            {/* f e m a l e */}
            <div className="mb-5">
              <input
                id="female"
                type="radio"
                checked={formData.gender}
                value={formData.gender}
                name="gender"
                className=" w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                {...register("gender")}
              />
              <label
                htmlFor="female"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Female
              </label>
            </div>
          </div>

          {/* images */}
          <div className="relative z-0 mb-6  group  ">
            <label className="text-sm text-gray-500  " htmlFor="file_input">
              Upload rental photos
            </label>
            <input
              className="mt-4 w-50 lg:w-full block  text-sm text-gray-900 bg-cyan-600 rounded-lg   hover:bg-cyan-700 text-white cursor-pointer dark:text-gray-400 focus:outline-none  dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="images"
              accept="image/*"
              max="5"
              multiple
              onChange={handlechange}
              {...register("images", { required: "This is required" })}
            />
            {errors.images?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.images.message}
              </p>
            )}
          </div>
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
  );
};

export default EditRental;
