import { collection, deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { db } from '../../firebase/firebase';

const Warning = ({ setIsOpen, isOpen, onClose, wid,successToast,errorToast }) => {
    const onDelete= async()=>{
        const collectionRef = collection(db, "Workspaces");
        if (collectionRef) {
            const workspaceRef = doc(collectionRef, wid);
            try {
              await deleteDoc(workspaceRef);
              setIsOpen(false);
              successToast("Deleted workspace Successfully!");
            } catch (error) {
              console.error('Error deleting workspace:', error);
              errorToast("Couldn't delete workspace");
              
            }
          }
    }

    return (
        
        <div
            class={`fixed inset-0 z-50 overflow-auto ${isOpen ? 'flex' : 'hidden'
        } items-center justify-center backdrop-blur-md`}

        >
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg  aspect-w-1 w-96 aspect-h-1">
                <div class="text-center p-3 flex-auto justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-12 h-12 flex items-center text-gray-600 mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <h2 class="text-xl font-bold py-4 text-gray-200">Are you sure?</h2>
                    <p class="text-sm text-gray-500 px-2">
                        Do you really want to delete your workspace? This process cannot be undone
                    </p>
                </div>
                <div class="p-2 mt-2 text-center space-x-1 md:block">
                    <button
                        class="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        class="bg-red-700 hover:bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-300 hover:border-red-500 text-white rounded-full transition ease-in duration-300"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Warning