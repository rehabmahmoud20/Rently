import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const Overview = (props) => {
  const position = [props.data.location.lat, props.data.location.lng];
  return (
    <div id="overview" className="h-auto mb-4">
      <p className="text-2xl mb-2">overview</p>
      <p className="mb-2 text-gray-500">{props.data.overview}</p>

      <div className="w-full h-[300px]  ">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
          className=""
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
