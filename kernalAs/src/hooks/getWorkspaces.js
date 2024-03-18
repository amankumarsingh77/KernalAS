import { auth, db } from '../firebase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useWorkspaces = () => {
    const [workspaces, setWorkspaces] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Workspaces'), (snapshot) => {
            const userWorkspaces = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })).filter((workspace) => workspace.data.usermail === auth?.currentUser?.email);

            setWorkspaces(userWorkspaces);
        });

        return () => unsubscribe();
    }, []);

    return workspaces;
};
