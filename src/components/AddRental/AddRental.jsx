import { useState } from "react";
// *form
import { useForm, Controller } from "react-hook-form";
// *libraries
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// *Auth
import { getAuth, onAuthStateChanged } from "firebase/auth";

// *firbase sending all data
// import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

// *images firebase uploading
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// rental options
const options = [
  { value: "House", label: "House" },
  { value: "Appartment", label: "Appartment" },
];
// const storageRef = ref();

const AddRental = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const auth = getAuth();
  // &handle sending images
  const sendImages = () => {
    // store image in firebase
    // const storageRef = ref(storage, "image/" + fileName);

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        // storage initialization
         const storage = getStorage();

        const fileName = `${auth.currentUser.uid}-${image.name}-{uuidv4}`;
        
        const storageRef = ref(storage, "image/" + fileName);
      });
    };
  };
  // &handle sending data to the backend
    const getData = () => {
      const collecRef = collection(db, "rentals");
      // get the data
      getDocs(collecRef).then((snapshot) => {
        console.log(snapshot.docs);
        let rentals = [];
        snapshot.docs.forEach((doc) => {
          rentals.push({ ...doc.data(), id: doc.id });
        });
        console.log(rentals);
      });
      //////////////////////////////////////////////////////////////

    };
// 
const sendData = async (data) => {
  const {
    area,
    AvailableRooms,
    alevator,
    floor,
    furnashed,
    parking,
    pet,
    Price,
    Rooms,
    gender,
    address,
    id,
    wifi,
    availableDate,
    images,
    insurance,
    airConditioner,
    rentalName,
    separateRooms,
    rentalType,
  } = data;

  let newDate = new Date(availableDate).toDateString()
  console.log(newDate)
  // newDate

  const dataCopy = {
    name: rentalName,
    overview: "lorem 5000000000000000000000",
    address,
    insurance:insurance,
    createdAt: new Date().toDateString(),
    gender,
    price: Price,
    hostID: auth.currentUser.uid,
    images: imageUrls,
    location: { lng: 29.97773, lat: 31.25526 },
    aboutRental: {
      area,
      availableDate,
      availableRooms: AvailableRooms,
      bathroom: 1,
      floor,
      rooms: Rooms,
      separateRooms,
      type: rentalType,
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
    ],
  };
  const collecRef = collection(db, "rentals");
  // console.log(dataCopy)
  try {
    const docRef = await addDoc(collection(db, "rentals"), dataCopy);
   // const sendData = await setDoc(doc(db,'rentals'))
    console.log(dataCopy)
    toast.success("data is sent");
  } catch (error) {
    toast.error("data is is not sent");
  }
};

  

// &convert to base64
const converTOBase64=(formImages)=>{

  const myfilesArr = Array.from(formImages)
  console.log(myfilesArr)

  setImageFiles([...myfilesArr])
  console.log(imageFiles)
  const images = [], fileReaders = [];
  if (imageFiles.length) {
    imageFiles.forEach((file) => {
      const fileReader = new FileReader();  //create file reader for each image
      fileReaders.push(fileReader);
      fileReader.onload = (e) => {
        const { result } = e.target;

        if (result) {
          images.push(result)  //[] of  base 64 for each image
        }
        if (images.length === imageFiles.length ) {
          setImageUrls([...images]);
          console.log(imageUrls)
        }
      }
      fileReader.readAsDataURL(file);

    })
  };

}
const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <section className="container mx-auto py-12">
      <form
        onSubmit={handleSubmit((data) => {
          converTOBase64(data.images)
          getData();
          sendData(data)
          // console.log(new Date().toDateString())
          
          // console.log(data.images);
          console.log(data);
        })}
      >
        <section className="about-rental">
          <h2 className=" mb-6 text-3xl text-gray-800">Rental information</h2>
          <div className="grid md:grid-cols-2 md:gap-10">
            {/* RENTAL NAME */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="rentalName"
                id="floating_text"
                placeholder=" "
                className="my-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                {...register("rentalName", { required: "This is required" })}
              />
              {errors.name?.type === "required" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.name.message}
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
          <div className="grid md:grid-cols-3 md:gap-10">
            {/* id */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="id"
                id="floating_id"
                className="block mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                {...register("id", { required: "This is required" })}
              />
              {errors.id?.type === "required" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.id.message}
                </p>
              )}
              <label
                htmlFor="floating_adress"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Id
              </label>
            </div>
            {/* insurance */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="insurance"
                id="floating_insurance"
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
            {/* Price */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="Price"
                id="floating_Price"
                className="block mb-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                placeholder=" "
                {...register("Price", { required: "This is required" })}
              />
              {errors.Price?.type === "required" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.Price.message}
                </p>
              )}
              <label
                htmlFor="floating_adress"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>
          </div>
        </section>
        {/* ===================================================== rental information ================================================ */}
        <section className="rental-information">
          <div className="grid md:grid-cols-4 md:gap-10">
            {/* Area */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="area"
                id="floating_area"
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
                area
              </label>
            </div>
            {/* Rooms */}
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="Rooms"
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

          <div className="grid md:grid-cols-2 md:gap-10 mb-2">
            {/* rental select type */}
            <div>
              <label className="text-sm text-gray-500 ">Rental type</label>
              <Controller
                name="rentalType"
                control={control}
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
                className="my-4   border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full   p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-600 dark:focus:border-cyan-600 datepicker-input"
                placeholder="Select date"
                {...register("availableDate", { required: "This is required" })}
              />
              {errors.availableDate?.type === "required" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.availableDate.message}
                </p>
              )}
            </div>
          </div>
        </section>
        {/* ===================================================== rental Features ================================================ */}
        <section className="grid md:grid-cols-4 md:gap-10 mb-5">
          {/* separate rooms */}
          <div className="flex items-center my-4">
            <input
              id="separateRooms"
              type="checkbox"
              value=""
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
              value=""
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
              id="Elevator"
              type="checkbox"
              value=""
              name="Elevator"
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
              {...register("Elevator")}
            />
            <label
              htmlFor="Elevator"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Elevator
            </label>
          </div>
          {/* Furnashed */}
          <div className="flex items-center my-4">
            <input
              id="Furnashed"
              type="checkbox"
              value=""
              name="Furnashed"
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
              {...register("Furnashed")}
            />
            <label
              htmlFor="Furnashed"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Furnashed
            </label>
          </div>

          {/* Parking */}
          <div className="flex items-center my-4">
            <input
              id="Parking"
              type="checkbox"
              value=""
              name="Parking"
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
              {...register("Parking")}
            />
            <label
              htmlFor="Parking"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Parking
            </label>
          </div>
          {/* Pet */}
          <div className="flex items-center my-4">
            <input
              id="Pet"
              type="checkbox"
              value=""
              name="Pet"
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
              {...register("Pet")}
            />
            <label
              htmlFor="Pet"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Pet
            </label>
          </div>
          {/* WIFI */}
          <div className="flex items-center my-4">
            <input
              id="wifi"
              name="wifi"
              type="checkbox"
              value=""
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
        </section>
        {/* gender */}
        <label className="text-sm text-gray-500 ">Gender</label>

        <div className="flex items-center my-4 ">
          <input
            id="male"
            type="radio"
            value="male"
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
            value="female"
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

        {/* images */}
        <div className="relative z-0 mb-6 w-full group">
          <label className="text-sm text-gray-500  " htmlFor="file_input">
            Upload rental photos
          </label>
          <input
            className="mt-4 w-1/4 block text-sm text-gray-900 bg-cyan-600 rounded-lg   hover:bg-cyan-700 text-white cursor-pointer dark:text-gray-400 focus:outline-none  dark:placeholder-gray-400"
            id="file_input"
            type="file"
            name="images"
            accept="image/*"
            
            max="5"
            multiple
            {...register("images", { required: "This is required" })}
          />
          {errors.images?.type === "required" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.images.message}
            </p>
          )}
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

export default AddRental;
