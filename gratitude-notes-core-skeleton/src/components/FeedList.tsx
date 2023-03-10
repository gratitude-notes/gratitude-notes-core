import DayCard from "./DayCard";
import NoteItem from "./FeedNoteItem";

const data = {
    "date": "February 22, 2023",
    "noteData": [
      {
        "time": "11:59:00 PM",
        "score": 5
      },
      {
        "time": "1:45:30 AM",
        "score": 0
      },
      {
        "time": "12:15:00 AM",
        "score": -1
      },
      {
        "time": "3:00:15 PM",
        "score": -3
      },
      {
        "time": "9:30:45 PM",
        "score": 2
      }
    ]
  }


const FeedList: React.FC = () => {  
    return (
        <>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <DayCard date={data.date} noteData={data.noteData}/>

                <NoteItem date="March 7, 2023" time="4:35PM" note="adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a" score={5}/>
                <NoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" score={2}/> 
                <NoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" score={-5}/>
            
                {/* FONT EXAMPLE */}
                {/* <div className="flex flex-col">
                    <h1>FONT EXAMPLE</h1>
                    <p className="text-xl font-myFont">Roboto</p>
                    <p className="text-xl font-myClimateCrisis">ClimateCrisis</p>
                </div> */}
            
            </ol>
        </>
    )
  }
  
  export default FeedList;