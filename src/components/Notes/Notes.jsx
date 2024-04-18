import {Button, Form, ListGroup} from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const Notes = ({notes, deleteNote, updateNotes}) => {


    return (<>
        <ListGroup variant="dark">
            {notes?.length > 0 && notes.map((note) => <ListGroup.Item variant='dark'
                                                                      className="d-flex "
                                                                      style={{justifyContent: "space-between"}}
                                                                      key={note.id}>

                <div>
                    <Form>
                        <Form.Check // prettier-ignore
                            type='checkbox'
                            id={note.id}
                            label={note?.content}
                            style={{fontSize: '20px'}}
                            checked={note.completed}
                            onChange={(e) => updateNotes({id: note.id, completed: e.target.checked})}
                        />
                    </Form>
                </div>
                <Button variant="dark" onClick={() => deleteNote(note.id)}>Delete</Button>
            </ListGroup.Item>)}
        </ListGroup>
    </>)

}

export default Notes;