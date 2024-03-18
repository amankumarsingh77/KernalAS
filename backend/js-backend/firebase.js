import { collection, addDoc } from "firebase/firestore";
import { db } from '../../kernalAs/src/firebase/firebase.js';

const addTodo = async (e) => {
    // e.preventDefault();

    try {
        const docRef = await addDoc(collection(db, "Users"), {
            todo: {
                name: "Demo",
                description: "Demo"
            },
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

addTodo()