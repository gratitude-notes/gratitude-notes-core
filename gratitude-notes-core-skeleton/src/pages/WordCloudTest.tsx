//note: this makes a word cloud using the whole entry as one "word" for the word cloud,
//      not finding the most common words to use in the cloud
import { useRouteError } from "react-router-dom";
import React from 'react';
import WordCloudComp from 'react-d3-cloud';
import './WordCloud.css';
import NoteInfo from './dataDay.json';

const WordCloudTest: React.FC = () => {  

  //make 'global' array so return can access
  var noteDayArr: string[] =[];
  const numOfNotes=5; //assume max notes for a day is 5

  {NoteInfo.map((singleDayData, key) => {
      //fill array w/ notes from a day
      for(let i = 0; i<numOfNotes; i++){ 
          noteDayArr[i] = singleDayData['noteData'][i]['note'];
          console.log(noteDayArr[i] + "\n");
      }
  })}

  //make array filled with all words from the day
  var wordArr: any[] =[];

  for(let j=0; j<numOfNotes; j++){
      wordArr = wordArr.concat(noteDayArr[j].split(" "));
  }

  //find the most common words (makes 2d array [word][word(0), value(1)])
  let uniqueElements = [...new Set(wordArr)];
  const commonWordsArr = uniqueElements.map(value => [value, wordArr.filter(str => str === value).length]);
  console.log(commonWordsArr);

  //form an array the WordCloudComp can use
  const wordCloudData =[];
  for(let k=0;k<commonWordsArr.length;k++){
      wordCloudData[k] = {text: commonWordsArr[k][0], value: commonWordsArr[k][1]};
  }

  const data = [
      { text: 'Hey', value: 1000 },
      { text: 'lol', value: 200 },
      { text: 'first impression', value: 800 },
      { text: 'very cool', value: 100 },
      { text: 'duck', value: 500 }
  ]

return (
  <div className='WordCloudDiv'><WordCloudComp data={wordCloudData} /></div>
   );
}

export default WordCloudTest;

function value(): any {
  throw new Error("Function not implemented.");
}
