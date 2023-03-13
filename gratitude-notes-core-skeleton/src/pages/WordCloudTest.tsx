//note: this makes a word cloud using the whole entry as one "word" for the word cloud,
//      not finding the most common words to use in the cloud
import { useRouteError } from "react-router-dom";
import React from 'react';
import WordCloudComp from 'react-d3-cloud';
import './WordCloud.css';
import NoteInfo from './dataDay.json';
import { string } from "prop-types";

const WordCloudTest: React.FC = () => {  

  //make 'global' array so return can access
  var noteDayArr: string[] =[];

  {NoteInfo.map((singleDayData, key) => {

      var i = 0;
      //fill array w/ notes from a day
      while (singleDayData['noteData'][i]['note']){
          noteDayArr[i] = singleDayData['noteData'][i]['note'];
          i++;
          console.log(noteDayArr[i] + "\n");
      }

  })}
  const data = [
      { text: 'Hey', value: 1000 },
      { text: 'lol', value: 200 },
      { text: 'first impression', value: 800 },
      { text: 'very cool', value: 100 },
      { text: 'duck', value: 500 }
  ]

return (
  <div className='WordCloudDiv'><WordCloudComp data={noteDayArr} /></div>
   );
}

export default WordCloudTest;

function value(): any {
  throw new Error("Function not implemented.");
}
