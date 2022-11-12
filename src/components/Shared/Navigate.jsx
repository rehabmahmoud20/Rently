import { BsChevronUp } from "react-icons/bs";
import "./Navigate.css";
import { useEffect, useState } from 'react';

const Navigate = ({navigate}) => {
    const [showNavigate, setShowNavigate] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 657) {
                setShowNavigate(true);
            }
            else {
                setShowNavigate(false);
            }
        })
    }, [showNavigate]);
    return (
        <div className="navigate-top bg-cyan-600 rounded-lg hover:bg-cyan-700" onClick={navigate} style={{display: showNavigate == false ? "none": "block"}}>
            <BsChevronUp className="navigate text-xl text-center text-white"/>
        </div>
    )
}

export default Navigate;