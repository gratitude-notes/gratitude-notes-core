import FeedList from "../components/FeedList";
import LeftSidebar from "../components/LeftSidebar";
import WriteNoteModal from "../components/WriteNoteModal";
import RightSidebar from "../components/RightSidebar";
import useComponentVisible from "../hooks/useComponentVisible";

const Dashboard: React.FC = () => { 
  const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);    

  const handleFAB = () => {
      (isComponentVisible) ? setComponentVisible(false) : setComponentVisible(true);
  }

  const modalVisible = (isComponentVisible) ? "visible" : "hidden";
  
  return (
    <div ref={ref}>
      <div className="flex">
        <LeftSidebar />
        <FeedList />
        <RightSidebar />
      </div>

      <button onClick={handleFAB} className="fixed bottom-0 right-0 text-white bg-black rounded-full p-2">
        Write note
      </button>

      <WriteNoteModal visibility={modalVisible} handleChange={handleFAB}/>
    </div>
  );
}

export default Dashboard;