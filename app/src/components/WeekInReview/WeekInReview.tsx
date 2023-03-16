import React from 'react';
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
    { text: 'Thanks', value: 900 }
  ]

  const exampleKeywords = [
    'Hello',
    'Thanks',
    'Welcome',
    'Outstanding',
    'Pleasure'
  ]

  return (
      <div className="w-screen h-screen bg-black">
        {/* MODAL */}
        <div className="relative m-auto h-screen max-w-xl bg-white">
          <button className="absolute top-2 right-2 h-8 bg-black text-white rounded-lg">
            Close me
          </button>

          {/* MAIN CONTENT */}
          <div className="pt-20 h-full flex flex-col gap-4 items-center">
            <h1 className="text-3xl">Week in Review</h1>
            {/* WORD CLOUD */}
            <div className="w-full h-full border-4 border-black rounded-t-3xl">
              <WordCloud data={data} width={200} height={200} padding={0} rotate={0}/>

              {/* KEYWORD STUFF */}
              <div className="px-2">
                <KeywordItem keywords={exampleKeywords}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default WeekInReview;