import React from "react";
import NotfoundImg from "../../assets/images/not-found.gif";

const NotFoundPage = () => {
  return (
    <div className="container h-96">
      <img scr={NotfoundImg} alt="error" className="w-full h-full" />
    </div>
  );
};

export default NotFoundPage;
