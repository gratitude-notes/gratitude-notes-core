import React, { useCallback } from 'react';
import WordCloud from 'react-d3-cloud';
import KeywordItem from '../Feed/FeedNoteItem/KeyWordItem';

const WeekInReview: React.FC = () => {  

  // 10 keywords each week
  const data = [
    { text: 'Hello', value: 950 },
    { text: 'Hilarious', value: 375 },
    { text: 'Pleasure', value: 725 },
    { text: 'Amazing', value: 550 },
    { text: 'Quack', value: 425 },
    { text: 'Welcome', value: 875 },
    { text: 'ROFL', value: 300 },
    { text: 'Impressive', value: 650 },
    { text: 'Outstanding', value: 775 },
    { text: 'Thanks', value: 900 },
    
  ]

  const exampleKeywords = [
    'Hello',
    'Thanks',
    'Welcome',
    'Outstanding',
    'Pleasure'
  ]

  return (
      <div className="w-screen h-screen bg-black items-center">
        {/* MODAL */}
        <div className="relative m-auto h-screen max-w-xl bg-white items-center">
          <button className="absolute top-2 left-5 h-8 px-3 bg-black text-white rounded-full">
            Close me
          </button>

          {/* MAIN CONTENT */}
          <div className="pt-20 h-wrap flex flex-col gap-4 items-center">
            {/* HEADER */}
            <div className="w-full h-wrap border-t-4 border-r-4 border-l-4 border-neutral-900 bg-neutral-900 rounded-t-3xl">
              <h1 className="text-3xl text-center text-white">Week in Review</h1>
              {/* WORD CLOUD */}
              <div className="w-full h-wrap-10 border-t-4 border-r-4 border-l-4 border-neutral-900 bg-white rounded-t-3xl -top-6">
                <WordCloud data={data} width={200} height={200} padding={0} font={"tahoma"} spiral={"rectangular"}/>
              </div>
            </div>
            
          </div>

          {/* KEYWORD HEADER */}
          <div className="relative border-t border-r border-l border-neutral-800 bg-neutral-800 rounded-t-3xl -top-6 w-full h-full">
            <h1 className="text-xl text-white text-left-10 px-5 py-2">Most Frequent Topics</h1>
            {/* KEYWORD STUFF */}
            <div className="absolute px-4 py-2 border-t-4 border-r-4 border-l-4 border-neutral-600 bg-neutral-600 rounded-t-3xl w-full h-full">
              <KeywordItem keywords={exampleKeywords}/>
            </div>
          </div>
          
        </div>
      </div>
  );
}

export default WeekInReview;