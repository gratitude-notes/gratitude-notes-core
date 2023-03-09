import NoteItem from "./FeedNoteItem";


const FeedList: React.FC = () => {  
    return (
        <>
            {/* <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-5"> */}
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                
                    <NoteItem date="March 7, 2023" time="4:35PM" note="Today was busy. I woke up early to run in the park, which helped me start the day feeling energized and refreshed. However, work was challenging as I had a lot of deadlines and my boss was being difficult. During my lunch break, I met up with a friend and it was great to catch up and chat.
                    To balance out the stress of the day, I made time for self-care. I watched a movie and had a healthy dinner, which helped me unwind and relax. As I reflect on the day, I feel accomplished and grateful for the moments of joy and connection.
                    Tomorrow is a new day and I'm looking forward to what it brings. Hopefully, it will be less stressful than today. But either way, I know that I can handle it and make time for self-care." score={5} keyword="happy"/>
                    <NoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" score={2} keyword="happy"/> 
                    <NoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" score={-5} keyword="happy"/>
                    <NoteItem date="March 7, 2023" time="4:35PM" note="adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a" score={5} keyword="happy"/>
                    <NoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" score={2} keyword="happy"/> 
                    <NoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" score={-5} keyword="happy"/>
                    <NoteItem date="March 7, 2023" time="4:35PM" note="adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a" score={5} keyword="happy"/>
                    <NoteItem date="March 7, 2023" time="10:30PM" note="eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl" score={2} keyword="happy"/> 
                    <NoteItem date="March 7, 2023" time="11:15PM" note="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare" score={-5} keyword="happy"/>

                
            </ol>
            {/* </div> */}
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