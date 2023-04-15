import React, { useRef } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { ViewState } from '../../pages/Dashboard';
import Map from './Maps';

type WeekInReviewModalState = {
  updateViewState: (state: ViewState) => void
}

const WeekInReview: React.FC<WeekInReviewModalState> = ({updateViewState}) => {
  
  const ref = useRef<null | HTMLDivElement>(null); 

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  }

  const data = [
      { text: 'Hey', value: 1000 },
      { text: 'lol', value: 200 },
      { text: 'first impression', value: 800 },
      { text: 'very cool', value: 100 },
      { text: 'duck', value: 500 }
  ]

  return (
    <div className={`py-2 px-4 md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow overflow-y-auto select-none`}>
      {/* HEADER */}
      <div className="flex justify-between text-black dark:text-white">
        <button onClick={() => updateViewState("Home")}><BsArrowLeft size={20}/></button>
        <h1 className="text-xl font-bold text-black dark:text-white justify-end">Your Weekly Dosage</h1>
      </div>
      
      {/* OVERFLOW DIV */}
      <div className="h-full overflow-y-auto
                      scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
        
        <div className="h-full">
          <h1 className="dark:text-white">MAP</h1>
          {/* <button onClick={handleClick} className="rounded-full p-2 bg-blue-500">click me</button> */}
          <Map></Map>
        </div>
        <div ref={ref} className="h-full bg-blue-500">
          <h1>DETAILED INFO ABOUT USERS WEEK</h1>
          {/* <Streaks></Streaks> */}
        </div>
      </div>

      {/* <WordCloud data={data} /> */}
    </div>
  );
}

export default WeekInReview;