import React from 'react';
import WordCloud from 'react-d3-cloud';

const WeekInReview: React.FC = () => {  

  const data = [
      { text: 'Hey', value: 1000 },
      { text: 'lol', value: 200 },
      { text: 'first impression', value: 800 },
      { text: 'very cool', value: 100 },
      { text: 'duck', value: 500 }
  ]

  return (
      <WordCloud data={data} />
  );
}

export default WeekInReview;