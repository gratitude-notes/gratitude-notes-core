import React, { useRef } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import Map from './Maps';
import { Link } from 'react-router-dom';

const WeekInReview: React.FC = () => {
  
  const mapRef = useRef<null | HTMLDivElement>(null);
  const remotionRef = useRef<null | HTMLDivElement>(null);

  const handleMapRefClick = () => {
    mapRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  const handleRemotionRefClick = () => {
    remotionRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className={`bg-white dark:bg-gray-800 h-screen py-2 px-4 md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow overflow-y-auto select-none`}>
      {/* HEADER */}
      <div className="flex justify-between text-black dark:text-white">
        <Link to="/"><BsArrowLeft size={20}/></Link>
        <h1 className="text-xl font-bold text-black dark:text-white justify-end">Your Weekly Dosage</h1>
      </div>
      
      {/* OVERFLOW DIV */}
      <div className="h-full overflow-y-auto
                      scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
        
        <div ref={remotionRef} className="h-full relative">
          <h1 className="dark:text-white">Remotion here</h1>
          <button onClick={handleMapRefClick} className="absolute bottom-2 right-2 rounded-full p-2 bg-cyan-500">click for map</button>
          
        </div>
        <div ref={mapRef} className="h-full sm:flex sm:items-center sm:justify-center sm:relative">
          <Map />
          <button onClick={handleRemotionRefClick} className="hidden sm:visible sm:flex absolute bottom-2 right-2 rounded-full p-2 bg-cyan-500">click for remotion</button>
        </div>
      </div>
    </div>
  );
}

export default WeekInReview;