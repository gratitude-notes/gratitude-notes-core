import NoteItem from "./FeedNoteItem";


const FeedList: React.FC = () => {  
    return (
        <>
            <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-5">
            {/* <ol className="relative border-l border-gray-200 dark:border-gray-700"> */}
                
                    <NoteItem date="March 7, 2023" time="4:35PM" note="adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a" score={5}/>
                    <NoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" score={2}/> 
                    <NoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" score={-5}/>
                    <NoteItem date="March 7, 2023" time="4:35PM" note="adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a" score={5}/>
                    <NoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" score={2}/> 
                    <NoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" score={-5}/>
                    <NoteItem date="March 7, 2023" time="4:35PM" note="adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a" score={5}/>
                    <NoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" score={2}/> 
                    <NoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" score={-5}/>

                
            {/* </ol> */}
            </div>
                {/* FONT EXAMPLE */}
                {/* <div className="flex flex-col">
                    <h1>FONT EXAMPLE</h1>
                    <p className="text-xl font-myRoboto">Roboto</p>
                    <p className="text-xl font-myClimateCrisis">ClimateCrisis</p>
            </div> */}
            
            
        </>
    )
  }
  
  export default FeedList;