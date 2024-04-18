import {getDocs, addDoc, collection, updateDoc , doc, deleteDoc} from "firebase/firestore"
import {db} from "./firebase-config.js"



const TABLE_NAME = "todos"

//create new collection
const table = collection(db, TABLE_NAME);

const getCurrentDoc = (id) =>   doc(db,TABLE_NAME,id);

const getAllTableData = getDocs(table);

const getAllTodos =  async () => {
    const getTableData = await getAllTableData;
    const allTodos = getTableData.docs.map((doc) => (
        {
            ...doc.data(),
            id :doc.id
        }
    ))
    return allTodos;
}

export const addTodo = async (todoBody) => {
     await addDoc(table,{...todoBody, createdOn : new Date() })
}

export const updateTodo = async (todoBody) => {
    const currentDoc = getCurrentDoc(todoBody.id);
    await updateDoc(currentDoc,{...todoBody })
}

export const deleteTodo = async (id) => {
    const currentDoc = getCurrentDoc(id);
    await deleteDoc(currentDoc);
}

export const getTodosBasedOnUserId = async (userId) => {
    const data =  (await getAllTodos()).filter(at => at.user_uid===userId);
    return data;
}
