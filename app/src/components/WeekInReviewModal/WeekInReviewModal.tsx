import React, { useRef } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { ViewState } from '../../pages/Dashboard';
import { Player } from '@remotion/player';
import { WeeklyDosageVideo } from "./Remotion/WeeklyDosageVideo";
import Map from './Maps';

type WeekInReviewModalState = {
  updateViewState: (state: ViewState) => void
}

const WeekInReview: React.FC<WeekInReviewModalState> = ({updateViewState}) => {

  const mapRef = useRef<null | HTMLDivElement>(null);
  const remotionRef = useRef<null | HTMLDivElement>(null);


  const handleMapRefClick = () => {
    mapRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  const handleRemotionRefClick = () => {
    remotionRef.current?.scrollIntoView({behavior: 'smooth'});
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
        </div>
      </div>

        <div ref={remotionRef} className="h-full relative">
          <h1 className="dark:text-white">Remotion here</h1>
          <button onClick={handleMapRefClick} className="absolute bottom-2 right-2 rounded-full p-2 bg-cyan-500">click for map</button>
          
        </div>
        <div ref={mapRef} className="h-full sm:flex sm:items-center sm:justify-center sm:relative">
          <Map />
          <button onClick={handleRemotionRefClick} className="hidden sm:visible sm:flex absolute bottom-2 right-2 rounded-full p-2 bg-cyan-500">click for remotion</button>
        </div>
      </div>
  );
}

export default WeekInReview;