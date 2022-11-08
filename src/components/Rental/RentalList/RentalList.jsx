import RentalCard from "./RentalCard";
import "./rentalList.css";

import { useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import { Dropdown, Navbar, Button, Card } from "flowbite-react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { 
  collection, 
  getDocs, 
  query
} from "firebase/firestore";

const RentalList = () => {
  const [rentals, setRentals] = useState(null);
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
            data: doc.data()
          })
        });
        // Set State
        setRentals(listings);
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchRentals();
  }, []);
  return (
    <div id="rental-list">
      <div className="container mx-auto">
        <div className="filter py-5">
          <div className="container filter-wrap mx-auto  flex justify-between">
            <div className="border border-solid rounded-lg text-gray-600 border-gray-300 py-2 px-3">
              <Dropdown
                label="Dropdown"
                inline={true}>
                <Dropdown.Item>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item>
                  Earnings
                </Dropdown.Item>
                <Dropdown.Item>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="border border-solid rounded-lg text-gray-600 border-gray-300 py-2 px-3">
              <Dropdown
                label="Dropdown"
                inline={true}>
                <Dropdown.Item>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item>
                  Earnings
                </Dropdown.Item>
                <Dropdown.Item>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="border border-solid rounded-lg text-gray-600 border-gray-300 py-2 px-3">
              <Dropdown
                label="Dropdown"
                inline={true}>
                <Dropdown.Item>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item>
                  Earnings
                </Dropdown.Item>
                <Dropdown.Item>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="border border-solid rounded-lg text-gray-600 border-gray-300 py-2 px-3">
              <Dropdown
                label="Dropdown"
                inline={true}>
                <Dropdown.Item>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item>
                  Earnings
                </Dropdown.Item>
                <Dropdown.Item>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="border border-solid rounded-lg text-gray-600 border-gray-300 py-2 px-3">
              <Dropdown
                label="Dropdown"
                inline={true}>
                <Dropdown.Item>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item>
                  Earnings
                </Dropdown.Item>
                <Dropdown.Item>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="border border-solid rounded-lg text-gray-600 border-gray-300 py-2 px-3">
              <Dropdown
                label="Dropdown"
                inline={true}>
                <Dropdown.Item>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item>
                  Earnings
                </Dropdown.Item>
                <Dropdown.Item>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="products-list">
          <div className="products flex flex-wrap w-2/3">
            {rentals?.map((item) => {
              return (
                <RentalCard key={item.id} data={item.data} />
              )
            })}
          </div>
          <div id="map" className="w-1/3">
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentalList;