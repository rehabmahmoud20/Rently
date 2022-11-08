import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const Overview = () => {
  const position = [51.505, -0.09];
  return (
    <div id="overview" className="h-auto mb-4">
      <p className="text-2xl mb-2">overview</p>
      <p className="mb-2 text-neutral-400">
        3 Bedrooms+Den ; 2.5 Bathrooms, Brand New Kitchen, Stainless Steel
        Appliances, Dishwasher, Microwave, Formica Countertops, Private Garage,
        Corner Unit.
      </p>

      <div className="w-full h-[300px]">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Overview;
