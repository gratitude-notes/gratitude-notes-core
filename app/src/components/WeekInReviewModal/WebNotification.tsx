import React, { useRef } from 'react';
import WordCloud from 'react-d3-cloud';
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { ComponentVisbilityProps } from '../../hooks/useComponentVisible';
import { useState, useEffect } from "react";
import WeekInReviewModal from './WeekInReviewModal';

interface NotificationState {
  visible: ComponentVisbilityProps,
  handleChange: () => void
}

const WebNotification: React.FC<NotificationState> = ({ visible, handleChange }) => {
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState<ComponentVisbilityProps>({
    isComponentVisible: false,
    ref: useRef(null),
    setComponentVisible: () => {},
  });
  const [weekInReviewVisible, setWeekInReviewVisible] = useState(false);

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

  function handleModalClose() {
    setModalVisible({
      ...modalVisible,
      isComponentVisible: false,
    });
  }

  return (
    <>
      {show && (
        <div className="fixed bottom-0 right-0 m-4">
          <div className="bg-cyan-300 text-gray-800 py-4 px-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-2 flex items-center">
              <BsFillCalendarWeekFill className="mr-2" />
              Week in Review
            </h2>
            <p className="mb-4"> Would you like to view your week in review?</p>
            <div className="flex justify-center space-x-4">
            <button
                onClick={handleLater}
                className="px-7 py-2 bg-gray-700 text-white rounded-md shadow-md"
              >
                Later
              </button>
              <button
                onClick={handleView}
                className="px-7 py-2 bg-cyan-500 text-white rounded-md shadow-md"
              >
                View
              </button>
              
            </div>
          </div>
        </div>
      )}
      {modalVisible.isComponentVisible && (
        <WeekInReviewModal visible={modalVisible} handleChange={handleModalClose} />
    )}
    </>
  );
};

export default WebNotification;
