import { useSelector, useDispatch } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { 
  collection, 
  getDocs, 
  query,
  limit
} from "firebase/firestore";
import { db } from "../../firebase.config";
import RentalCard from "../Rental/RentalList/RentalCard";
import Spinner from "../Shared/Spinner";
import "./favorites.css";

const Favourits = () => {
  const state = useSelector((state) => state.user.userData);
  const [properties, setProperties] = useState([]);
  const dispatchEvent = useDispatch();
  const getProperties = async () => {
    try {
        const listRef = collection(db, 'rentals');
        const q = query(listRef, limit(10));
        const querySnap = await getDocs(q);
        const rents = [];
        querySnap.forEach((doc) => {
            state.fav.includes(doc.id) && rents.push({data: doc.data(), id: doc.id});
            setProperties(rents);
        });
    } catch (error) {
        toast.error("Data Not Found!")
    }
  };
  useEffect(() => {
    state && getProperties();
  }, [state]);
  return (
    <div className="favorites py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-cyan-600 text-center">
          Your Favorite List
        </h2>
        <p className=" font-bold text-gray-500 text-center mb-10 text-xl">
          Total properties : {properties.length}
        </p>
        {properties.length == 0 ? (
          <Spinner />
        ) : (
          <div className="products w-full flex justify-center flex-wrap gap-10">
              {properties?.map((item) => {
                return (
                  <RentalCard key={item.id} resp={item} />
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favourits;