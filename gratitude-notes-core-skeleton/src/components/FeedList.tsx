import NoteItem from "./NoteItem";


const FeedList: React.FC = () => {  
    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
            <NoteItem date="March 7, 2023" time="4:35PM" note="adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a" score={5}/>
            <NoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" score={2}/> 
            <NoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" score={-5}/>
        </ol>
    )
  }
  
  export default FeedList;