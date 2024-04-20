import {useEffect, useMemo, useRef, useState} from "react";
import Notes from "./Notes.jsx";
import {getTodosBasedOnUserId, deleteTodo, addTodo, updateTodo} from "../../firebase-config/firestore.js"
import {useAuth} from "../../context/AuthContext.jsx"
import {Accordion, Button, Container, Form, InputGroup} from "react-bootstrap";
import {v4 as uuidv4} from 'uuid'


const NotesModule = () => {

    const {currentUser} = useAuth()

    const [notes, setNotes] = useState([]);
    const [pendingNotes, setPendingNotes] = useState([]);
    const [completedNotes, setCompletedNotes] = useState([]);
    const [newNotes, setNewNotes] = useState("");

    const handleStateChange = (givenNotes) => {
        let pending = [];
        let completed = [];
        givenNotes.map(currentNote => {
            if (currentNote.completed) {
                completed.push(currentNote);
            } else {
                pending.push(currentNote);
            }
        })

        setPendingNotes(pending);
        setCompletedNotes(completed);
    }

    const handleDeleteNote = (id) => {
        deleteTodo(id).then(() => setNotes(pn => {
            const filteredNotes = pn.filter(n => n.id !== id)
            handleStateChange(filteredNotes);
            return filteredNotes;
        }));
    }

    const handleUpdateNotes = ({id, completed}) => {
        const filterNote = notes.filter(n => n.id === id);
        if (filterNote.length !== 1)
            return
        filterNote[0].completed = completed;


        // if (Date.now() - filterNote[0].createdOn < 3000) {
        //     setTimeout(() => {
        //         updateTodofucntion()
        //     }, 2000);
        // }


            updateTodo(filterNote[0]).then(() => setNotes(pn => {
                const tempUpdatedNotes = pn.map(n => {
                    if (n === id)
                        return {...n, completed: completed};
                    else return n;
                });
                handleStateChange(tempUpdatedNotes);
                return tempUpdatedNotes;
            }));
    }


    useEffect(() => {
        async function fetchNotes() {
            const userBasedNotes = await getTodosBasedOnUserId(currentUser?.uid);
            console.log({userBasedNotes})
            setNotes(userBasedNotes)
            handleStateChange(userBasedNotes)
        }

        fetchNotes()
    }, [])


    const handleAddNewNote = (value) => {
        const val = value.trim()
        if (!val)
            return;
        const newNoteBody = {
            content: val,
            completed: false,
            user_uid: currentUser?.uid,
            createdOn: new Date(),
            id: uuidv4(),

        }
        addTodo(newNoteBody).then(() => setNotes(prev => {
            handleStateChange([...prev, newNoteBody]);
            return [...prev, newNoteBody]
        }));
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
                                disabled={newNotes.trim().length === 0}
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
                {notes?.length > 0 && <div className="w-100 mt-5" style={{maxWidth: "600px"}}>
                    <Accordion defaultActiveKey={['0']}>
                        {pendingNotes?.length > 0 && <Accordion.Item eventKey="0">
                            <Accordion.Header>Pending Tasks</Accordion.Header>
                            <Accordion.Body>
                                <Notes notes={pendingNotes} deleteNote={handleDeleteNote}
                                       updateNotes={handleUpdateNotes}/>
                            </Accordion.Body>
                        </Accordion.Item>}
                        {completedNotes.length > 0 && <Accordion.Item eventKey="1">
                            <Accordion.Header>Completed Tasks</Accordion.Header>
                            <Accordion.Body>
                                <Notes notes={completedNotes} deleteNote={handleDeleteNote}
                                       updateNotes={handleUpdateNotes}/>
                            </Accordion.Body>
                        </Accordion.Item>}
                    </Accordion>
                </div>}
            </Container>
        </>
    )
}

export default NotesModule;
