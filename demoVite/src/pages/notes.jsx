import React, { useState } from 'react';

import Draggable from 'react-draggable';


import "../css/main.css";
import gpt_notes_design from '../images/gpt-notes_design.png';
import folder_image from '../images/folder.png';


export function Notes() {
    const [nextNoteId, updateNoteId] = useState(1);

    const [notes, setNotes] = useState([{id:0, x:50, y:50, text:''}]);
    const addNote = (event) => {
        if (event.target.className == 'section-blackboard') {
            const x = event.nativeEvent.offsetX;
            const y = event.nativeEvent.offsetY;
            console.log(x, y);
            setNotes((prevNotes) => [...prevNotes, {id:nextNoteId, x:x, y:y, text:''}]);
            // increment nextNoteId
            updateNoteId(nextNoteId + 1);
        }
    }

    const deleteNote = (event) => {
        if (event.target.className == 'div-note-delete') {
            const idToDelete = event.target.getAttribute('id')
            console.log(idToDelete);
            setNotes(notes.filter(note => note.id != idToDelete));
        }
    }

    return (
        <main className="main-notes">
            <section className="section-notes">
                <img scr={folder_image} alt="Folder" width="100" />
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Folders</h4>

                <ul className="ul-notes">
                    <li className="li-notes">Folder 1 (from database)</li>
                    <li className="li-notes">Folder 2</li>
                    <li className="li-notes">Folder 3 (shared via Websockets)</li>
                </ul>
            </section>
            <section className="section-notes">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Pages</h4>
                <ul className="ul-notes">
                    <li className="li-notes">Page 1 (from database)</li>
                    <li className="li-notes">Page 2 (from database)</li>
                    <li className="li-notes">Page 3 (from database)</li>
                </ul>
            </section>

            <section className="section-blackboard" onClick={(event) => { addNote(event); deleteNote(event) } }>
                {notes.map((note, index) => {
                    return (<Note key={index} id={note.id} x={note.x} y={note.y} text={note.text} />);
                })}
            </section>
        </main>
    )
}

function Page() {
    return (
        <section className="section-blackboard" onClick={(event) => { addNote(event); deleteNote(event) } }>
                {notes.map((note, index) => {
                    return (<Note key={index} id={note.id} x={note.x} y={note.y} text={note.text} />);
                })}
            </section>
    )
}

function Note({id, x, y, text}) {
    const [position, setPosition] = useState({x:x, y:y})
    const drag = (event, data) => {
        setPosition({x: data.x, y: data.y});
    }
    const [content, updateContent] = useState(text);
    const contentChange = (event) => {
        updateContent(event.target.value);
    }

    return (
        <Draggable handle='.div-note-grabber' bounds='parent' position={position} onDrag={drag}>
            <div className="div-note">
                <div className="div-note-grabber">....<span id={id} className='div-note-delete'>x</span></div>
                <textarea className="input-note" onChange={contentChange} value={content} />
            </div>
        </Draggable>
    )
}