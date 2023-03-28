import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import Dashboardlayout from "../components/Dashboardlayout";
import ImageCard from "../components/ImageCard";

import {
  pageCounter,
  updateProfilesList,
  uploadProfiles,
} from "../redux/DashboardSlice";
import "./pages.css";
const Dashboard = () => {
  const [isFetching, setIsFetching] = useState(false);
  const listener = useRef(true);
  const { isLoading, pageNumber, profiles } = useSelector(
    (state) => state.dashboard
  );

  const dispatch = useDispatch();
  const increase = () => {
    dispatch(pageCounter());
    setIsFetching(false);
  };
  useEffect(() => {
    if (listener.current) {
      listener.current = false;
      dispatch(uploadProfiles(pageNumber));
    }
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const divRef = useRef(null);
  const handleScroll = () => {
    const container = divRef.current;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + 500 >= scrollHeight - 30;
    if (isAtBottom && !isLoading) {
      increase();
      dispatch(updateProfilesList(pageNumber));
    }
  };
  return (
    <Dashboardlayout notify={true}>
      {isLoading ? (
        <div className="flex flex-col justify-center h-screen">
          <SyncLoader color="#af00ff" loading={true} size={10} />
        </div>
      ) : (
        <div
          ref={divRef}
          onScroll={handleScroll}
          className="layout mb-[4rem] overflow-auto mx-6 pt-20"
        >
          {profiles?.map(
            ({ URL, likes, id, profileImage, profileName }, idx) => {
              return (
                <div key={idx} className="flex justify-center max-w-[786px]  ">
                  <ImageCard
                    src={URL}
                    likes={likes}
                    id={id}
                    profileName={profileName}
                    profileImage={profileImage}
                  />
                </div>
              );
            }
          )}
        </div>
      )}
    </Dashboardlayout>
  );
};

export default Dashboard;
