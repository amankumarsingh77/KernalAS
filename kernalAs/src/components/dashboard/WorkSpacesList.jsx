import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Dialog from './Dialog';
import Warning from './Warning';
import { Toaster, toast } from 'sonner';

const WorkspaceList = ({ workspaces }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const deleteWorkspaceID = useRef(null);
    const navigate = useNavigate()
    const onChatHandle = (id) => {
        navigate(`/chat/${id}`);
    }

    const successToast = (message) => {
        toast.success(message);
    }
    const errorToast = () => {
        toast.error(message);
    }
    const openWarning = (id) => {
        deleteWorkspaceID.current = id;
        setDeleteDialogOpen(true)
    }
    const closeWarning = () => {
        setDeleteDialogOpen(false)
    };


    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };
    return (
        <div className="flex flex-wrap -m-4 p-4 ">
            <Toaster richColors />
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 cursor-pointer">
                <div className="bg-gray-800 rounded-lg p-6 shadow-md h-44 overflow-hidden flex items-center justify-center" onClick={openDialog}>
                    <p className='text-blue-500 text-3xl mr-2'>+</p>
                    <p className='text-white mt-2'>Create Workspace</p>
                </div>
            </div>

            <Warning
                setIsOpen={setDeleteDialogOpen}
                isOpen={isDeleteDialogOpen}
                successToast={successToast}
                errorToast={errorToast}
                onClose={closeWarning}
                wid={deleteWorkspaceID.current}
            />

            <Dialog
                setIsOpen={setDialogOpen}
                isOpen={isDialogOpen}
                successToast={successToast}
                errorToast={errorToast}
                onClose={closeDialog}
                title="Sample Dialog"
                content="This is the content of the dialog. You can add any information or components here."
            />
            {workspaces.length === 0 ? (

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 animate-pulse">
                    <div className="bg-gray-800 rounded-lg shadow-md p-8 h-full">
                        <div className="h-4 bg-gray-400 mb-4 w-3/4 rounded-lg"></div>
                        <div className="h-4 bg-gray-400 w-3/4 rounded-lg"></div>
                    </div>
                </div>
            ) : (

                workspaces.map((workspace) => (
                    <>


                        <div key={workspace.id} className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 cursor-pointer">
                            <div className="bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col justify-between" onClick={() => onChatHandle(workspace.id)}>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-white whitespace-normal">
                                        {workspace.data.name}
                                    </h3>
                                    <p className="text-gray-600 whitespace-normal">{workspace.data.description}</p>
                                </div>
                                <div className='delete-button absolute bottom-4 right-4 p-3'>

                                    {/* <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openWarning(workspace.id);
                                        }}
                                        className="flex justify-center items-center gap-2 w-14 h-6 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-md hover:shadow-red-400"
                                    >
                                        <svg viewBox="0 0 15 15" className="w-4 fill-white">
                                            <svg
                                                className="w-6 h-6"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                ></path>
                                            </svg>
                                            Button
                                        </svg>
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </>

                ))

            )}


        </div>

    );
};

export default WorkspaceList;
