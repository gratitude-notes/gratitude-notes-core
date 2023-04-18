import React, { useEffect, useRef, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { ViewState } from '../../pages/Dashboard';
import { Player, PlayerRef } from '@remotion/player';
import { WeeklyDosageVideo } from "./Remotion/WeeklyDosageVideo";
import Map from './Maps';

type WeekInReviewModalState = {
  updateViewState: (state: ViewState) => void
}

const WeekInReview: React.FC<WeekInReviewModalState> = ({updateViewState}) => {

  const detectScrollRef = useRef<HTMLDivElement | null>(null);
  const remotionPlayerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    const onScroll = (event: any) => {
      const { current } = remotionPlayerRef;
      current?.play(event);
    };

    if (detectScrollRef.current) {
      detectScrollRef.current.addEventListener('scroll', onScroll);
    }

    return () => {
      if (detectScrollRef.current) {
        detectScrollRef.current.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return (
    <div className={`py-2 px-4 md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow overflow-y-auto select-none`}>
      {/* HEADER */}
      <div className="flex justify-between text-black dark:text-white">
        <button onClick={() => updateViewState("Home")}><BsArrowLeft size={20}/></button>
        <h1 className="text-xl font-bold text-black dark:text-white justify-end">Your Weekly Dosage</h1>
      </div>
      
      {/* OVERFLOW DIV */}
      <div ref={detectScrollRef} className="h-full overflow-y-auto
                      scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
         
          {/* REMOTION */}
          <div className="h-full relative">
            <Player
                ref={remotionPlayerRef}
                component={WeeklyDosageVideo}
                inputProps={{  }}
                durationInFrames={38 * 30}  // 38 second total video length
                // 1080x1920 (Vertical Video)
                // 9:16 aspect ratio
                compositionWidth={1080}
                compositionHeight={1920}
                style={{ width: '100%', height: '100%' }}
                fps={30}
                // loop
                clickToPlay
                controls
            />
          </div>

          {/* MAP */}
          <div className="h-full sm:flex sm:items-center sm:justify-center sm:relative">
            <Map />
          </div>
      </div>
    </div>
  );
}

export default WeekInReview;