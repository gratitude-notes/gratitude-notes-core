
import WriteNoteForm from "../Editor/WriteNoteForm";
import FooterNavbar from "../FooterNavbar/FooterNavbar";

const WriteNoteModal: React.FC = () => {

    return (    
        <div className={`bg-white dark:bg-gray-800 h-screen md:px-[100px] lg:px-[200px] flex flex-col gap-6 flex-grow`}>
            {/* WRITE NOTE */}
            <WriteNoteForm />
            <FooterNavbar updateViewState={()=>{}} currentState={"Home"}/>
        </div>
    );
}

export default WriteNoteModal;