import React, { useRef } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { ViewState } from '../../pages/Dashboard';
import { Player } from '@remotion/player';
import { WeeklyDosageVideo } from "./Remotion/WeeklyDosageVideo";

type WeekInReviewModalState = {
  updateViewState: (state: ViewState) => void
}

const WeekInReview: React.FC<WeekInReviewModalState> = ({updateViewState}) => {
  const ref = useRef<null | HTMLDivElement>(null); 

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  }

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
        <Player
              component={WeeklyDosageVideo}
              inputProps={{  }}
              durationInFrames={30 * 30}  // 30 second total video length
              // 1080x1920 (Vertical Video)
              // 9:16 aspect ratio
              // Scale-down to 306x544
              compositionWidth={1080}
              compositionHeight={1920}
              style={{ width: '100%', height: '100%' }}
              fps={30}
              controls
          />
          <button onClick={handleClick} className="rounded-full p-2 bg-blue-500">click me</button>
        </div>
        <div ref={ref} className="h-full flex justify-center items-center">

        </div>
      </div>

    </div>
  );
}

export default WeekInReview;