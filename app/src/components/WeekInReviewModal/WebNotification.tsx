import React from 'react';
import WordCloud from 'react-d3-cloud';
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { ComponentVisbilityProps } from '../../hooks/useComponentVisible';

// interface WeekInReviewModalState {
//   visible: ComponentVisbilityProps,
//   handleChange: () => void
// }

// const WebNotification: React.FC<WeekInReviewModalState> = ({visible, handleChange}) => {  

//   const isDivVisibleTag = (visible.isComponentVisible) ? "visible" : "hidden";

//   const data = [
//       { text: 'Hey', value: 1000 },
//       { text: 'lol', value: 200 },
//       { text: 'first impression', value: 800 },
//       { text: 'very cool', value: 100 },
//       { text: 'duck', value: 500 }
//   ]

//   return (
//     <>
//             <div className={`${isDivVisibleTag} absolute z-50 h-screen w-screen bg-white
//                             sm:h-[80%] sm:w-[550px] sm:rounded-3xl sm:top-20 sm:left-0 sm:right-0 sm:mx-auto
//                             dark:bg-gray-800`}>
//                 {/* HEADER */}
//                 <div className="flex justify-between p-4 text-black dark:text-white">
//                     <button onClick={handleChange}>
//                         <BsArrowLeft size={20}/>
//                     </button>
//                     <h1>Week In Review Page</h1>
//                 </div>

//                 <WordCloud data={data} />
//             </div>

    
//             {/* TRANSPARENT BACKGROUND ON LARGE SCREENS */}
//             <div className={`${isDivVisibleTag} absolute -z-50 sm:z-40 h-screen w-screen bg-black opacity-40`} />
//         </>
//   );
// }

// export default WebNotification;


import { useState, useEffect } from "react";

interface NotificationState {
  visible: ComponentVisbilityProps,
  handleChange: () => void
}

const WebNotification : React.FC<NotificationState> = ({visible, handleChange}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  function handleView() {
    console.log("View Week in Review");
    setShow(false);
  }

  function handleLater() {
    console.log("View Later");
    setShow(false);
  }

  return (
    <>
      {show && (
        // <div className="fixed bottom-0 right-0 m-4">
        
        //   <div className="bg-gray-100 text-gray-800 py-4 px-6 rounded-md shadow-md">
        //     <h2 className="text-lg font-bold mb-2">Week in Review</h2>
        //     <p className="mb-4">Would you like to view your week in review?</p>
        //     <div className="flex justify-between">
        //       <button
        //         onClick={handleView}
        //         className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mr-2"
        //       >
        //         View
        //       </button>
        //       <button
        //         onClick={handleLater}
        //         className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md"
        //       >
        //         Later
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <div className="fixed bottom-0 right-0 m-4">
          <div className="bg-blue-100 text-gray-800 py-4 px-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-2 flex items-center">
              <BsFillCalendarWeekFill className="mr-2" />
              Week in Review
            </h2>
            <span className="mb-0">Your week in review is ready. </span>
            <p className="mb-4"> Would you like to view your week in review?</p>
            <div className="flex justify-center space-x-4">
            <button
                onClick={handleLater}
                className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md"
              >
                Later
              </button>
              <button
                onClick={handleView}
                className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md"
              >
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
