import RentalCard from "./RentalCard";
import "./rentalList.css";
import Select from 'react-select';
import { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import Spinner from "../../Shared/Spinner";

const RentalList = () => {
  const genderOptions = [
    { value: 'all', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]
  const typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'house', label: 'Houses' },
    { value: 'apartment', label: 'Apartments' }
  ]
  const priceOptions = [
    { value: 'all', label: 'All' },
    { value: 'low', label: '0 : 1000 EGP' },
    { value: 'fair', label: '1000 : 2000 EGP' },
    { value: 'high', label: '2000 : 3000 EGP' },
    { value: 'expensive', label: '3000+ EGP' }
  ]
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFiltered] = useState([]);
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        // get rentals
        const colRef = collection(db, "rentals");
        // Create Query
        const q = query(colRef);
        // Execute Query
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // Set State
        setRentals(listings);
        setFiltered(listings);
      } catch (error) {
        toast.error("Couldn't fetch data");
      }
    };
    fetchRentals();
  }, []);

  // Filter On Genders

  const filterGenders = (e) => {
    const filtered = rentals.filter((item) => {
      if (e.value == "all") {
        return item
      }
      else if (e.value == "female") {
        return item.data.gender
      }
      else {
        return !item.data.gender
      }
    })
    setFiltered(filtered)
  }

  // Filter On Type
  const filterType = (e) => {
    const filtered = filteredRentals.filter((item) => {
      if (e.value == "all") {
        return item
      }
      else if (e.value == "house") {
        return (item.data.aboutRental.type.value == "House" || item.data.aboutRental.type == "House")
      }
      else if (e.value == "apartment") {
        return (item.data.aboutRental.type.value == "Appartment" || item.data.aboutRental.type == "Apartment")
      }
      else {
        console.log(e.value)
        return toast.error("Not Found");
        
      }
    });
    setFiltered(filtered)
  }

  // Filter On Price
  const filterPrice = (e) => {
    const filtered = filteredRentals.filter((item) => {
      if (e.value == "all") {
        return item
      }
      else if (e.value == "low") {
        return (item.data.price <= 1000)
      }
      else if (e.value == "fair") {
        return (item.data.price > 1000 && item.data.price <= 2000)
      }
      else if (e.value == "high") {
        return (item.data.price > 2000 && item.data.price <= 3000)
      }
      else if (e.value == "expensive") {
        return item.data.price > 3000
      }
      else {
        return toast.error("Not Found")
      }
    });
    setFiltered(filtered)
  }
  return (
    <div id="rental-list">
      {rentals.length == 0 ? (
        <Spinner />
      ) : (
        <div className="container mx-auto">
          <div className="filter py-5 mb-5">
            <div className="filter-wrap mx-auto flex flex-start gap-8">
              <div className="flex items-center">
                <span className="text-sm lg:text-base text-gray-600">Gender: &nbsp;</span>
                <Select 
                options={genderOptions} 
                defaultValue="all"
                onChange={filterGenders}/>
              </div>
              <div className="flex items-center">
                <span className="text-sm lg:text-base text-gray-600">Type: &nbsp;</span>
                <Select
                options={typeOptions} 
                defaultValue="all"
                onChange={filterType}
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm lg:text-base text-gray-600">Price: &nbsp;</span>
                <Select 
                options={priceOptions} 
                defaultValue="all"
                onChange={filterPrice}
                />
              </div>
            </div>
          </div>
          <div className="products-list flex w-full mb-5 gap-3">
            <div className="products w-2/3 flex flex-wrap gap-5 overflow-y-scroll">
              {filteredRentals?.map((item) => {
                return <RentalCard key={item.id} resp={item} />;
              })}
            </div>
            <div id="map" className="w-1/3">
              <MapContainer
                center={[31.2, 29.9]}
                zoom={13}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[31.2, 29.9]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalList;