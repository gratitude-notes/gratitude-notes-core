import React from 'react';
import WordCloud from 'react-d3-cloud';
import { BsArrowLeft } from 'react-icons/bs';
import { ComponentVisbilityProps } from '../../hooks/useComponentVisible';

interface WeekInReviewModalState {
  visible: ComponentVisbilityProps,
  handleChange: () => void
}

const WeekInReview: React.FC<WeekInReviewModalState> = ({visible, handleChange}) => {  

  const isDivVisibleTag = (visible.isComponentVisible) ? "visible" : "hidden";

  const data = [
      { text: 'Hey', value: 1000 },
      { text: 'lol', value: 200 },
      { text: 'first impression', value: 800 },
      { text: 'very cool', value: 100 },
      { text: 'duck', value: 500 }
  ]

  return (
    <>
            <div className={`${isDivVisibleTag} absolute z-50 h-screen w-screen bg-white
                            sm:h-[80%] sm:w-[550px] sm:rounded-3xl sm:top-20 sm:left-0 sm:right-0 sm:mx-auto
                            dark:bg-gray-800`}>
                {/* HEADER */}
                <div className="flex justify-between p-4 text-black dark:text-white">
                    <button onClick={handleChange}>
                        <BsArrowLeft size={20}/>
                    </button>
                    <h1>Week In Review Page</h1>
                </div>

                <WordCloud data={data} />
            </div>

    
            {/* TRANSPARENT BACKGROUND ON LARGE SCREENS */}
            <div className={`${isDivVisibleTag} absolute -z-50 sm:z-40 h-screen w-screen bg-black opacity-40`} />
        </>
  );
}

export default WeekInReview;