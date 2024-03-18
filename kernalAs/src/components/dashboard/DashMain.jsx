import React from 'react';
import { useWorkspaces } from '../../hooks/getWorkspaces';
import WorkspaceList from './WorkSpacesList';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';


const DashMain = () => {
    const workspaces = useWorkspaces();
    const navigate = useNavigate();
    const useremail = auth?.currentUser?.email;
    if (!useremail) {
        navigate("/login");
    }
    return (
        <div className='h-auto bg-gray-900 p-6 w-full'>
            <p className='text-white text-3xl'>Dashboard</p>

            <WorkspaceList workspaces={workspaces} />

        </div>
    );
};

export default DashMain;
