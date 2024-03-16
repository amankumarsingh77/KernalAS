// Dialog.js

import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { auth, db } from '../../firebase/firebase';
import { useUpload } from '../../hooks/r2';
import FileSelector from './FileSelector';
import { useRecoilValue } from 'recoil';
import { fileType, isDropEnabled } from '../../context/atoms';
import { useAddSource } from '../../hooks/addSource';
import { Toaster, toast } from 'sonner';


const Dialog = ({ setIsOpen, isOpen, onClose, successToast, errorToast }) => {
    const embedding_model = "open_ai"
    const isDropdownEnabled = useRecoilValue(isDropEnabled);
    const mainfileType = useRecoilValue(fileType)
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [isDisabled, setDisabled] = useState(true);
    const usermail = auth?.currentUser?.email;



    const createBot = async () => {

        await fetch(`${import.meta.env.VITE_APP_API_URL}/api/create_bot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
            }),
        });

        try {
            const res = await useAddSource(embedding_model, mainfileType, url);

        } catch (error) {
            console.error("Error adding source:", error);
        }
        const collectionRef = collection(db, "Workspaces");
        const chats = []
        const payload = { name, description, usermail, chats };

        if (payload && collectionRef) {
            const addedDoc = await addDoc(collectionRef, payload, chats);
            if (addedDoc) {
                setIsOpen(false);
            }
            successToast("Workspace Created Successfully!");
        }
        setName("")
        setDescription("")

    }

    useEffect(() => {
        if (mainfileType === "youtube_video" || mainfileType === "web_page") {
            setDisabled(false)
        }
    }, [])
    const fileTypes = ["CSV", "PDF"];
    const handleChange = (file) => {

        useUpload(file).then((url) => {

            setUrl(url);
            setDisabled(false)
        })
    };


    return (
        <div
            className={`fixed inset-0 z-50 overflow-auto ${isOpen ? 'flex' : 'hidden'
                } items-center justify-center backdrop-blur-md`}
        >
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg aspect-w-1 w-96 aspect-h-1 ">
                <h2 className="text-2xl font-bold mb-4 text-white">Create Workspace</h2>

                <div className='flex flex-col'>
                    <input
                        type='text'
                        className=' mt-1 px-3 py-2 bg-darkgray text-white w- rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue'
                        placeholder='Title'
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                    <input
                        type='text'
                        className='mt-3 px-3 py-2 bg-darkgray text-white rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue'
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}>
                    </input>
                    <div className='relative mt-3'>
                        <FileSelector />
                    </div>

                </div>

                {
                    !isDropdownEnabled && (
                        (mainfileType === "youtube_video" || mainfileType === "web_page") ? (
                            <div className='mt-3 rounded-md'>
                                <input type="text" name="url" placeholder='Enter the URL' onChange={e => setUrl(e.target.value)} className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                            </div>

                        ) : (
                            <div className='mt-3'>
                                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                            </div>
                        )
                    )
                }

                <div className='flex justify-between'>

                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
                        onClick={createBot}
                    >
                        Create
                    </button>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>


        </div >

    );
};

export default Dialog;
