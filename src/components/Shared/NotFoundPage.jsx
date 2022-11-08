import React from "react";
import notfoundImg from "../../assets/images/not-found.gif";

const NotFoundPage = () => {
  return (
    <div className="container h-96">
      <img scr={notfoundImg} alt="error" className="w-full h-full" />
    </div>
  );
};

export default NotFoundPage;
