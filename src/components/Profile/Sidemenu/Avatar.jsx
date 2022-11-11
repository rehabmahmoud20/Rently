import userPic from "../images/user-avatar.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Avatar = () => {
  const navigate = useNavigate();
  const userData = { ...useSelector((state) => state.user.userData) };
  return (
    <div className="p-3 cursor-pointer" onClick={() => navigate("/profile")}>
      <div className="flex gap-0 sm:gap-2 justify-center">
        <img
          className="w-10 h-10 object-cover rounded-full transition-all duration-500"
          src={userData.avatar ? userData.avatar : userPic}
          alt="profile"
        />
        <div className="font-medium text-lg dark:text-white hidden md:block transition-all duration-500">
          <div className="dark:text-white text-center">
            {userData ? userData.username : ""}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-300">
            Joined in : {userData.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
