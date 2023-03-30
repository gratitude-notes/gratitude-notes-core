import React, { useRef } from 'react';
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { ComponentVisbilityProps } from '../../hooks/useComponentVisible';
import { useState, useEffect } from "react";
import { ViewState } from '../../pages/Dashboard';

type NotificationState = {
  updateViewState: (state: ViewState) => void
}

const WebNotification: React.FC<NotificationState> = ({ updateViewState }) => {
  const [show, setShow] = useState(false);

  const [modalVisible, setModalVisible] = useState<ComponentVisbilityProps>({
    isComponentVisible: false,
    ref: useRef(null),
    setComponentVisible: () => {},
  });


  useEffect(() => {
      setShow(true);
    }, []);

    function handleView() {
      console.log("View Week in Review");
      setShow(false);
      setModalVisible({
          ...modalVisible,
          isComponentVisible: true,
        });
    }

  function handleLater() {
    console.log("View Later");
    setShow(false);
  }

  return (
    <>
      {show && (
        <div className="fixed bottom-4 right-4">
          <div className="bg-cyan-300 text-gray-800 py-4 px-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-2 flex items-center">
              <BsFillCalendarWeekFill className="mr-2" />
              Week in Review
            </h2>
            <p className="mb-4"> Would you like to view your week in review?</p>
            <div className="flex justify-center space-x-4">
            <button
                onClick={handleLater}
                className="px-7 py-2 bg-gray-700 text-white rounded-md shadow-md">
                Later
              </button>
              <button
                onClick={() => {handleView(); updateViewState("Week Review")}}
                className="px-7 py-2 bg-cyan-500 text-white rounded-md shadow-md">
                View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebNotification;