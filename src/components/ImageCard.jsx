import dayjs from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { DPIconFilledHeart, DPIconHeart } from "../assets/images/icons";
import { getUserData, likeAPost } from "../redux/DashboardSlice";
import "./image.css";
const ImageCard = ({ src, profileImage, id, profileName }) => {
  const { userData } = useSelector((state) => state.dashboard);
  const { limit, nextTime } = userData;
  const dispatch = useDispatch();
  const [forLike, setForLike] = useState(false);
  const formatDate = dayjs(nextTime).format("ddd DD/MM hh:mm");
  const getLike = () => {
    setForLike((prev) => !prev);
    dispatch(likeAPost(id)).then(() => {
      dispatch(getUserData());
      if (!limit) return;
      toast.error(
        `You have reached your 100 likes daily limit! Come back at ${formatDate}`
      );
    });
  };

  return (
    <div className="image-container">
      <div className="flex gap-2 items-center absolute top-5 left-5 text-white text-sm">
        <img
          src={profileImage}
          alt=""
          className="w-[45px] h-[45px] rounded-full object-cover"
        />
        <p>{`@ ${profileName}`}</p>
      </div>
      <img
        src={src}
        alt=""
        width="100%"
        height="100%"
        className="w-full object-cover h-3/4 rounded-[1rem]"
      />
      <div
        onClick={getLike}
        className={`absolute rounded-full ${
          forLike ? "bg-light-purple" : "bg-white"
        } p-4 md:p-5  shadow-2xl left-[1rem] bottom-[1rem] z-2`}
      >
        {forLike ? <DPIconFilledHeart /> : <DPIconHeart />}
      </div>
    </div>
  );
};

export default ImageCard;
