import React from "react";
import NOT_FOUND from "./../../Assets/404_Error_Page_not_Found.svg";
function NotFoundPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden bg-blue-50">
      <img src={NOT_FOUND} className="w-1/3" alt=""></img>
    </div>
  );
}

export default NotFoundPage;
