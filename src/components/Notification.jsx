import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import insta from "../assets/images/instaLogo.png";

const Notification = () => {
  const { userData } = useSelector((state) => state.dashboard);
  const { balance } = userData;
  const navigate = useNavigate();
  const checkout = () => {
    navigate("/checkout");
  };
  return (
    <div className="fixed top-0 z-10 w-full flex bg-white justify-between items-center px-5 py-2 mb-2">
      <img src={insta} alt="" className="w-[15%] mr-7" />
      <div>
        <p className="font-bold text-sm px-4 py-2 rounded-md text-white mr-10 bg-dark-purple md:text-2xl">
          R$ {balance}
        </p>
      </div>
      <p
        onClick={checkout}
        className=" text-white bg-dark-purple px-4 py-2 text-sm font-semibold rounded"
      >
        SACAR
      </p>
    </div>
  );
};

export default Notification;
