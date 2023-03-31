import React from "react";
// import { useNavigate } from "react-router-dom";
import Dashboardlayout from "../components/Dashboardlayout";
import profile from "../assets/images/profile.png";
import userIcon from "../assets/images/userIcon.png";
import { useSelector } from "react-redux";
import Pixtype from "../components/Pixtype";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { DPIconUser } from "../assets/images/icons";
const Checkout = () => {
  const { userData } = useSelector((state) => state.dashboard);
  const { name, email, balance } = userData;
  const [checkoutValue, setCheckoutValue] = useState("");

  const bal = balance.toString();
  useEffect(() => {
    setCheckoutValue(bal);
  }, []);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    if (/^[0-9]*$/.test(inputValue)) {
      setCheckoutValue(inputValue);
    }
  };
  return (
    <Dashboardlayout>
      <div className="bg-white py-3 px-4 mt-20 rounded-2xl">
        <div className="flex items-center gap-2 w-full mb-4">
          <DPIconUser />
          <div>
            <h1 className="text-sm font-bold">{name}</h1>
            <p className="text-sm">{email}</p>
          </div>
        </div>
        <div className="border-b border-grey pb-3 mb-4">
          <p className="text-sm text-grey font-thin">Tu Billetera</p>
          <h2 className="font-bold text-xl">
            <span className="text-dark-purple">$ </span>
            {balance}
          </h2>
        </div>
        <h3 className="text-sm mb-3">Seleccione su tipo de clave</h3>
        <Pixtype />
        <div className=" flex items-center py-2 px-3 text-white text-sm gap-3 bg-black rounded-[0.7rem] mb-3">
          <input
            type="text"
            placeholder="Ingrese su email PayPal aquí"
            style={{ color: 'white', backgroundColor:'black'}}
            className="pl-8 outline-none border border-black w-full font-semibold rounded-[0.7rem] h-[2rem]"
          />
        </div>
        <div className="relative">
          <span className="text-dark-purple font-bold absolute left-2 top-[0.25rem]">
            $
          </span>

          <input
            type="text"
            name="balance"
            id="balance"
            value={checkoutValue}
            onChange={handleChange}
            className="pl-8 outline-none border border-black w-full font-semibold rounded-[0.7rem] h-[2rem]"
          />
        </div>
        <div className="flex justify-center mt-3">
          <button
            onClick={() => toast.success(`Você sacou acabou de sacar ${checkoutValue}`)}
            disabled={
              checkoutValue.length === 0 ||
              checkoutValue !== bal ||
              checkoutValue === "0"
            }
            className={`py-2 px-7 w-full ${
              checkoutValue.length === 0 ||
              checkoutValue > bal ||
              checkoutValue === "0"
                ? "bg-grey"
                : "bg-dark-purple"
            } mt-2 text-white font-bold rounded-[0.7rem]`}
          >
            Retirar
          </button>
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default Checkout;
