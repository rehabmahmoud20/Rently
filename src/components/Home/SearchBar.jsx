import { Dropdown, Button } from 'flowbite-react';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const navigate = useNavigate();

    return (
        <>
            <div className="search-container container -mt-48 z-10 relative mx-auto">
                <div className="flex rounded-lg md:drop-shadow-2xl md:max-w-2xl mx-auto md:bg-white">
                    <div className="hidden sm:block">
                        <Dropdown
                            label="Property"
                            dismissOnClick={false}
                            inline={true}
                        >
                            <Dropdown.Item>House</Dropdown.Item>
                            <Dropdown.Item>Villa</Dropdown.Item>
                        </Dropdown>
                    </div>

                    <div className="hidden sm:block">
                        <Dropdown
                            label="Price"
                            dismissOnClick={false}
                            inline={true}
                        >
                            <Dropdown.Item>Price 1</Dropdown.Item>
                            <Dropdown.Item>Price 2</Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div className="hidden sm:block">
                        <Dropdown
                            label="Location"
                            dismissOnClick={false}
                            inline={true}
                        >
                            <Dropdown.Item>Alexandria</Dropdown.Item>
                            <Dropdown.Item>Cairo</Dropdown.Item>
                        </Dropdown>
                    </div>
                    <Button
                        className="mx-auto w-full md:ml-10 md:mr-10"
                        onClick={() => {
                            navigate('/rental-list');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Search
                        <BiSearchAlt className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default SearchBar;
