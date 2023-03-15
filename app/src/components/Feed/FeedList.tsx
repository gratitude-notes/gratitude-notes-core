import useNoteData from "../../hooks/useNoteData";
import FeedNoteItem from "./FeedNoteItem/FeedNoteItem";

interface FeedNoteItemType {
  date: string,
  time: string,
  note: string,
  score: number,
  keywordsArray: string[]
}

const FeedList: React.FC = () => {

  const { data } = useNoteData();
  const noteItems: FeedNoteItemType[] = [];

  if (data) {
    data.forEach((doc: any) => {
      const notesArray = doc.data().noteData
      notesArray.forEach((note: any) => {
        noteItems.push(note);
      })
    })
  }

  const myKeywords = ["foo", "bar", "baz"];

  return (
    <ol className="w-full">
      {noteItems.map((noteItem, index) => (
        <FeedNoteItem key={index} date="date" time={noteItem.time} note={noteItem.note} keywordsArray={myKeywords} score={noteItem.score} />
      ))}
      {/* <FeedNoteItem date="March 7, 2023" time="4:35PM" note="Today was busy. I woke up early to run in the park, which helped me start the day feeling energized and refreshed. However, work was challenging as I had a lot of deadlines and my boss was being difficult. During my lunch break, I met up with a friend and it was great to catch up and chat.
                  To balance out the stress of the day, I made time for self-care. I watched a movie and had a healthy dinner, which helped me unwind and relax. As I reflect on the day, I feel accomplished and grateful for the moments of joy and connection.
                  Tomorrow is a new day and I'm looking forward to what it brings. Hopefully, it will be less stressful than today. But either way, I know that I can handle it and make time for self-care." keywordsStr={["sad", "photography"]} score={(-5)}/>
      <FeedNoteItem date="March 7, 2023" time="4:35PM" note="adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a" keywordsStr={["smiley", "photography"]} score={0}/>
      <FeedNoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" keywordsStr={["happy", "photography"]} score={1}/> 
      <FeedNoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" keywordsStr={["happy", "photography"]} score={4}/>
      <FeedNoteItem date="March 7, 2023" time="4:35PM" note="adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a" keywordsStr={["smiley", "photography"]} score={0}/>
      <FeedNoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" keywordsStr={["happy", "photography"]} score={1}/> 
      <FeedNoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" keywordsStr={["happy", "photography"]} score={4}/>              */}
    </ol>
  )
}

export default FeedList;