import { useEffect, useState } from 'react';
import { BsGlobe } from 'react-icons/bs';
import { deleteDoc, updateDoc, getDoc, setDoc, doc } from '@firebase/firestore';
import { fb_firestore } from '../../../lib/Firebase';
import { useSession } from '../../../lib/Session';
import toast from 'react-hot-toast';
import { BiLockAlt } from 'react-icons/bi';

type PublicBoardButtonProps = {
  isPublic: boolean;
  bulletDocID: string | undefined;
}

const PublicBoardButton: React.FC<PublicBoardButtonProps> = ({isPublic, bulletDocID}) => {
  const session = useSession();
  const [isFilled, setIsFilled] = useState(isPublic);
  const [publicConfirmationOpen, setPublicConfirmationOpen] = useState(false);
  const [privateConfirmationOpen, setPrivateConfirmationOpen] = useState(false);

  useEffect(() => {
    (isPublic) ? setIsFilled(true) : setIsFilled(false);
  }, [isPublic])

  const onClickPublicYesButton = async () => {
    try {
      if (bulletDocID && session && session.user) {
        const personalNotesDocRef = doc(fb_firestore, "users", session.user.uid, "notes", bulletDocID);
        await updateDoc(personalNotesDocRef, { isPublic: true});
        const personalBulletsDocSnap = await getDoc(personalNotesDocRef);
  
        const copyOfPersonalBullet = personalBulletsDocSnap.data();
        const publicBulletsDocRef = doc(fb_firestore, "users", session.user.uid, "public_notes", copyOfPersonalBullet?.bulletDocID);
        await setDoc(publicBulletsDocRef, copyOfPersonalBullet);
        toast.success("Note Published!");
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Publishing Note!');
    }
    setPublicConfirmationOpen(false);
  }

  const onClickPrivateYesButton = async () => {    
    try {
      if (bulletDocID && session && session.user) {
        const personalNotesDocRef = doc(fb_firestore, "users", session.user.uid, "notes", bulletDocID);
        await updateDoc(personalNotesDocRef, { isPublic: false});

        const publicNotesDocRef = doc(fb_firestore, "users", session.user.uid, "public_notes", bulletDocID);
        await deleteDoc(publicNotesDocRef);
        toast.success("Note Private!");
      }  
    } catch (error) {
      console.log(error);
      toast.error('Error Privating Note!');
    }
    setPrivateConfirmationOpen(false);
  }

  return (
    <>
      {isFilled
        ? 
          <button className="hover:bg-cyan-700 hover:bg-opacity-20 hover:text-cyan-500 p-2 hover:rounded-full"
                onClick={() => setPrivateConfirmationOpen(true)}>
            <BiLockAlt size={15} />
          </button>
        :
          <button className="hover:bg-cyan-700 hover:bg-opacity-20 hover:text-cyan-500 p-2 hover:rounded-full"
                onClick={() => setPublicConfirmationOpen(true)}>
            <BsGlobe size={15} />
          </button>
      }

      {/* PUBLIC CONFIRMATION MODAL */}
      {publicConfirmationOpen && 
        <div className="fixed z-50 inset-0 overflow-y-auto text-black dark:text-white">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all w-11/12 sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="flex gap-4 justify-center items-center">
                    <h3 className="text-lg leading-6 font-medium">Post Note to Public Board?</h3>
                    <BsGlobe  size={20} />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">Are you sure you want to post this note to your Public Board? This means others can view this note.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <button className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-black bg-gray-100 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                          onClick={() => setPublicConfirmationOpen(false)}>
                  Cancel
                </button>
                <button className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-black bg-gray-100 border border-transparent rounded-md hover:text-white hover:bg-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                        onClick={onClickPublicYesButton}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {/* PRIVATE CONFIRMATION MODAL */}
      {privateConfirmationOpen && 
        <div className="fixed z-50 inset-0 overflow-y-auto text-black dark:text-white">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all w-11/12 sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="flex gap-4 justify-center items-center">
                    <h3 className="text-lg leading-6 font-medium">Delete Public Note?</h3>
                    <BiLockAlt  size={20} />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">Are you sure you want to delete this note from your Public Board? This means this note will now only be visible on your Private Board.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <button className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-black bg-gray-100 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                          onClick={() => setPrivateConfirmationOpen(false)}>
                  Cancel
                </button>
                <button className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                        onClick={onClickPrivateYesButton}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default PublicBoardButton;