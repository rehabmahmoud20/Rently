// import BeatLoader from 'react-spinners/BeatLoader';
import HashLoader from 'react-spinners/HashLoader';
const Spinner = () => {
    return (
        <div className="container flex justify-center">
            {/* <BeatLoader
                color="#0891b2"
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> */}
            <HashLoader
                color={'0891b2'}
                loading={true}
                cssOverride={{
                    position: 'fixed',
                    top: '45%',
                    left: '45%',
                    transform: 'translate:(-50%, -50%)',
                }}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};
export default Spinner;
