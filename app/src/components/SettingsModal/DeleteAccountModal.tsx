import { useState } from "react";

const DeleteAccountModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  const handleDeleteAccount = () => {
    // Delete account logic here
    handleCloseModal();
  }

  return (
    <>
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded justify-center align-text: text-center"
            onClick={handleOpenModal}>
        Delete Account
      </button>

      {isOpen && 
        <div className="fixed z-10 inset-0 overflow-y-auto text-black dark:text-white">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all w-11/12 sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium">Delete account?</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">Are you sure you want to delete your account? This action cannot be undone.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400"
                        onClick={handleDeleteAccount}>
                  Delete Account
                </button>
                <button className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-black bg-gray-100 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                        onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default DeleteAccountModal;
