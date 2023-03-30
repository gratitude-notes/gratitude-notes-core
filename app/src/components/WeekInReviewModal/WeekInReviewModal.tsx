import React from 'react';
import WordCloud from 'react-d3-cloud';
import { BsArrowLeft } from 'react-icons/bs';
import { ComponentVisbilityProps } from '../../hooks/useComponentVisible';
import { ViewState } from '../../pages/Dashboard';

type WeekInReviewModalState = {
  updateViewState: (state: ViewState) => void
}

const WeekInReview: React.FC<WeekInReviewModalState> = ({updateViewState}) => {  

  const data = [
      { text: 'Hey', value: 1000 },
      { text: 'lol', value: 200 },
      { text: 'first impression', value: 800 },
      { text: 'very cool', value: 100 },
      { text: 'duck', value: 500 }
  ]

  return (
    <div className={`md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow`}>
      <div className="h-14 py-2 px-4 text-black dark:text-white">
        <button onClick={() => updateViewState("Home")}><BsArrowLeft size={20}/></button>
      </div>
      
      <div className="text-2xl text-black dark:text-white text-center">
        Week Review Page
      </div>
      {/* <WordCloud data={data} /> */}
    </div>
  );
}

export default WeekInReview;