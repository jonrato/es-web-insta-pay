import React from "react";
import cellPhone from "../assets/images/cellphone.png";
import emailIcon from "../assets/images/email.png";
import shuffle from "../assets/images/shuffle.png";
import contactCard from "../assets/images/contact-card.png";
import { useState } from "react";
import {
  DPIconContactCard,
  DPIconEmail,
  DPIconMobilePhone,
  DPIconShuffle,
} from "../assets/images/icons";
const Pixtype = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const pixType = [
    {
      image: <DPIconContactCard />,
      text: "CPF/CNPJ",
    },
    {
      image: <DPIconMobilePhone />,
      text: "Telefoone",
    },
    {
      image: <DPIconEmail />,
      text: "Email",
    },
    {
      image: <DPIconShuffle />,
      text: "Aleatória",
    },
  ];
  return (
    <div className="flex gap-5 mb-7">
      {pixType?.map(({ image, text }, index) => {
        return (
          <div
            key={index}
            onClick={() => setActiveBtn(index)}
            className={`flex flex-col justify-center  items-center ${
              activeBtn === index ? "bg-dark-purple text-white" : ""
            } rounded-full w-16 h-16 border border-grey`}
          >
            {image}
            <p className="text-[0.56rem]">{text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Pixtype;
