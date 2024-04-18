import {useEffect, useRef, useState} from "react";
import Notes from "./Notes.jsx";
import {getTodosBasedOnUserId, deleteTodo, addTodo, updateTodo} from "../../firebase-config/firestore.js"
import {useAuth} from "../../context/AuthContext.jsx"
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {v4 as uuidv4} from 'uuid'


const NotesModule = () => {

    const {currentUser} = useAuth()

    const [notes, setNotes] = useState([]);
    const [newNotes, setNewNotes] = useState("");


    const handleDeleteNote = (id) => {
        deleteTodo(id).then(() => setNotes(pn => pn.filter(n => n.id !== id)));
        // deleteTodo(id).then(() => console.log("deleted successfully id : " + id)).catch(e => console.log("deleted error: " + e))
        // setNotes(pn => pn.filter(n => n.id !== id));
    }

    const handleUpdateNotes = ({id, completed}) => {
        const filterNote = notes.filter(n => n.id === id);
        if (filterNote.length !== 1)
            return
        filterNote[0].completed = completed;

        // updateTodo(filterNote[0])
        //     .then(() => console.log("Updates notes with id: " + id))
        //     .catch(e => console.error(e));
        updateTodo(filterNote[0]).then(() => setNotes(pn => pn.map(n => {
            if(n===id)
                return {...n, completed: completed};
            else return n;
        })));
        setNotes(pn => pn.map(n => {
            if (n === id)
                return {...n, completed: completed};
            else return n;
        }));

    }
    useEffect(() => {
        async function fetchNotes() {
            const asdasdasd = await getTodosBasedOnUserId(currentUser?.uid);
            console.log({asdasdasd})
            setNotes(asdasdasd)
        }

        fetchNotes()
    }, [])


    const handleAddNewNote = (value) => {
        if (!value)
            return;
        const newNoteBody = {
            content: value,
            completed: false,
            user_uid: currentUser?.uid,
            createdOn: new Date(),
            id: uuidv4(),

        }
        addTodo(newNoteBody).then(() => setNotes(prev => [...prev, newNoteBody]));
        // addTodo(newNoteBody).then(() => console.log("added successfully with id : " + newNoteBody.id)).catch(e => console.error(e));
        // setNotes(prev => [...prev, newNoteBody])
        setNewNotes("")
    }

    return (
        <>
            <Container
                className="d-flex flex-column mt-5 align-items-center"
                style={{minHeight: "100vh"}}>
                <div>
                    <InputGroup size="lg" variant="dark">
                        <Button variant="outline-secondary" onClick={() => handleAddNewNote(newNotes)}
                                id="button-addon1">
                            Add Note
                        </Button>
                        <Form.Control
                            aria-label="Large"
                            className="border-2"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={e => setNewNotes(e.target.value)}
                            value={newNotes}
                        />
                    </InputGroup>
                </div>
                <div className="w-100 mt-5" style={{maxWidth: "600px"}}>
                    <Notes notes={notes} deleteNote={handleDeleteNote} updateNotes={handleUpdateNotes}/>
                </div>
            </Container>
        </>
    )
}

export default NotesModule;
