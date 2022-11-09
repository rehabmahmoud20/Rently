import BeatLoader from "react-spinners/BeatLoader";

function Spinner() {
  return (
    <div className="container flex justify-center">
      <BeatLoader
        color="#0891b2"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
