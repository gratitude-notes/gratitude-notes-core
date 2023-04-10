import useComponentVisible from '../../../hooks/useComponentVisible';
import { BsShare, BsThreeDots, BsTrash } from 'react-icons/bs';
import { doc, deleteDoc } from '@firebase/firestore';
import { fb_firestore } from '../../../lib/Firebase';
import { useSession } from '../../../lib/Session';
import toast from 'react-hot-toast';

type DotMenuProps = {
  bulletDocID: string | undefined;
};

const DotMenu: React.FC<DotMenuProps> = ({ bulletDocID }) => {
  const session = useSession();
  const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);

  const handleDropdownButton = () => {
    isComponentVisible ? setComponentVisible(false) : setComponentVisible(true);
  };

  const handleDelete = async () => {
    if (session && session.user && bulletDocID) {
        try {
            const bulletDocRef = doc(fb_firestore, 'users', session.user.uid, 'notes', bulletDocID);

            // Need to handle for images
            await deleteDoc(bulletDocRef);
        } catch (error) {
            console.log(error);
            toast.error('Error deleting note.');
        }
        toast.success('Note deleted.');
    } else {
        toast.error('Error deleting note.');
    }
    
    console.log('Delete clicked on a FeedNoteItem');
    console.log("HANDLE IMAGE DELETE");
  };

  const twVisible = isComponentVisible ? 'visible' : 'hidden';

  return (
    <div ref={ref} className="absolute top-1 right-4">
      {isComponentVisible ? (
        <button onClick={handleDropdownButton} className="text-cyan-500">
          <BsThreeDots size={20} />
        </button>
      ) : (
        <button onClick={handleDropdownButton} className="dark:text-gray-400">
          <BsThreeDots size={20} />
        </button>
      )}

      {/* Dropdown Menu */}
      <div
        className={`${twVisible} absolute top-4 right-0 z-50 rounded-lg border border-gray-400 dark:border-gray-600`}
      >
        <div className="flex flex-col gap-1 bg-gray-200 dark:bg-gray-900 rounded-lg text-black dark:text-white">
          <div
            onClick={handleDelete}
            className="px-2 py-[2px] flex gap-2 hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer items-center"
          >
            <h1 className="text-sm">Delete</h1>
            <BsTrash size={17} />
          </div>
          <div
            onClick={handleDelete}
            className="px-2 py-[2px] flex gap-2 hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer items-center"
          >
            <h1 className="text-sm">Share?</h1>
            <BsShare size={17} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DotMenu;
